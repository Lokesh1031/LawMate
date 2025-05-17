
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryById, getGuideById, getFaqsByCategory, getDocumentsByCategory } from "@/lib/data";
import { ArrowRight, FileText, HelpCircle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  if (!categoryId) {
    navigate("/categories");
    return null;
  }

  const category = getCategoryById(categoryId);
  
  if (!category) {
    navigate("/categories");
    return null;
  }

  const guides = category.guideIds.map((guideId) => getGuideById(guideId)).filter(Boolean);
  const documents = getDocumentsByCategory(categoryId);
  const faqs = getFaqsByCategory(categoryId);

  return (
    <Layout>
      <div className="container py-12">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center"
          onClick={() => navigate("/categories")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Categories
        </Button>
        
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-lawmate mb-4">{category.name}</h1>
          <p className="text-xl text-gray-600">{category.description}</p>
        </div>

        {/* Guides Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-lawmate mb-6">Step-by-Step Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              guide && (
                <Link key={guide.id} to={`/guide/${guide.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-lawmate">
                    <CardHeader>
                      <CardTitle className="text-lawmate">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{guide.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <div className="text-lawmate flex items-center text-sm font-medium">
                        View Guide <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Documents Section */}
        {documents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-lawmate mb-6">Legal Document Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((document) => (
                <Card key={document.id} className="h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-lawmate mr-2" />
                      <CardTitle className="text-lg">{document.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{document.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Link to={`/documents?id=${document.id}`}>
                      <div className="text-lawmate flex items-center text-sm font-medium">
                        View Template <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FAQs Section */}
        {faqs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-lawmate mb-6">Frequently Asked Questions</h2>
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={faq.id} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="h-5 w-5 text-lawmate mr-2 flex-shrink-0" />
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Link to="/faq">
                  <div className="text-lawmate flex items-center text-sm font-medium">
                    View All FAQs <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Link>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryDetail;
