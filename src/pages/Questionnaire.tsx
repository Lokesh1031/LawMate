import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getQuestionById, getGuideById } from "@/lib/data";
import { HelpCircle, ArrowRight, ChevronRight, PenBox, Lightbulb, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import CaseProgress from "@/components/CaseProgress";
import QuestionAnalysis from "@/components/QuestionAnalysis";
import { useUserCase } from "@/hooks/useUserCase";

const Questionnaire = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { caseData, updateCase, resetCase, saveCaseToDatabase, loading } = useUserCase();
  
  const [activeTab, setActiveTab] = useState<"guided" | "custom">("guided");
  const [customQuestion, setCustomQuestion] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [relatedGuides, setRelatedGuides] = useState<Array<{id: string; title: string;}>>([]);

  const currentQuestion = getQuestionById(caseData.currentQuestionId);
  const totalQuestions = 6; // Total questions in the questionnaire
  const completedQuestions = Object.keys(caseData.answers).length;
  const currentStep = Math.min(completedQuestions + 1, 5); // Cap at 5 steps

  const handleOptionSelect = (optionId: string) => {
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

  const handleSubmitCustomQuestion = () => {
    if (!customQuestion.trim()) {
      toast({
        title: "Please enter your question",
        description: "Describe your legal issue in detail for better guidance.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // This simulates an AI-powered analysis of the user's question
    // In a production app, this would call an API or use a more sophisticated matching algorithm
    setTimeout(() => {
      // Simple keyword matching for the demo
      const question = customQuestion.toLowerCase();
      let resultText = "Based on your question, we've identified some potential legal issues. Please review the recommended guides below.";
      let matchedGuides = [];
      
      if (question.includes("divorce") || question.includes("custody") || question.includes("marriage")) {
        matchedGuides.push({ id: "g1", title: "How to File for Divorce" });
        matchedGuides.push({ id: "g2", title: "Child Custody and Support" });
      } 
      
      if (question.includes("landlord") || question.includes("tenant") || question.includes("rent") || question.includes("lease") || question.includes("apartment")) {
        matchedGuides.push({ id: "g5", title: "Dealing with Landlord-Tenant Disputes" });
      }
      
      if (question.includes("fired") || question.includes("termination") || question.includes("workplace") || question.includes("job") || question.includes("employment")) {
        matchedGuides.push({ id: "g9", title: "Understanding Wrongful Termination" });
      }
      
      if (question.includes("contract") || question.includes("agreement") || question.includes("breach")) {
        matchedGuides.push({ id: "g13", title: "Handling Breach of Contract Issues" });
      }
      
      // If no matches, provide general guidance
      if (matchedGuides.length === 0) {
        resultText = "We couldn't find specific guides matching your question. Please browse our categories or try asking a more specific question about your legal issue.";
        matchedGuides = [
          { id: "family", title: "Browse Family Law Guides" },
          { id: "housing", title: "Browse Housing & Property Guides" },
          { id: "employment", title: "Browse Employment Law Guides" },
          { id: "contracts", title: "Browse Contract Law Guides" },
        ];
      }
      
      setAnalysisResult(resultText);
      setRelatedGuides(matchedGuides);
      setIsAnalyzing(false);
      
      // Store this information
      updateCase({
        caseType: "Custom question",
        analysisResult: resultText,
      });
      
      saveCaseToDatabase();
    }, 2000);
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
    saveCaseToDatabase();
  };

  if (!currentQuestion && activeTab === "guided") {
    return (
      <Layout>
        <div className="container py-8">
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
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-lawmate mb-4">Legal Issue Assessment</h1>
          <p className="text-gray-600">
            Get step-by-step guidance tailored to your legal situation. Choose our guided questionnaire or describe your case in your own words.
          </p>
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

        <Tabs defaultValue="guided" value={activeTab} onValueChange={(value) => setActiveTab(value as "guided" | "custom")}>
          <TabsList className="w-full mb-6">
            <TabsTrigger value="guided" className="flex-1">
              <PenBox className="mr-2 h-4 w-4" /> Guided Questionnaire
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex-1">
              <Lightbulb className="mr-2 h-4 w-4" /> Describe Your Case
            </TabsTrigger>
          </TabsList>
          
          {/* Guided Questionnaire Tab */}
          <TabsContent value="guided">
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
                <h3 className="text-xl font-semibold mb-6">{currentQuestion?.text}</h3>
                <div className="space-y-3">
                  {currentQuestion?.options.map((option) => (
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
          </TabsContent>
          
          {/* Custom Question Tab */}
          <TabsContent value="custom">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Describe Your Legal Issue</CardTitle>
                <CardDescription>
                  Provide details about your case and we'll analyze it to give you the best guidance.
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
                  {isAnalyzing ? "Analyzing..." : "Get Guidance"}
                </Button>
              </CardFooter>
            </Card>
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
