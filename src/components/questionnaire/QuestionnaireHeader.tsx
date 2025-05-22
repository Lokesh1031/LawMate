
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import CaseProgress from "@/components/CaseProgress";

interface QuestionnaireHeaderProps {
  currentStep: number;
  totalSteps: number;
  completedQuestions: number;
  totalQuestions: number;
  activeTab: string;
  showProgress?: boolean;
}

const QuestionnaireHeader: React.FC<QuestionnaireHeaderProps> = ({
  currentStep,
  totalSteps,
  completedQuestions,
  totalQuestions,
  activeTab,
  showProgress = true,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-lawmate mb-4">Legal Issue Assessment</h1>
      <p className="text-gray-600">
        Get step-by-step guidance tailored to your legal situation. Choose our guided questionnaire, describe your case in your own words, or chat with our AI assistant.
      </p>
      
      {!user && (
        <div className="mt-4">
          <Button variant="outline" onClick={() => navigate("/auth")}>
            Sign in to save your progress
          </Button>
        </div>
      )}
      
      {showProgress && activeTab === "guided" && (
        <div className="mt-6">
          <CaseProgress 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
            completedQuestions={completedQuestions} 
            totalQuestions={totalQuestions}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionnaireHeader;
