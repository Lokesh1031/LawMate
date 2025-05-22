
import React from "react";
import { Button } from "@/components/ui/button";
import QuestionAnalysis from "@/components/QuestionAnalysis";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

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
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!analysisResult) return null;

  return (
    <div className="mt-4 space-y-6">
      <QuestionAnalysis
        question={customQuestion}
        answer={analysisResult}
        relatedGuides={relatedGuides}
        onGuideSelect={handleGuideSelect}
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="outline" 
          onClick={handleSaveProgress} 
          disabled={loading || !user}
          className="flex-1"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save Analysis to My Account
        </Button>
        
        {!user && (
          <Button 
            variant="outline"
            onClick={() => navigate("/auth")} 
            className="flex-1 border-lawmate text-lawmate hover:bg-lawmate hover:text-white"
          >
            Sign in to Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default CaseAnalysisResult;
