
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation, Clock, CheckCircle, ArrowRight, Users, Home, Briefcase, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Guidance = () => {
  const guidanceCategories = [
    {
      title: "Family Law Procedures",
      icon: Users,
      guides: [
        {
          title: "Filing for Divorce: Complete Step-by-Step Guide",
          description: "Comprehensive walkthrough from initial filing to final decree",
          steps: 12,
          duration: "2-6 months",
          difficulty: "Intermediate"
        },
        {
          title: "Child Custody Modification Process",
          description: "How to request changes to existing custody arrangements",
          steps: 8,
          duration: "1-3 months",
          difficulty: "Advanced"
        },
        {
          title: "Establishing Paternity Legal Process",
          description: "Legal steps to establish paternity for child support and custody",
          steps: 6,
          duration: "2-8 weeks",
          difficulty: "Basic"
        }
      ]
    },
    {
      title: "Property & Real Estate",
      icon: Home,
      guides: [
        {
          title: "Landlord-Tenant Dispute Resolution",
          description: "Step-by-step process for resolving rental disputes",
          steps: 7,
          duration: "2-6 weeks",
          difficulty: "Basic"
        },
        {
          title: "Property Purchase Legal Process",
          description: "Complete guide to buying property with legal protections",
          steps: 15,
          duration: "1-3 months",
          difficulty: "Intermediate"
        },
        {
          title: "Eviction Process for Landlords",
          description: "Legal procedure for evicting tenants while following the law",
          steps: 10,
          duration: "1-4 months",
          difficulty: "Advanced"
        }
      ]
    },
    {
      title: "Employment Law",
      icon: Briefcase,
      guides: [
        {
          title: "Filing Workplace Discrimination Complaint",
          description: "How to properly document and file discrimination claims",
          steps: 9,
          duration: "2-12 weeks",
          difficulty: "Intermediate"
        },
        {
          title: "Wrongful Termination Case Process",
          description: "Steps to evaluate and pursue wrongful termination claims",
          steps: 11,
          duration: "3-18 months",
          difficulty: "Advanced"
        },
        {
          title: "Wage and Hour Dispute Resolution",
          description: "Process for claiming unpaid wages and overtime",
          steps: 6,
          duration: "1-6 weeks",
          difficulty: "Basic"
        }
      ]
    },
    {
      title: "Contract & Business Law",
      icon: FileText,
      guides: [
        {
          title: "Contract Breach Legal Response",
          description: "How to respond to and pursue contract breach claims",
          steps: 8,
          duration: "1-6 months",
          difficulty: "Intermediate"
        },
        {
          title: "Small Business Formation Process",
          description: "Complete guide to legally establishing your business",
          steps: 12,
          duration: "2-8 weeks",
          difficulty: "Basic"
        },
        {
          title: "Debt Collection Legal Process",
          description: "Legal steps for collecting owed money through the courts",
          steps: 10,
          duration: "2-12 months",
          difficulty: "Advanced"
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Basic": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Navigation className="h-16 w-16 mx-auto mb-6 text-lawmate" />
          <h1 className="text-3xl font-bold mb-4">Step-by-Step Legal Guidance</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Follow detailed, sequential instructions that guide you through complex legal processes 
            from start to finish. Each guide provides clear actions, required documents, and timeline expectations.
          </p>
        </div>

        <div className="space-y-12">
          {guidanceCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryIndex}>
                <div className="flex items-center mb-6">
                  <IconComponent className="h-8 w-8 text-lawmate mr-3" />
                  <h2 className="text-2xl font-bold text-lawmate">{category.title}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.guides.map((guide, guideIndex) => (
                    <Card key={guideIndex} className="hover:shadow-lg transition-all duration-300 guidance-theme border-2">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge className={getDifficultyColor(guide.difficulty)}>
                            {guide.difficulty}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {guide.duration}
                          </div>
                        </div>
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <CardDescription>
                          {guide.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {guide.steps} Steps
                          </div>
                        </div>
                        <Link to="/questionnaire">
                          <Button className="w-full bg-lawmate text-white hover:bg-lawmate-dark">
                            Start Guidance
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">How Our Guidance Works</h2>
            <p className="text-gray-600">Each guide is designed to walk you through the entire legal process</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-lawmate rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
              <h3 className="font-semibold mb-2">Choose Your Process</h3>
              <p className="text-sm text-gray-600">Select the legal process that matches your situation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-lawmate rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">2</div>
              <h3 className="font-semibold mb-2">Follow Step-by-Step</h3>
              <p className="text-sm text-gray-600">Complete each step with detailed instructions and document templates</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-lawmate rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">Monitor your progress and get timeline updates throughout the process</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Guidance;
