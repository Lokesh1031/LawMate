
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, Navigation } from "lucide-react";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Scale,
      title: "Personal Legal Assessment",
      description: "Get AI-powered analysis of your legal situation with specific article and section references from our comprehensive legal database.",
      color: "assessment-theme"
    },
    {
      icon: FileText,
      title: "Document Templates",
      description: "Access professionally crafted legal document templates that are automatically customized based on your specific case requirements.",
      color: "templates-theme"
    },
    {
      icon: Navigation,
      title: "Step-by-Step Guidance",
      description: "Follow detailed, sequential instructions that guide you through complex legal processes from start to finish.",
      color: "guidance-theme"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Complete Legal Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform provides comprehensive legal assistance without the need for attorney consultation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className={`border-2 ${feature.color} hover:shadow-lg transition-all duration-300`}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-white shadow-md w-fit">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white shadow-sm text-sm font-medium">
                      Complete Solution
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
