
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenBox, Lightbulb, MessageSquareText } from "lucide-react";
import GuidedQuestionnaire from "./GuidedQuestionnaire";
import CustomQuestionForm from "./CustomQuestionForm";
import AIChatTab from "./AIChatTab";
import { CaseData } from "@/hooks/useUserCase";

interface QuestionnaireTabsProps {
  activeTab: "guided" | "custom" | "assistant";
  setActiveTab: (tab: "guided" | "custom" | "assistant") => void;
  caseData: CaseData;
  customQuestion: string;
  setCustomQuestion: (value: string) => void;
  analysisResult: string | null;
  relatedGuides: Array<{id: string; title: string;}>;
  isAnalyzing: boolean;
  loading: boolean;
  handleSubmitCustomQuestion: () => void;
  handleGuideSelect: (guideId: string) => void;
  handleSaveProgress: () => void;
  handleOptionSelect: (optionId: string) => void;
  handleBack: () => void;
  handleResetQuestionnaire: () => void;
}

const QuestionnaireTabs: React.FC<QuestionnaireTabsProps> = ({
  activeTab,
  setActiveTab,
  caseData,
  customQuestion,
  setCustomQuestion,
  analysisResult,
  relatedGuides,
  isAnalyzing,
  loading,
  handleSubmitCustomQuestion,
  handleGuideSelect,
  handleSaveProgress,
  handleOptionSelect,
  handleBack,
  handleResetQuestionnaire
}) => {
  return (
    <Tabs defaultValue="guided" value={activeTab} onValueChange={(value) => setActiveTab(value as "guided" | "custom" | "assistant")}>
      <TabsList className="w-full mb-6">
        <TabsTrigger value="guided" className="flex-1 flex items-center justify-center">
          <PenBox className="mr-2 h-4 w-4" /> Guided Questionnaire
        </TabsTrigger>
        <TabsTrigger value="custom" className="flex-1 flex items-center justify-center">
          <Lightbulb className="mr-2 h-4 w-4" /> Describe Your Case
        </TabsTrigger>
        <TabsTrigger value="assistant" className="flex-1 flex items-center justify-center">
          <MessageSquareText className="mr-2 h-4 w-4" /> AI Assistant
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="guided">
        <GuidedQuestionnaire
          caseData={caseData}
          handleOptionSelect={handleOptionSelect}
          handleBack={handleBack}
          handleResetQuestionnaire={handleResetQuestionnaire}
        />
      </TabsContent>
      
      <TabsContent value="custom">
        <CustomQuestionForm
          customQuestion={customQuestion}
          setCustomQuestion={setCustomQuestion}
          analysisResult={analysisResult}
          relatedGuides={relatedGuides}
          isAnalyzing={isAnalyzing}
          loading={loading}
          handleSubmitCustomQuestion={handleSubmitCustomQuestion}
          handleGuideSelect={handleGuideSelect}
          handleResetQuestionnaire={handleResetQuestionnaire}
          handleSaveProgress={handleSaveProgress}
        />
      </TabsContent>
      
      <TabsContent value="assistant">
        <AIChatTab caseData={caseData.answers} />
      </TabsContent>
    </Tabs>
  );
};

export default QuestionnaireTabs;
