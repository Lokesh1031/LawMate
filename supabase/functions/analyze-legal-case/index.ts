
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { caseDescription, caseType } = await req.json();

    if (!caseDescription) {
      return new Response(
        JSON.stringify({ error: 'Case description is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // This is where we would normally call the OpenAI API
    // Since we don't have an OpenAI API key set up, we'll use a mock response for now
    
    // Analyze the case based on keywords in the description
    const legalAnalysis = analyzeLegalCase(caseDescription, caseType);
    
    return new Response(
      JSON.stringify({ analysis: legalAnalysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-legal-case function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function analyzeLegalCase(description: string, caseType?: string) {
  const descriptionLower = description.toLowerCase();
  
  // Mock AI analysis based on keywords
  if (descriptionLower.includes('divorce') || descriptionLower.includes('custody') || descriptionLower.includes('child support')) {
    return {
      summary: "Your case appears to involve family law matters, specifically related to divorce or child custody.",
      steps: [
        "Understand your state's residency requirements for filing divorce",
        "Gather financial documents, including assets and debts",
        "Consider whether you need temporary orders for child custody or support",
        "Determine if mediation is required in your jurisdiction",
        "File a petition for dissolution of marriage with your local court"
      ],
      relatedGuides: [
        { id: "g1", title: "How to File for Divorce" },
        { id: "g2", title: "Child Custody and Support Guide" },
        { id: "g3", title: "Navigating Divorce Mediation" }
      ]
    };
  } 
  else if (descriptionLower.includes('evict') || descriptionLower.includes('landlord') || descriptionLower.includes('tenant') || descriptionLower.includes('lease') || descriptionLower.includes('rent')) {
    return {
      summary: "Your case involves landlord-tenant law, which governs the rental of commercial and residential property.",
      steps: [
        "Review your lease agreement carefully",
        "Document all communications with your landlord/tenant",
        "Research your state's specific tenant rights laws",
        "Consider sending a formal written notice about the issue",
        "Determine if you need to file a complaint with local housing authorities"
      ],
      relatedGuides: [
        { id: "g5", title: "Tenant Rights and Responsibilities" },
        { id: "g6", title: "How to Handle Eviction Notices" },
        { id: "g7", title: "Security Deposit Disputes" }
      ]
    };
  }
  else if (descriptionLower.includes('fired') || descriptionLower.includes('wrongful termination') || descriptionLower.includes('discrimination') || descriptionLower.includes('workplace') || descriptionLower.includes('harassment')) {
    return {
      summary: "Your situation appears to involve employment law, specifically relating to potential wrongful termination or workplace discrimination.",
      steps: [
        "Gather all documentation related to your employment and termination",
        "Review your employment contract and company policies",
        "Document any instances of discrimination or harassment",
        "Check deadlines for filing with the Equal Employment Opportunity Commission (EEOC)",
        "Consider consulting with an employment attorney about your specific situation"
      ],
      relatedGuides: [
        { id: "g9", title: "Understanding Wrongful Termination" },
        { id: "g10", title: "How to File an EEOC Complaint" },
        { id: "g11", title: "Workplace Discrimination Laws" }
      ]
    };
  }
  else if (descriptionLower.includes('contract') || descriptionLower.includes('agreement') || descriptionLower.includes('breach') || descriptionLower.includes('business')) {
    return {
      summary: "Your case involves contract law, which governs agreements between parties and the remedies when those agreements are breached.",
      steps: [
        "Review all terms of the contract in question",
        "Identify the specific breach or issue with the agreement",
        "Gather evidence of performance or non-performance",
        "Consider sending a demand letter outlining the breach",
        "Research statute of limitations for contract claims in your jurisdiction"
      ],
      relatedGuides: [
        { id: "g13", title: "Understanding Contract Breaches" },
        { id: "g14", title: "How to Write an Effective Demand Letter" },
        { id: "g15", title: "Small Claims Court Procedures" }
      ]
    };
  }
  else {
    // Generic response for other types of cases
    return {
      summary: "Based on your description, we need more specific information to provide detailed guidance. However, here are some general steps to help you navigate your legal issue.",
      steps: [
        "Document all relevant facts and timeline of events",
        "Gather any supporting evidence or documentation",
        "Research applicable laws in your jurisdiction",
        "Consider whether you need to send formal notice to other parties",
        "Determine appropriate filing deadlines and legal forums"
      ],
      relatedGuides: [
        { id: "general1", title: "How to Research Legal Issues" },
        { id: "general2", title: "Documentation Best Practices" },
        { id: "general3", title: "When to Consult an Attorney" }
      ]
    };
  }
}
