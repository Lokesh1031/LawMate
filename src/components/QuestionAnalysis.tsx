
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BadgeInfo, ArrowRight, BookOpen, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

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

interface QuestionAnalysisProps {
  question: string;
  answer: string;
  relatedGuides: Array<{
    id: string;
    title: string;
  }>;
  onGuideSelect: (guideId: string) => void;
  legalReferences?: LegalReference;
}

const QuestionAnalysis: React.FC<QuestionAnalysisProps> = ({
  question,
  answer,
  relatedGuides,
  onGuideSelect,
  legalReferences,
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
          
          {/* Legal References Section */}
          {legalReferences && (legalReferences.articles?.length > 0 || legalReferences.sections?.length > 0) && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-medium mb-3 text-amber-800 flex items-center">
                <Scale className="h-4 w-4 mr-2" />
                Legal References
              </h4>
              
              {legalReferences.articles?.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-medium text-amber-700 mb-2">Applicable Articles:</h5>
                  <div className="space-y-2">
                    {legalReferences.articles.map((article) => (
                      <div key={article.id} className="p-2 bg-white rounded border border-amber-100">
                        <div className="font-medium text-amber-900">{article.article_number}: {article.title}</div>
                        <div className="text-sm text-amber-700">{article.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {legalReferences.sections?.length > 0 && (
                <div>
                  <h5 className="font-medium text-amber-700 mb-2">Specific Sections:</h5>
                  <div className="space-y-2">
                    {legalReferences.sections.map((section) => (
                      <div key={section.id} className="p-2 bg-white rounded border border-amber-100">
                        <div className="font-medium text-amber-900">
                          {section.legal_articles.article_number} - {section.section_number}: {section.title}
                        </div>
                        <div className="text-sm text-amber-700 mt-1">{section.content}</div>
                        {section.applicable_scenarios?.length > 0 && (
                          <div className="text-xs text-amber-600 mt-1">
                            Applicable to: {section.applicable_scenarios.join(', ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {relatedGuides.length > 0 && (
            <>
              <h4 className="font-medium mb-3 text-lawmate flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Recommended Legal Guides
              </h4>
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
