
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    const { caseDescription, caseType, previousMessages = [], caseData = {} } = requestData;

    if (!caseDescription) {
      return new Response(JSON.stringify({ error: "Case description is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Handle regular case analysis
    if (!previousMessages.length) {
      const analysisResult = await analyzeLegalCase(caseDescription, caseType);
      return new Response(JSON.stringify(analysisResult), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    } 
    
    // Handle chat assistant conversation
    const chatResponse = await generateChatResponse(caseDescription, previousMessages, caseData);
    return new Response(JSON.stringify({ response: chatResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

async function getLegalReferences(keywords: string[], category?: string) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  try {
    // Query for relevant articles
    let articlesQuery = supabase
      .from('legal_articles')
      .select(`
        id,
        article_number,
        title,
        description,
        category
      `);
    
    if (category) {
      articlesQuery = articlesQuery.eq('category', category);
    }
    
    const { data: articles, error: articlesError } = await articlesQuery;
    
    if (articlesError) {
      console.error('Error fetching articles:', articlesError);
      return [];
    }

    // Query for relevant sections based on keywords
    const { data: sections, error: sectionsError } = await supabase
      .from('legal_sections')
      .select(`
        id,
        section_number,
        title,
        content,
        applicable_scenarios,
        legal_articles!inner(
          article_number,
          title,
          category
        )
      `);

    if (sectionsError) {
      console.error('Error fetching sections:', sectionsError);
      return articles || [];
    }

    // Filter sections by keyword relevance
    const relevantSections = sections?.filter(section => {
      const scenarios = section.applicable_scenarios || [];
      return keywords.some(keyword => 
        scenarios.some(scenario => scenario.toLowerCase().includes(keyword.toLowerCase())) ||
        section.title.toLowerCase().includes(keyword.toLowerCase()) ||
        section.content.toLowerCase().includes(keyword.toLowerCase())
      );
    }) || [];

    return { articles: articles || [], sections: relevantSections };
  } catch (error) {
    console.error('Error in getLegalReferences:', error);
    return { articles: [], sections: [] };
  }
}

async function saveCaseReference(userId: string, caseDescription: string, articleId?: string, sectionId?: string) {
  if (!userId) return;
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  try {
    await supabase
      .from('case_legal_references')
      .insert({
        user_id: userId,
        case_description: caseDescription,
        article_id: articleId || null,
        section_id: sectionId || null,
        relevance_score: 1
      });
  } catch (error) {
    console.error('Error saving case reference:', error);
  }
}

async function analyzeLegalCase(caseDescription: string, caseType: string) {
  try {
    const keywords = {
      divorce: ["divorce", "marriage", "separation", "alimony", "spouse"],
      custody: ["child", "custody", "visitation", "parenting"],
      housing: ["landlord", "tenant", "rent", "lease", "eviction", "property"],
      employment: ["job", "work", "fired", "termination", "workplace", "employer", "employee", "discrimination"],
      contracts: ["contract", "agreement", "breach", "terms", "business", "partner"],
    };

    let detectedCategories = [];
    const lowerCaseDesc = caseDescription.toLowerCase();
    
    for (const [category, terms] of Object.entries(keywords)) {
      if (terms.some(term => lowerCaseDesc.includes(term))) {
        detectedCategories.push(category);
      }
    }

    if (detectedCategories.length === 0) {
      detectedCategories = ["other"];
    }
    
    // Get legal references from database
    const allKeywords = detectedCategories.flatMap(cat => keywords[cat as keyof typeof keywords] || []);
    const legalRefs = await getLegalReferences(allKeywords, detectedCategories[0]);
    
    const analysis = {
      summary: await generateAnalysisSummary(caseDescription, detectedCategories, legalRefs),
      detectedCategories,
      relatedGuides: getRelatedGuides(detectedCategories),
      legalReferences: legalRefs
    };

    return { analysis };
  } catch (error) {
    console.error("Error analyzing case:", error);
    throw error;
  }
}

async function generateAnalysisSummary(caseDescription: string, categories: string[], legalRefs: any) {
  const categoryText = categories.join(" and ");
  
  let summary = `## Legal Analysis for ${categoryText.charAt(0).toUpperCase() + categoryText.slice(1)} Case\n\n`;
  summary += `Based on your description, your case appears to involve **${categoryText}** law. Here's a detailed analysis:\n\n`;
  
  // Add relevant articles
  if (legalRefs.articles && legalRefs.articles.length > 0) {
    summary += `### Applicable Legal Articles\n\n`;
    legalRefs.articles.slice(0, 2).forEach((article: any) => {
      summary += `**${article.article_number}: ${article.title}**\n`;
      summary += `${article.description}\n\n`;
    });
  }
  
  // Add relevant sections
  if (legalRefs.sections && legalRefs.sections.length > 0) {
    summary += `### Specific Legal Provisions\n\n`;
    legalRefs.sections.slice(0, 3).forEach((section: any) => {
      summary += `**${section.legal_articles.article_number} - ${section.section_number}: ${section.title}**\n`;
      summary += `${section.content}\n\n`;
      
      if (section.applicable_scenarios && section.applicable_scenarios.length > 0) {
        summary += `*Applicable to: ${section.applicable_scenarios.join(', ')}*\n\n`;
      }
    });
  }
  
  summary += `### Next Steps\n\n`;
  summary += `1. **Document Everything**: Gather all relevant documents and evidence\n`;
  summary += `2. **Review Legal Requirements**: Ensure you understand the applicable laws and procedures\n`;
  summary += `3. **Consider Legal Consultation**: For complex matters, consulting with an attorney is recommended\n`;
  summary += `4. **Follow Proper Procedures**: Adhere to required timelines and legal processes\n\n`;
  
  return summary;
}

function getRelatedGuides(categories: string[]) {
  const guideMap = {
    divorce: [
      { id: "g1", title: "How to File for Divorce" },
      { id: "g2", title: "Understanding Alimony and Property Division" },
    ],
    custody: [
      { id: "g2", title: "Child Custody and Support" },
      { id: "g3", title: "Modifying Child Support Orders" },
    ],
    housing: [
      { id: "g5", title: "Dealing with Landlord-Tenant Disputes" },
      { id: "g6", title: "Understanding Eviction Procedures" },
    ],
    employment: [
      { id: "g9", title: "Understanding Wrongful Termination" },
      { id: "g10", title: "Workplace Discrimination Rights" },
    ],
    contracts: [
      { id: "g13", title: "Contract Breach Remedies" },
      { id: "g14", title: "Creating Enforceable Contracts" },
    ],
    other: [
      { id: "family", title: "Browse Family Law Guides" },
      { id: "housing", title: "Browse Housing & Property Guides" },
      { id: "employment", title: "Browse Employment Law Guides" },
    ],
  };

  let guides = [];
  categories.forEach(category => {
    if (guideMap[category as keyof typeof guideMap]) {
      guides = [...guides, ...guideMap[category as keyof typeof guideMap]];
    }
  });
  
  return guides.slice(0, 4);
}

async function generateChatResponse(query: string, previousMessages: any[], caseData: Record<string, string>) {
  try {
    const lowerCaseQuery = query.toLowerCase();
    
    // Extract keywords for legal reference lookup
    const keywordPatterns = {
      divorce: ["divorce", "separate", "marriage", "end", "dissolution"],
      custody: ["custody", "children", "visitation", "child support", "parenting"],
      housing: ["landlord", "tenant", "rent", "eviction", "lease", "apartment", "property"],
      employment: ["fired", "termination", "wrongful", "job", "workplace", "employer", "discrimination"],
      contracts: ["contract", "agreement", "signed", "breach", "violation"]
    };
    
    let detectedCategory = null;
    let matchedKeywords = [];
    
    for (const [category, keywords] of Object.entries(keywordPatterns)) {
      const matches = keywords.filter(keyword => lowerCaseQuery.includes(keyword));
      if (matches.length > 0) {
        detectedCategory = category;
        matchedKeywords = matches;
        break;
      }
    }
    
    // Get legal references if category detected
    let legalRefs = { articles: [], sections: [] };
    if (detectedCategory) {
      legalRefs = await getLegalReferences(matchedKeywords, detectedCategory);
    }
    
    // Generate response based on detected category
    let response = await generateDetailedResponse(detectedCategory, lowerCaseQuery, legalRefs);
    
    return response;
    
  } catch (error) {
    console.error("Error generating chat response:", error);
    return "I'm having trouble processing your question right now. Could you try rephrasing or asking something else?";
  }
}

async function generateDetailedResponse(category: string | null, query: string, legalRefs: any) {
  // Base responses for different categories
  const responses = {
    divorce: `## Divorce Process Legal Guide\n\n### Legal Framework\n**Applicable Law**: Article 125 - Marriage and Divorce Law\n\n`,
    custody: `## Child Custody Legal Guide\n\n### Legal Framework\n**Applicable Law**: Article 89 - Child Custody and Support\n\n`,
    housing: `## Landlord-Tenant Legal Guide\n\n### Legal Framework\n**Applicable Law**: Article 276 - Property Rights and Landlord-Tenant Relations\n\n`,
    employment: `## Employment Law Guide\n\n### Legal Framework\n**Applicable Law**: Article 342 - Employment Rights and Termination\n\n`,
    contracts: `## Contract Law Guide\n\n### Legal Framework\n**Applicable Law**: Article 198 - Contract Law and Breach Remedies\n\n`
  };
  
  let response = responses[category as keyof typeof responses] || `## Legal Analysis\n\n`;
  
  // Add specific legal articles
  if (legalRefs.articles && legalRefs.articles.length > 0) {
    response += `### Relevant Legal Articles\n\n`;
    legalRefs.articles.forEach((article: any) => {
      response += `**${article.article_number}: ${article.title}**\n`;
      response += `${article.description}\n\n`;
    });
  }
  
  // Add specific sections
  if (legalRefs.sections && legalRefs.sections.length > 0) {
    response += `### Applicable Legal Sections\n\n`;
    legalRefs.sections.forEach((section: any) => {
      response += `#### ${section.legal_articles.article_number} - ${section.section_number}: ${section.title}\n\n`;
      response += `${section.content}\n\n`;
      
      if (section.applicable_scenarios && section.applicable_scenarios.length > 0) {
        response += `**Applicable scenarios**: ${section.applicable_scenarios.join(', ')}\n\n`;
      }
    });
  }
  
  // Add specific guidance based on category
  if (category === 'divorce') {
    response += `### Step-by-Step Process\n\n`;
    response += `1. **Preparation Phase**\n   - Gather financial documents and assets inventory\n   - Consider temporary living arrangements\n   - Consult with a family law attorney\n\n`;
    response += `2. **Filing the Petition**\n   - File petition for dissolution in appropriate court\n   - Serve papers to spouse following legal procedures\n   - Wait for mandatory waiting period (varies by jurisdiction)\n\n`;
    response += `3. **Property and Custody Matters**\n   - Negotiate division of marital property\n   - Establish child custody and support arrangements\n   - Consider mediation as alternative to litigation\n\n`;
  } else if (category === 'housing') {
    response += `### Your Rights and Remedies\n\n`;
    response += `1. **Document the Issue**\n   - Keep written records of all communications\n   - Take photos of any problems or damages\n   - Save receipts for any repairs you've paid for\n\n`;
    response += `2. **Formal Notice**\n   - Send written notice to landlord about issues\n   - Use certified mail for important communications\n   - Follow notice periods specified in your lease\n\n`;
    response += `3. **Legal Remedies**\n   - File complaints with local housing authorities\n   - Consider small claims court for monetary damages\n   - Understand your rights regarding rent withholding\n\n`;
  } else if (category === 'employment') {
    response += `### Protecting Your Rights\n\n`;
    response += `1. **Immediate Actions**\n   - Request written explanation for termination\n   - Document all workplace incidents and communications\n   - Apply for unemployment benefits if eligible\n\n`;
    response += `2. **Legal Assessment**\n   - Determine if termination violates anti-discrimination laws\n   - Check for retaliation against protected activities\n   - Review employment contract and company policies\n\n`;
    response += `3. **Available Remedies**\n   - File complaints with EEOC for discrimination\n   - Consider wrongful termination lawsuit if applicable\n   - Negotiate severance or settlement agreements\n\n`;
  }
  
  response += `### Important Considerations\n\n`;
  response += `- **Time Limits**: Many legal actions have strict deadlines (statutes of limitations)\n`;
  response += `- **Documentation**: Proper record-keeping is crucial for any legal matter\n`;
  response += `- **Professional Advice**: Consider consulting with an attorney for complex situations\n`;
  response += `- **Jurisdiction**: Laws may vary by state/locality - verify local requirements\n\n`;
  
  response += `*This guidance is based on general legal principles. For specific advice regarding your situation, please consult with a qualified attorney.*`;
  
  return response;
}
