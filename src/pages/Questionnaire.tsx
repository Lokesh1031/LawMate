import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getQuestionById } from "@/lib/data";
import { HelpCircle, ArrowRight, ChevronRight } from "lucide-react";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentQuestionId, setCurrentQuestionId] = useState("q1");
  const [previousQuestions, setPreviousQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = getQuestionById(currentQuestionId);

  const handleOptionSelect = (optionId: string) => {
    if (!currentQuestion) return;
    
    // Record the answer
    setAnswers({
      ...answers,
      [currentQuestionId]: optionId,
    });

    // Find the selected option
    const selectedOption = currentQuestion.options.find((opt) => opt.id === optionId);
    if (!selectedOption) return;

    // If there's a guide associated with this answer, navigate to it
    if (selectedOption.guideId) {
      navigate(`/guide/${selectedOption.guideId}`);
      return;
    }

    // Otherwise, move to the next question
    if (selectedOption.nextQuestionId) {
      setPreviousQuestions([...previousQuestions, currentQuestionId]);
      setCurrentQuestionId(selectedOption.nextQuestionId);
    }
  };

  const handleBack = () => {
    if (previousQuestions.length === 0) {
      navigate("/");
      return;
    }

    const prevQuestionId = previousQuestions[previousQuestions.length - 1];
    setCurrentQuestionId(prevQuestionId);
    setPreviousQuestions(previousQuestions.slice(0, -1));
  };

  if (!currentQuestion) {
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
              <Button onClick={() => navigate("/")}>Return Home</Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12 max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-lawmate mb-4">Legal Issue Assessment</h1>
          <p className="text-gray-600">
            Answer the questions below to help us identify the right guidance for your legal situation.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center mb-2">
              <HelpCircle className="text-lawmate mr-2 h-5 w-5" />
              <CardTitle>Question {currentQuestionId.replace('q', '')}</CardTitle>
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
            <Button variant="ghost" onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="link"
              className="text-lawmate"
              onClick={() => navigate("/categories")}
            >
              Browse All Categories <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

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
