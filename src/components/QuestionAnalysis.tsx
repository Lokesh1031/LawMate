
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BadgeInfo, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

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
    <div className="space-y-6">
      <Alert className="bg-blue-50 border-blue-200">
        <BadgeInfo className="h-4 w-4 text-blue-500" />
        <AlertTitle className="text-blue-700">Your Legal Question</AlertTitle>
        <AlertDescription className="text-blue-600">
          {question}
        </AlertDescription>
      </Alert>
      
      <Card className="border-lawmate/20 shadow-md">
        <CardHeader className="bg-lawmate/5">
          <CardTitle className="text-lawmate">AI Legal Analysis</CardTitle>
          <CardDescription>
            Based on your description, we've analyzed your situation and found potential legal considerations
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-gray-700 mb-6 prose prose-sm max-w-none">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
          
          {relatedGuides.length > 0 && (
            <>
              <h4 className="font-medium mb-3 text-lawmate">Recommended Legal Guides</h4>
              <div className="space-y-2">
                {relatedGuides.map((guide) => (
                  <Button 
                    key={guide.id}
                    variant="outline" 
                    className="w-full justify-between text-left hover:bg-lawmate/10 transition-all"
                    onClick={() => onGuideSelect(guide.id)}
                  >
                    <span>{guide.title}</span>
                    <ArrowRight className="h-4 w-4 text-lawmate" />
                  </Button>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionAnalysis;
