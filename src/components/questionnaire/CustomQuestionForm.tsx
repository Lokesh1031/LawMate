
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Lightbulb, Loader2, RefreshCw } from "lucide-react";
import CaseAnalysisResult from "./CaseAnalysisResult";

interface LegalReference {
  articles?: Array<{
    id: string;
    article_number: string;
    title: string;
    description: string;
    category: string;
  }>;
  sections?: Array<{
    id: string;
    section_number: string;
    title: string;
    content: string;
    applicable_scenarios: string[];
    legal_articles: {
      article_number: string;
      title: string;
      category: string;
    };
  }>;
}

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
  legalReferences?: LegalReference;
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
  legalReferences
}) => {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-lawmate/20">
        <CardHeader className="bg-lawmate/5">
          <CardTitle className="flex items-center text-lawmate">
            <Lightbulb className="mr-2" />
            Describe Your Legal Case
          </CardTitle>
          <CardDescription>
            Tell us about your specific legal situation in detail. Our AI will analyze your case and provide comprehensive guidance with relevant legal articles and sections.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="case-description" className="block text-sm font-medium mb-2">
                Case Description
              </label>
              <Textarea
                id="case-description"
                placeholder="Describe your legal issue in detail. Include relevant facts, dates, and circumstances. The more specific you are, the better guidance we can provide..."
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                className="min-h-[120px] resize-none"
                disabled={isAnalyzing}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleSubmitCustomQuestion}
                disabled={!customQuestion.trim() || isAnalyzing}
                className="flex-1 bg-lawmate hover:bg-lawmate/90"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Case...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Analyze My Case
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleResetQuestionnaire}
                disabled={isAnalyzing}
                className="flex-1"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Start Over
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {analysisResult && (
        <CaseAnalysisResult
          customQuestion={customQuestion}
          analysisResult={analysisResult}
          relatedGuides={relatedGuides}
          handleGuideSelect={handleGuideSelect}
          handleSaveProgress={handleSaveProgress}
          loading={loading}
          legalReferences={legalReferences}
        />
      )}
    </div>
  );
};

export default CustomQuestionForm;
