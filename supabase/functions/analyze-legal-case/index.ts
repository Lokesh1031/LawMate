
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
        response: "## Steps for Divorce Process\n\n1. **Initial Consultation**\n   - Consult with a family law attorney to understand your rights\n   - Learn about your state's specific divorce laws\n   - Understand the timeline and costs involved\n\n2. **Preparation Phase**\n   - Gather all financial documents (bank statements, tax returns, property deeds)\n   - Create an inventory of marital assets and debts\n   - Consider temporary living arrangements if needed\n\n3. **Filing Procedure**\n   - File a petition for dissolution of marriage\n   - Serve the divorce papers to your spouse\n   - Wait for the mandatory waiting period (varies by state)\n\n4. **Negotiation & Settlement**\n   - Attend mediation sessions if required by your state\n   - Negotiate property division, alimony, child custody and support\n   - Consider collaborative divorce or arbitration as alternatives\n\n5. **Finalization**\n   - Submit your settlement agreement to the court\n   - Attend the final divorce hearing if required\n   - Receive the final divorce decree\n\nWould you like more detailed information about any specific step?"
      },
      {
        keywords: ["custody", "children", "visitation", "child support"],
        response: "## Child Custody Process Guide\n\n1. **Understanding Custody Types**\n   - Legal custody: Decision-making authority for education, healthcare, etc.\n   - Physical custody: Where the child primarily lives\n   - Joint custody: Shared responsibilities between parents\n   - Sole custody: One parent has primary responsibilities\n\n2. **Determining Factors**\n   - The child's age and specific needs\n   - Each parent's ability to provide stable care\n   - The child's existing relationship with each parent\n   - Home environment stability and safety considerations\n   - Child's preferences (if old enough, usually 12+ years)\n\n3. **Creating a Parenting Plan**\n   - Develop a detailed visitation schedule\n   - Include holiday and special occasion arrangements\n   - Address transportation and exchange logistics\n   - Plan for communication between parents and children\n\n4. **Legal Proceedings**\n   - File for custody as part of divorce or separately\n   - Attend mandatory mediation in most jurisdictions\n   - Prepare for possible home evaluations\n   - Consider guardian ad litem appointment for the child\n\n5. **Post-Judgment Modifications**\n   - Understand when and how to request changes\n   - Document significant changes in circumstances\n   - Follow proper legal procedures for modifications\n\nDo you have specific questions about any of these steps?"
      },
      {
        keywords: ["landlord", "tenant", "rent", "eviction", "lease", "apartment"],
        response: "## Landlord-Tenant Dispute Resolution Steps\n\n1. **Know Your Legal Rights**\n   - Review your lease agreement thoroughly\n   - Research your state and local tenant protection laws\n   - Understand security deposit regulations and timelines\n   - Learn about proper eviction procedures in your jurisdiction\n\n2. **Document Everything**\n   - Keep copies of all communications with your landlord\n   - Take dated photos of any maintenance issues or damages\n   - Save receipts for any repairs you've paid for\n   - Record dates of all verbal conversations and their content\n\n3. **Formal Communication**\n   - Send written notices for all requests and complaints\n   - Use certified mail for important communications\n   - Follow notice periods specified in your lease\n   - Keep your tone professional and factual\n\n4. **Mediation Options**\n   - Contact local tenant advocacy organizations\n   - Consider third-party mediation services\n   - Check if your city has a rent board or housing department\n   - Explore university legal clinics for free/low-cost assistance\n\n5. **Legal Proceedings**\n   - File in small claims court for amounts under the limit (typically $5,000-$10,000)\n   - Consider hiring an attorney for complex cases\n   - Prepare all evidence in chronological order\n   - Know possible remedies: rent abatement, damages, specific performance\n\nWhat specific landlord-tenant issue are you facing?"
      },
      {
        keywords: ["fired", "termination", "wrongful", "job", "workplace", "employer"],
        response: "## Wrongful Termination Action Plan\n\n1. **Immediate Steps After Termination**\n   - Request a written explanation for your termination\n   - Obtain a copy of your personnel file if legally entitled\n   - Ask about final paycheck, benefits continuation, and severance\n   - Avoid signing any documents without review\n   - Apply for unemployment benefits promptly\n\n2. **Assess Your Situation**\n   - Determine if you were an at-will employee or had a contract\n   - Identify potential illegal reasons for termination:\n     * Discrimination (race, gender, age, disability, etc.)\n     * Retaliation for protected activities\n     * Whistleblowing or refusing illegal activities\n     * Taking legally protected leave (FMLA, etc.)\n\n3. **Gather Documentation**\n   - Collect performance reviews and commendations\n   - Save all work emails and communications\n   - List witnesses to relevant incidents\n   - Document timeline of events leading to termination\n   - Retain pay stubs and benefit information\n\n4. **Consult With Professionals**\n   - Schedule consultations with employment attorneys\n   - Contact your state's labor department\n   - Reach out to the EEOC if discrimination is involved\n   - Speak with a career counselor about next steps\n\n5. **Potential Legal Actions**\n   - File administrative complaints within strict time limits\n   - Consider demand letters before litigation\n   - Evaluate settlement offers carefully\n   - Prepare for possible litigation timelines and costs\n\nWhat specific aspects of your termination do you believe were wrongful?"
      },
      {
        keywords: ["contract", "agreement", "signed", "breach", "violation"],
        response: "## Contract Dispute Resolution Process\n\n1. **Contract Analysis**\n   - Identify the specific terms that may have been breached\n   - Review the entire agreement for related clauses\n   - Check for remedy provisions within the contract\n   - Understand applicable statute of limitations\n   - Identify the governing law (state/jurisdiction)\n\n2. **Evidence Collection**\n   - Gather all contract versions and amendments\n   - Compile relevant communications about the agreement\n   - Document damages resulting from the breach\n   - Collect proof of your own performance under the contract\n   - Organize timeline of events related to the breach\n\n3. **Pre-Litigation Steps**\n   - Send a formal demand letter outlining the breach\n   - Review dispute resolution clauses (mediation/arbitration requirements)\n   - Calculate specific damages with documentation\n   - Consider offering settlement options\n   - Evaluate costs of various resolution methods\n\n4. **Alternative Dispute Resolution**\n   - Engage in direct negotiation with the other party\n   - Consider mediation with a neutral third party\n   - Evaluate binding or non-binding arbitration\n   - Understand the enforceability of arbitration decisions\n   - Prepare comprehensive position statements\n\n5. **Litigation Process**\n   - File a complaint within the statute of limitations\n   - Participate in discovery process (documents, depositions)\n   - Consider motions for summary judgment\n   - Prepare for trial procedures and requirements\n   - Understand potential remedies: specific performance, damages, rescission\n\nWhat specific contract terms do you believe have been breached in your situation?"
      }
    ];

    // Check if any keywords match
    for (const responseOption of responses) {
      if (responseOption.keywords.some(keyword => lowerCaseQuery.includes(keyword))) {
        return responseOption.response;
      }
    }

    // If no matches, return a generic structured response
    return "## Legal Question Analysis\n\n1. **Understanding Your Situation**\n   - Every legal case requires a clear understanding of the specific facts\n   - Details about timeline, parties involved, and documentation are crucial\n   - The jurisdiction where your case would be heard affects applicable laws\n\n2. **Legal Framework**\n   - Different areas of law have specific requirements and procedures\n   - State and federal laws may both apply to your situation\n   - Case precedents can significantly impact potential outcomes\n\n3. **Potential Options**\n   - Most legal matters have multiple resolution pathways\n   - Consider both litigation and alternative dispute resolution methods\n   - Each option has different timelines, costs, and potential outcomes\n\n4. **Documentation Needs**\n   - Proper documentation is critical for all legal matters\n   - Start gathering relevant communications, contracts, and records\n   - Create a chronological timeline of important events\n\n5. **Next Steps**\n   - Consider consulting with an attorney specializing in your specific issue\n   - Research local legal aid if cost is a concern\n   - Be aware of any approaching deadlines or statutes of limitations\n\nCould you provide more specific details about your legal situation? This would help me provide more tailored guidance.";
    
  } catch (error) {
    console.error("Error generating chat response:", error);
    return "I'm having trouble processing your question right now. Could you try rephrasing or asking something else?";
  }
}
