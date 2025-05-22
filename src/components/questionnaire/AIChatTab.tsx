
import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AIChatAssistant from "@/components/AIChatAssistant";
import { MessageSquareText, HelpCircle, Lightbulb } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AIChatTabProps {
  caseData: Record<string, string>;
}

const AIChatTab: React.FC<AIChatTabProps> = ({ caseData }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!user) {
      toast({
        title: "Sign in recommended",
        description: "Creating an account helps us provide more personalized legal guidance.",
      });
    }
  }, [user, toast]);

  // Sample questions to help users get started
  const sampleQuestions = [
    "What are the steps to file for divorce in my state?",
    "How can I handle a landlord who won't make necessary repairs?",
    "What should I do if I believe I was wrongfully terminated?",
    "What are my rights in a child custody dispute?",
    "How do I respond to a breach of contract?"
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-lawmate/20">
        <CardHeader className="bg-lawmate/5">
          <CardTitle className="flex items-center text-lawmate">
            <MessageSquareText className="mr-2" />
            LawMate AI Legal Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-gray-700 mb-4">
            Ask specific questions about your legal situation and I'll provide step-by-step guidance. For better results, include relevant details about your case.
          </p>
        </CardContent>
      </Card>
      
      <div className="rounded-lg shadow-lg">
        <AIChatAssistant 
          caseData={caseData}
          className="min-h-[500px]" 
        />
      </div>

      <Card className="bg-blue-50 border border-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-blue-700 flex items-center text-lg">
            <Lightbulb className="h-5 w-5 mr-2" />
            Sample Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sampleQuestions.map((question, index) => (
              <div key={index} className="p-2 bg-white rounded-md border border-blue-100 text-gray-700 text-sm">
                {question}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {!user && (
        <div className="mt-6 bg-blue-50 border border-blue-100 p-4 rounded-lg">
          <p className="text-blue-700 mb-2">
            Sign in to save your conversation history and receive more personalized legal guidance.
          </p>
          <Button 
            variant="outline" 
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
            onClick={() => navigate("/auth")}
          >
            Sign in or Create Account
          </Button>
        </div>
      )}
    </div>
  );
};

export default AIChatTab;
