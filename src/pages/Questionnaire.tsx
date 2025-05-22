
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import CaseProgress from "@/components/CaseProgress";
import { useUserCase } from "@/hooks/useUserCase";
import { supabase } from "@/integrations/supabase/client";
import { PenBox, Lightbulb, MessageSquareText } from "lucide-react";
import { getGuideById } from "@/lib/data";
import { getQuestionById } from "@/lib/questions";
import GuidedQuestionnaire from "@/components/questionnaire/GuidedQuestionnaire";
import CustomQuestionForm from "@/components/questionnaire/CustomQuestionForm";
import AIChatAssistant from "@/components/AIChatAssistant";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Questionnaire = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { caseData, updateCase, resetCase, saveCaseToDatabase, loading } = useUserCase();
  
  const [activeTab, setActiveTab] = useState<"guided" | "custom" | "assistant">("guided");
  const [customQuestion, setCustomQuestion] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [relatedGuides, setRelatedGuides] = useState<Array<{id: string; title: string;}>>([]);

  const totalQuestions = 6; // Total questions in the questionnaire
  const completedQuestions = Object.keys(caseData.answers).length;
  const currentStep = Math.min(completedQuestions + 1, 5); // Cap at 5 steps

  const handleOptionSelect = (optionId: string) => {
    const currentQuestion = getQuestionById(caseData.currentQuestionId);
    if (!currentQuestion) return;
    
    // Record the answer
    const updatedAnswers = {
      ...caseData.answers,
      [caseData.currentQuestionId]: optionId,
    };

    // Find the selected option
    const selectedOption = currentQuestion.options.find((opt) => opt.id === optionId);
    if (!selectedOption) return;

    // If there's a guide associated with this answer, navigate to it
    if (selectedOption.guideId) {
      // Save completion state before navigating
      updateCase({
        answers: updatedAnswers,
        caseType: currentQuestion.text,
        analysisResult: `Based on your answers, we recommend reviewing our guide on ${getGuideById(selectedOption.guideId)?.title || "this legal matter"}.`,
      });
      
      saveCaseToDatabase().then(() => {
        toast({
          title: "Case evaluation complete",
          description: "Navigating to your recommended guide.",
        });
        navigate(`/guide/${selectedOption.guideId}`);
      });
      return;
    }

    // Otherwise, move to the next question
    if (selectedOption.nextQuestionId) {
      updateCase({
        currentQuestionId: selectedOption.nextQuestionId,
        previousQuestions: [...caseData.previousQuestions, caseData.currentQuestionId],
        answers: updatedAnswers,
      });
    }
  };

  const handleBack = () => {
    if (caseData.previousQuestions.length === 0) {
      navigate("/");
      return;
    }

    const prevQuestionId = caseData.previousQuestions[caseData.previousQuestions.length - 1];
    updateCase({
      currentQuestionId: prevQuestionId,
      previousQuestions: caseData.previousQuestions.slice(0, -1),
    });
  };

  const handleSubmitCustomQuestion = async () => {
    if (!customQuestion.trim()) {
      toast({
        title: "Please enter your question",
        description: "Describe your legal issue in detail for better guidance.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Call the Supabase edge function to analyze the case
      const { data, error } = await supabase.functions.invoke('analyze-legal-case', {
        body: {
          caseDescription: customQuestion,
          caseType: "Custom question"
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to analyze your case');
      }

      if (data && data.analysis) {
        setAnalysisResult(data.analysis.summary);
        setRelatedGuides(data.analysis.relatedGuides || []);
        
        // Store this information
        updateCase({
          caseType: "Custom question",
          analysisResult: data.analysis.summary,
        });
        
        await saveCaseToDatabase();
      }
    } catch (error) {
      console.error('Error analyzing case:', error);
      
      // Fallback to simple keyword matching if the edge function fails
      const resultText = "Based on your question, we've identified some potential legal issues. Please review the recommended guides below.";
      let matchedGuides = [];
      
      const question = customQuestion.toLowerCase();
      
      if (question.includes('divorce') || question.includes('custody') || question.includes('marriage')) {
        matchedGuides.push({ id: "g1", title: "How to File for Divorce" });
        matchedGuides.push({ id: "g2", title: "Child Custody and Support" });
      } 
      
      if (question.includes('landlord') || question.includes('tenant') || question.includes('rent') || question.includes('lease')) {
        matchedGuides.push({ id: "g5", title: "Dealing with Landlord-Tenant Disputes" });
      }
      
      if (question.includes('fired') || question.includes('termination') || question.includes('workplace')) {
        matchedGuides.push({ id: "g9", title: "Understanding Wrongful Termination" });
      }
      
      if (matchedGuides.length === 0) {
        matchedGuides = [
          { id: "family", title: "Browse Family Law Guides" },
          { id: "housing", title: "Browse Housing & Property Guides" },
          { id: "employment", title: "Browse Employment Law Guides" },
        ];
      }
      
      setAnalysisResult(resultText);
      setRelatedGuides(matchedGuides);
      
      // Store this information
      updateCase({
        caseType: "Custom question",
        analysisResult: resultText,
      });
      
      await saveCaseToDatabase();
      
      toast({
        title: "Analysis complete",
        description: "We've analyzed your case using our backup system.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGuideSelect = (guideId: string) => {
    // If the ID matches a category, navigate to category page instead
    if (["family", "housing", "employment", "contracts", "other"].includes(guideId)) {
      navigate(`/categories`);
      return;
    }
    
    // Otherwise navigate to the specific guide
    navigate(`/guide/${guideId}`);
  };

  const handleResetQuestionnaire = () => {
    resetCase();
    setCustomQuestion("");
    setAnalysisResult(null);
    setRelatedGuides([]);
    toast({
      title: "Questionnaire reset",
      description: "You can start a new case evaluation.",
    });
  };

  const handleSaveProgress = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your progress.",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }
    saveCaseToDatabase();
  };

  useEffect(() => {
    if (analysisResult && !user) {
      toast({
        title: "Sign in to save your analysis",
        description: "Create an account to save this legal analysis for future reference.",
      });
    }
  }, [analysisResult, user, toast]);

  return (
    <Layout>
      <div className="container py-12 max-w-4xl">
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
        </div>

        {/* Progress tracker */}
        {activeTab === "guided" && (
          <CaseProgress 
            currentStep={currentStep} 
            totalSteps={5} 
            completedQuestions={completedQuestions} 
            totalQuestions={totalQuestions}
          />
        )}

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
          
          {/* Guided Questionnaire Tab */}
          <TabsContent value="guided">
            <GuidedQuestionnaire
              caseData={caseData}
              handleOptionSelect={handleOptionSelect}
              handleBack={handleBack}
              handleResetQuestionnaire={handleResetQuestionnaire}
            />
          </TabsContent>
          
          {/* Custom Question Tab */}
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
          
          {/* AI Assistant Tab */}
          <TabsContent value="assistant">
            <div className="bg-white shadow rounded-lg">
              <AIChatAssistant caseData={caseData.answers} />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Note: This questionnaire is designed to provide general guidance only and does not
            constitute legal advice. For complex legal matters, consulting with an attorney is
            recommended.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Questionnaire;
