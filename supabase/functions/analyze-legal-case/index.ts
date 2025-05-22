
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

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

async function analyzeLegalCase(caseDescription: string, caseType: string) {
  try {
    // This is a placeholder for the actual analysis logic
    // In a real implementation, you would call an AI model API here
    
    // For now, we'll use a keyword-based approach to simulate AI analysis
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

    // If no categories were detected, default to "other"
    if (detectedCategories.length === 0) {
      detectedCategories = ["other"];
    }
    
    // Generate sample analysis
    const analysis = {
      summary: generateAnalysisSummary(caseDescription, detectedCategories),
      detectedCategories,
      relatedGuides: getRelatedGuides(detectedCategories),
    };

    return { analysis };
  } catch (error) {
    console.error("Error analyzing case:", error);
    throw error;
  }
}

function generateAnalysisSummary(caseDescription: string, categories: string[]) {
  // This is a simple template-based summary generator for demonstration
  const categoryText = categories.join(" and ");
  
  const templates = [
    `Based on your description, your case appears to involve ${categoryText} law. We've identified some key legal considerations you should be aware of.`,
    `Your situation has elements related to ${categoryText}. Here are some important legal aspects to consider.`,
    `We've analyzed your case and identified it primarily relates to ${categoryText}. Consider reviewing the following legal resources.`,
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
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
  
  // Limit to 4 guides max to avoid overwhelming the user
  return guides.slice(0, 4);
}

async function generateChatResponse(query: string, previousMessages: any[], caseData: Record<string, string>) {
  try {
    // This is a placeholder for the actual chat response generation
    // In a real implementation, you would call an AI model API here

    // Extract key information from the query
    const lowerCaseQuery = query.toLowerCase();
    
    // List of responses based on common legal questions
    const responses = [
      {
        keywords: ["divorce", "separate", "marriage", "end"],
        response: "If you're considering divorce, here are the typical steps:\n\n1. Consult with a lawyer to understand your rights\n2. Gather financial documents\n3. Consider mediation as an option\n4. File a petition for divorce\n5. Negotiate a settlement for property division\n\nWould you like more detailed information on any of these steps?"
      },
      {
        keywords: ["custody", "children", "visitation", "child support"],
        response: "Child custody matters are determined based on the best interests of the child. Courts typically consider factors like:\n\n- The child's age and needs\n- Each parent's ability to provide care\n- The child's existing relationship with each parent\n- Stability of each home environment\n\nDocumenting your involvement in your child's life and creating a reasonable parenting plan can be helpful."
      },
      {
        keywords: ["landlord", "tenant", "rent", "eviction", "lease", "apartment"],
        response: "In landlord-tenant disputes, it's important to know that:\n\n1. Your lease is the primary contract governing your rights\n2. Most states have specific procedures landlords must follow for evictions\n3. Security deposit returns typically have time limitations\n4. Repairs and habitability issues often have legal remedies\n\nDo you have a specific issue with your landlord or rental that I can address?"
      },
      {
        keywords: ["fired", "termination", "wrongful", "job", "workplace", "employer"],
        response: "If you believe you were wrongfully terminated, consider the following:\n\n1. Was your termination potentially based on discrimination (race, gender, age, disability, etc.)?\n2. Were you fired after reporting illegal activity (whistleblowing)?\n3. Did your termination violate an employment contract?\n4. Were you fired for taking legally protected leave?\n\nDepending on your situation, you may want to gather documentation of your employment and the circumstances of your termination."
      },
      {
        keywords: ["contract", "agreement", "signed", "breach", "violation"],
        response: "For contract issues, the key elements to consider are:\n\n1. Was there a valid contract? (offer, acceptance, consideration)\n2. What specific terms may have been breached?\n3. Did you suffer damages from the breach?\n4. Are there remedy provisions in the contract itself?\n\nPreserving all communications and documentation related to the agreement is essential for contract disputes."
      }
    ];

    // Check if any keywords match
    for (const responseOption of responses) {
      if (responseOption.keywords.some(keyword => lowerCaseQuery.includes(keyword))) {
        return responseOption.response;
      }
    }

    // If no matches, return a generic response
    return "Thank you for your question. While I can provide general information about legal concepts, your situation may have specific details that would require a customized analysis. Could you provide more details about your legal concern, or ask about a specific area of law you'd like to understand better?";
    
  } catch (error) {
    console.error("Error generating chat response:", error);
    return "I'm having trouble processing your question right now. Could you try rephrasing or asking something else?";
  }
}
