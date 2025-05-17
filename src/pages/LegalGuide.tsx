
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { getGuideById, getDocumentById } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronLeft, ChevronRight, AlertCircle, FileText, HelpCircle, Printer } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const LegalGuide = () => {
  const { guideId } = useParams<{ guideId: string }>();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  if (!guideId) {
    navigate("/categories");
    return null;
  }

  const guide = getGuideById(guideId);
  
  if (!guide) {
    navigate("/categories");
    return null;
  }

  const relatedDocuments = guide.relatedDocumentIds
    .map((docId) => getDocumentById(docId))
    .filter(Boolean);

  const totalSteps = guide.steps.length;
  const currentStep = guide.steps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Layout>
      <div className="container py-12">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-lawmate mb-4">{guide.title}</h1>
              <p className="text-xl text-gray-600">{guide.description}</p>
            </div>

            <Tabs defaultValue="steps">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="steps" className="flex-1">Step-by-Step Guide</TabsTrigger>
                <TabsTrigger value="complete" className="flex-1">Complete Guide</TabsTrigger>
              </TabsList>
              
              <TabsContent value="steps" className="space-y-8">
                <Card className="border-t-4 border-t-lawmate">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardDescription>Step {currentStepIndex + 1} of {totalSteps}</CardDescription>
                        <CardTitle className="text-2xl text-lawmate">{currentStep.title}</CardTitle>
                      </div>
                      <Button variant="outline" className="print:hidden" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-line">{currentStep.content}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-6 print:hidden">
                    <Button 
                      variant="outline" 
                      onClick={handlePrevious}
                      disabled={currentStepIndex === 0}
                    >
                      <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                    </Button>
                    <Button 
                      onClick={handleNext} 
                      disabled={currentStepIndex === totalSteps - 1}
                      className="bg-lawmate hover:bg-lawmate-light"
                    >
                      Next <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    This guide provides general information and is not legal advice. Laws vary by location and situation.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              
              <TabsContent value="complete">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Complete Guide</CardTitle>
                      <Button variant="outline" className="print:hidden" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {guide.steps.map((step, index) => (
                        <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                          <h3 className="text-xl font-semibold text-lawmate mb-3">Step {index + 1}: {step.title}</h3>
                          <p className="text-gray-700 whitespace-pre-line">{step.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Alert className="mt-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    This guide provides general information and is not legal advice. Laws vary by location and situation.
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6 print:hidden">
            {/* Progress Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {guide.steps.map((step, index) => (
                    <Button
                      key={index}
                      variant={index === currentStepIndex ? "default" : "outline"}
                      className={`w-full justify-start ${
                        index === currentStepIndex
                          ? "bg-lawmate hover:bg-lawmate-light"
                          : ""
                      }`}
                      onClick={() => setCurrentStepIndex(index)}
                    >
                      {index + 1}. {step.title}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Documents */}
            {relatedDocuments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Documents</CardTitle>
                  <CardDescription>
                    Templates you may need for this process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {relatedDocuments.map((doc) => (
                      doc && (
                        <Button
                          key={doc.id}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => navigate(`/documents?id=${doc.id}`)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          {doc.title}
                        </Button>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* FAQs */}
            {guide.faqs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {guide.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center">
                            <HelpCircle className="h-4 w-4 text-lawmate mr-2 flex-shrink-0" />
                            <span className="text-sm">{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-700">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LegalGuide;
