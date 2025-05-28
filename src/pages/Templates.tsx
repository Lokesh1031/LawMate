
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Star } from "lucide-react";
import TemplatePreview from "@/components/TemplatePreview";

const Templates = () => {
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const templateCategories = [
    {
      category: "Family Law",
      templates: [
        {
          title: "Divorce Petition Template",
          description: "Complete divorce petition with all required sections and legal language",
          complexity: "Advanced",
          downloadCount: "2.1k"
        },
        {
          title: "Child Custody Agreement",
          description: "Comprehensive custody arrangement template with visitation schedules",
          complexity: "Intermediate",
          downloadCount: "1.8k"
        },
        {
          title: "Prenuptial Agreement",
          description: "Pre-marriage agreement template covering assets and responsibilities",
          complexity: "Advanced",
          downloadCount: "950"
        }
      ]
    },
    {
      category: "Property & Real Estate",
      templates: [
        {
          title: "Rental Lease Agreement",
          description: "Standard residential lease agreement with tenant and landlord protections",
          complexity: "Basic",
          downloadCount: "3.2k"
        },
        {
          title: "Property Purchase Agreement",
          description: "Real estate purchase contract with contingencies and terms",
          complexity: "Advanced",
          downloadCount: "1.5k"
        },
        {
          title: "Eviction Notice Template",
          description: "Legal eviction notice forms for various violation types",
          complexity: "Intermediate",
          downloadCount: "890"
        }
      ]
    },
    {
      category: "Employment",
      templates: [
        {
          title: "Employment Contract",
          description: "Comprehensive employment agreement with terms and conditions",
          complexity: "Intermediate",
          downloadCount: "2.7k"
        },
        {
          title: "Non-Disclosure Agreement",
          description: "Confidentiality agreement for employees and contractors",
          complexity: "Basic",
          downloadCount: "1.9k"
        },
        {
          title: "Termination Letter Template",
          description: "Professional employment termination documentation",
          complexity: "Basic",
          downloadCount: "1.2k"
        }
      ]
    },
    {
      category: "Business & Contracts",
      templates: [
        {
          title: "Service Agreement Contract",
          description: "Professional services contract with payment and delivery terms",
          complexity: "Intermediate",
          downloadCount: "2.4k"
        },
        {
          title: "Partnership Agreement",
          description: "Business partnership agreement with profit sharing and responsibilities",
          complexity: "Advanced",
          downloadCount: "1.1k"
        },
        {
          title: "Independent Contractor Agreement",
          description: "Contractor agreement with scope of work and payment terms",
          complexity: "Intermediate",
          downloadCount: "1.6k"
        }
      ]
    }
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Basic": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handlePreview = (template: any) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleDownload = (template: any) => {
    // Simulate download functionality
    const blob = new Blob([`Template: ${template.title}\n\nThis would be the actual template content...`], 
      { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 mx-auto mb-6 text-lawmate" />
          <h1 className="text-3xl font-bold mb-4">Legal Document Templates</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Access professionally crafted legal document templates that are automatically 
            customized based on your specific case requirements. All templates are legally reviewed and updated regularly.
          </p>
        </div>

        <div className="space-y-8">
          {templateCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold mb-6 text-lawmate">{category.category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.templates.map((template, templateIndex) => (
                  <Card key={templateIndex} className="hover:shadow-lg transition-all duration-300 templates-theme border-2">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={getComplexityColor(template.complexity)}>
                          {template.complexity}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Download className="h-4 w-4 mr-1" />
                          {template.downloadCount}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{template.title}</CardTitle>
                      <CardDescription>
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handlePreview(template)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-lawmate text-white hover:bg-lawmate-dark"
                          onClick={() => handleDownload(template)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Template Features Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Template Features</h2>
            <p className="text-gray-600">Our templates come with powerful features to ensure legal compliance</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <Star className="h-8 w-8 mx-auto mb-3 text-lawmate" />
              <h3 className="font-semibold mb-2">Legally Reviewed</h3>
              <p className="text-sm text-gray-600">All templates reviewed by legal professionals</p>
            </div>
            <div className="text-center">
              <FileText className="h-8 w-8 mx-auto mb-3 text-lawmate" />
              <h3 className="font-semibold mb-2">Customizable</h3>
              <p className="text-sm text-gray-600">Easily adapt templates to your specific needs</p>
            </div>
            <div className="text-center">
              <Download className="h-8 w-8 mx-auto mb-3 text-lawmate" />
              <h3 className="font-semibold mb-2">Multiple Formats</h3>
              <p className="text-sm text-gray-600">Available in Word, PDF, and other formats</p>
            </div>
            <div className="text-center">
              <Badge className="h-8 w-8 mx-auto mb-3 text-lawmate" />
              <h3 className="font-semibold mb-2">Regular Updates</h3>
              <p className="text-sm text-gray-600">Templates updated with latest legal changes</p>
            </div>
          </div>
        </div>

        <TemplatePreview
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          template={previewTemplate}
        />
      </div>
    </Layout>
  );
};

export default Templates;
