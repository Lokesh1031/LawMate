
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, ArrowRight, Users, Home, Briefcase, FileText, Gavel, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Assessments = () => {
  const assessmentCategories = [
    {
      id: "family",
      title: "Family Law Assessment",
      description: "Comprehensive analysis for divorce, custody, support, and domestic relations cases",
      icon: Users,
      features: ["Custody evaluation", "Asset division", "Support calculations", "Domestic relations"]
    },
    {
      id: "property",
      title: "Property & Real Estate Assessment",
      description: "Legal analysis for property disputes, landlord-tenant issues, and real estate transactions",
      icon: Home,
      features: ["Property rights", "Lease agreements", "Eviction procedures", "Real estate contracts"]
    },
    {
      id: "employment",
      title: "Employment Law Assessment",
      description: "Workplace rights analysis, wrongful termination, and labor dispute evaluation",
      icon: Briefcase,
      features: ["Wrongful termination", "Workplace discrimination", "Wage disputes", "Employment contracts"]
    },
    {
      id: "contract",
      title: "Contract Law Assessment",
      description: "Contract analysis, breach evaluation, and business agreement review",
      icon: FileText,
      features: ["Contract breaches", "Business agreements", "Service contracts", "Legal obligations"]
    },
    {
      id: "criminal",
      title: "Criminal Law Assessment",
      description: "Criminal case evaluation and defense strategy analysis",
      icon: Shield,
      features: ["Criminal charges", "Defense strategies", "Plea negotiations", "Rights protection"]
    },
    {
      id: "civil",
      title: "Civil Rights Assessment",
      description: "Civil rights violations and constitutional protections analysis",
      icon: Gavel,
      features: ["Civil rights violations", "Constitutional protections", "Discrimination cases", "Legal remedies"]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Scale className="h-16 w-16 mx-auto mb-6 text-lawmate" />
          <h1 className="text-3xl font-bold mb-4">Personal Legal Assessments</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Get comprehensive AI-powered legal analysis tailored to your specific situation. 
            Our assessments provide detailed guidance with relevant article and section references.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessmentCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="hover:shadow-lg transition-all duration-300 assessment-theme border-2">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <IconComponent className="h-8 w-8 text-lawmate mr-3" />
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {category.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-lawmate rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/questionnaire">
                    <Button className="w-full bg-lawmate text-white hover:bg-lawmate-dark">
                      Start Assessment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">How Our Assessments Work</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-lawmate rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2">Answer Questions</h3>
                <p className="text-sm text-gray-600">Provide details about your legal situation through our guided questionnaire</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-lawmate rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">Our AI analyzes your case against our comprehensive legal database</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-lawmate rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2">Get Solutions</h3>
                <p className="text-sm text-gray-600">Receive detailed guidance with specific legal references and next steps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Assessments;
