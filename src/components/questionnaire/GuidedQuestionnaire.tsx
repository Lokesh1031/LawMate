
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowRight, ChevronRight } from "lucide-react";
import { getQuestionById } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { CaseData } from "@/hooks/useUserCase";

interface GuidedQuestionnaireProps {
  caseData: CaseData;
  handleOptionSelect: (optionId: string) => void;
  handleBack: () => void;
  handleResetQuestionnaire: () => void;
}

const GuidedQuestionnaire: React.FC<GuidedQuestionnaireProps> = ({
  caseData,
  handleOptionSelect,
  handleBack,
  handleResetQuestionnaire,
}) => {
  const navigate = useNavigate();
  const currentQuestion = getQuestionById(caseData.currentQuestionId);

  if (!currentQuestion) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">Question not found. Please start over.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleResetQuestionnaire}>Start Over</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center mb-2">
          <HelpCircle className="text-lawmate mr-2 h-5 w-5" />
          <CardTitle>Question {caseData.currentQuestionId.replace('q', '')}</CardTitle>
        </div>
        <CardDescription>
          Select the option that best describes your situation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-6">{currentQuestion.text}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              className="w-full justify-between text-left h-auto py-4 px-6 text-base hover:bg-lawmate hover:text-white transition-all"
              onClick={() => handleOptionSelect(option.id)}
            >
              <span>{option.text}</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="ghost" onClick={handleBack}>
            Back
          </Button>
          <Button variant="outline" onClick={handleResetQuestionnaire}>
            Reset
          </Button>
        </div>
        <Button
          variant="link"
          className="text-lawmate"
          onClick={() => navigate("/categories")}
        >
          Browse All Categories <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GuidedQuestionnaire;
