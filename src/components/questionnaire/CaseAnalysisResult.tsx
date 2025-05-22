
import React from "react";
import { Button } from "@/components/ui/button";
import QuestionAnalysis from "@/components/QuestionAnalysis";

interface CaseAnalysisResultProps {
  customQuestion: string;
  analysisResult: string | null;
  relatedGuides: Array<{id: string; title: string;}>;
  handleGuideSelect: (guideId: string) => void;
  handleSaveProgress: () => void;
  loading: boolean;
}

const CaseAnalysisResult: React.FC<CaseAnalysisResultProps> = ({
  customQuestion,
  analysisResult,
  relatedGuides,
  handleGuideSelect,
  handleSaveProgress,
  loading
}) => {
  if (!analysisResult) return null;

  return (
    <div className="mt-4">
      <QuestionAnalysis
        question={customQuestion}
        answer={analysisResult}
        relatedGuides={relatedGuides}
        onGuideSelect={handleGuideSelect}
      />
      <div className="mt-4">
        <Button variant="outline" onClick={handleSaveProgress} disabled={loading}>
          Save Analysis to My Account
        </Button>
      </div>
    </div>
  );
};

export default CaseAnalysisResult;
