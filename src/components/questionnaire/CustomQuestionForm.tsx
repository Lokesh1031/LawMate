
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import QuestionAnalysis from "@/components/QuestionAnalysis";

interface CustomQuestionFormProps {
  customQuestion: string;
  setCustomQuestion: (value: string) => void;
  analysisResult: string | null;
  relatedGuides: Array<{id: string; title: string;}>;
  isAnalyzing: boolean;
  loading: boolean;
  handleSubmitCustomQuestion: () => void;
  handleGuideSelect: (guideId: string) => void;
  handleResetQuestionnaire: () => void;
  handleSaveProgress: () => void;
}

const CustomQuestionForm: React.FC<CustomQuestionFormProps> = ({
  customQuestion,
  setCustomQuestion,
  analysisResult,
  relatedGuides,
  isAnalyzing,
  loading,
  handleSubmitCustomQuestion,
  handleGuideSelect,
  handleResetQuestionnaire,
  handleSaveProgress,
}) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Describe Your Legal Issue</CardTitle>
        <CardDescription>
          Provide details about your case and our AI will analyze it to give you the best guidance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="legal-question">Your legal question or issue</Label>
          <Textarea
            id="legal-question"
            placeholder="Explain your situation in detail. For example: 'My landlord hasn't fixed my broken heater for 3 weeks despite multiple requests. What are my rights?'"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            rows={5}
            className="resize-none"
          />
        </div>
        
        {analysisResult && (
          <QuestionAnalysis
            question={customQuestion}
            answer={analysisResult}
            relatedGuides={relatedGuides}
            onGuideSelect={handleGuideSelect}
          />
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleResetQuestionnaire}>
            Reset
          </Button>
          {analysisResult && (
            <Button variant="outline" onClick={handleSaveProgress} disabled={loading}>
              <Save className="mr-2 h-4 w-4" /> Save Progress
            </Button>
          )}
        </div>
        <Button
          onClick={handleSubmitCustomQuestion}
          disabled={!customQuestion.trim() || isAnalyzing}
          className="bg-lawmate hover:bg-lawmate-light"
        >
          {isAnalyzing ? "Analyzing..." : "Get AI Legal Analysis"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomQuestionForm;
