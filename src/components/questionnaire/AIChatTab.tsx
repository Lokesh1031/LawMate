
import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AIChatAssistant from "@/components/AIChatAssistant";
import { MessageSquareText } from "lucide-react";
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

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-lawmate/20">
        <CardHeader className="bg-lawmate/5">
          <CardTitle className="flex items-center text-lawmate">
            <MessageSquareText className="mr-2" />
            LawMate AI Legal Assistant
          </CardTitle>
        </CardHeader>
      </Card>
      
      <div className="rounded-lg shadow-lg">
        <AIChatAssistant 
          caseData={caseData}
          className="min-h-[500px]" 
        />
      </div>

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
      
      <div className="mt-4 bg-gray-50 border border-gray-200 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>How to use this assistant:</strong> Ask specific questions about your legal situation, such as "What should I do if my landlord refuses to make repairs?" or "What are my rights in a custody dispute?"
        </p>
      </div>
    </div>
  );
};

export default AIChatTab;
