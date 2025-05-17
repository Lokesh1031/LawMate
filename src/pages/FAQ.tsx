
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { faqs, categories } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search } from "lucide-react";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFaqs(faqs);
    } else {
      const filtered = faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFaqs(filtered);
    }
  }, [searchTerm]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-lawmate mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common legal questions and concerns.
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              className="pl-10"
              placeholder="Search questions or answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Questions</TabsTrigger>
            <TabsTrigger value="family">Family Law</TabsTrigger>
            <TabsTrigger value="housing">Housing</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Legal Questions</CardTitle>
                <CardDescription>
                  {filteredFaqs.length} questions available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-center">
                          <HelpCircle className="h-5 w-5 text-lawmate mr-3 flex-shrink-0" />
                          <div>
                            <div className="font-medium">{faq.question}</div>
                            <div className="text-sm text-gray-500">
                              Category: {getCategoryName(faq.category)}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 pl-11">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {["family", "housing", "employment", "contracts"].map((category) => (
            <TabsContent key={category} value={category}>
              <Card>
                <CardHeader>
                  <CardTitle>{getCategoryName(category)} Questions</CardTitle>
                  <CardDescription>
                    {filteredFaqs.filter((faq) => faq.category === category).length} questions available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs
                      .filter((faq) => faq.category === category)
                      .map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id}>
                          <AccordionTrigger className="text-left hover:no-underline">
                            <div className="flex items-center">
                              <HelpCircle className="h-5 w-5 text-lawmate mr-3 flex-shrink-0" />
                              <div className="font-medium">{faq.question}</div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-700 pl-11">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 bg-lawmate-light text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="mb-6">
            If you couldn't find an answer to your question, try our step-by-step legal questionnaire to get tailored guidance for your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/questionnaire" className="bg-white text-lawmate py-2 px-6 rounded font-medium hover:bg-lawmate-accent hover:text-white transition">
              Start Legal Assessment
            </a>
            <a href="/categories" className="bg-transparent text-white py-2 px-6 rounded font-medium border border-white hover:bg-white hover:text-lawmate-light transition">
              Browse Legal Categories
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
