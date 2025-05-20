
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BadgeInfo } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuestionAnalysisProps {
  question: string;
  answer: string;
  relatedGuides: Array<{
    id: string;
    title: string;
  }>;
  onGuideSelect: (guideId: string) => void;
}

const QuestionAnalysis: React.FC<QuestionAnalysisProps> = ({
  question,
  answer,
  relatedGuides,
  onGuideSelect,
}) => {
  return (
    <div className="space-y-4">
      <Alert className="bg-blue-50 border-blue-200">
        <BadgeInfo className="h-4 w-4 text-blue-500" />
        <AlertTitle className="text-blue-700">Your Question</AlertTitle>
        <AlertDescription className="text-blue-600">
          {question}
        </AlertDescription>
      </Alert>
      
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="font-medium text-lg mb-2 text-lawmate">Analysis</h3>
        <p className="text-gray-700 mb-4">{answer}</p>
        
        {relatedGuides.length > 0 && (
          <>
            <h4 className="font-medium mb-2">Recommended Guides</h4>
            <div className="space-y-2">
              {relatedGuides.map((guide) => (
                <Button 
                  key={guide.id}
                  variant="outline" 
                  className="w-full justify-start text-left hover:bg-lawmate/10"
                  onClick={() => onGuideSelect(guide.id)}
                >
                  {guide.title}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionAnalysis;
