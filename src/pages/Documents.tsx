
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { getDocumentById, documents } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Copy, Search, ChevronLeft, Printer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Documents = () => {
  const [searchParams] = useSearchParams();
  const docId = searchParams.get("id");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(docId ? getDocumentById(docId) : null);
  const [filteredDocuments, setFilteredDocuments] = useState(documents);

  useEffect(() => {
    if (docId) {
      const doc = getDocumentById(docId);
      setSelectedDocument(doc || null);
    }
  }, [docId]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDocuments(documents);
    } else {
      const filtered = documents.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDocuments(filtered);
    }
  }, [searchTerm]);

  const handleCopyToClipboard = () => {
    if (selectedDocument) {
      navigator.clipboard.writeText(selectedDocument.templateText);
      toast({
        title: "Copied to clipboard",
        description: "Document template has been copied to your clipboard.",
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!selectedDocument) return;
    
    const blob = new Blob([selectedDocument.templateText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    
    a.href = url;
    a.download = `${selectedDocument.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    
    URL.revokeObjectURL(url);
    
    toast({
      title: "Document downloaded",
      description: `${selectedDocument.title} has been downloaded.`,
    });
  };

  return (
    <Layout>
      <div className="container py-12">
        {selectedDocument ? (
          <div>
            <Button 
              variant="ghost" 
              className="mb-6 flex items-center print:hidden"
              onClick={() => {
                setSelectedDocument(null);
                navigate("/documents");
              }}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Documents
            </Button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl text-lawmate">{selectedDocument.title}</CardTitle>
                        <CardDescription>
                          Category: {selectedDocument.category.charAt(0).toUpperCase() + selectedDocument.category.slice(1)}
                        </CardDescription>
                      </div>
                      <div className="space-x-2 print:hidden">
                        <Button variant="outline" onClick={handlePrint}>
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6 text-gray-700">{selectedDocument.description}</p>
                    <div className="bg-gray-50 p-6 rounded-md border whitespace-pre-wrap font-mono text-sm">
                      {selectedDocument.templateText}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2 print:hidden">
                    <Button variant="outline" onClick={handleCopyToClipboard}>
                      <Copy className="mr-2 h-4 w-4" /> Copy
                    </Button>
                    <Button onClick={handleDownload}>
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="print:hidden">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>
                        This is a template document. To use it:
                      </p>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Review the entire document carefully</li>
                        <li>Replace all placeholders in [BRACKETS] with your specific information</li>
                        <li>Delete any sections that don't apply to your situation</li>
                        <li>Ensure all information is accurate and complete</li>
                        <li>Format the document professionally</li>
                      </ol>
                      <div className="bg-blue-50 text-blue-800 p-4 rounded-md mt-4">
                        <p className="text-sm">
                          <strong>Note:</strong> This template is provided for informational purposes only and is not a substitute for legal advice. Consider having a legal professional review your completed document.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-lawmate mb-4">Legal Document Templates</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Access professionally drafted legal templates to help with your situation.
              </p>
            </div>
            
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  className="pl-10"
                  placeholder="Search documents by title, description or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Documents</TabsTrigger>
                <TabsTrigger value="family">Family Law</TabsTrigger>
                <TabsTrigger value="housing">Housing</TabsTrigger>
                <TabsTrigger value="employment">Employment</TabsTrigger>
                <TabsTrigger value="contracts">Contracts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDocuments.map((doc) => (
                    <DocumentCard key={doc.id} document={doc} onClick={() => {
                      setSelectedDocument(doc);
                      navigate(`/documents?id=${doc.id}`);
                    }} />
                  ))}
                </div>
              </TabsContent>
              
              {["family", "housing", "employment", "contracts"].map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredDocuments
                      .filter((doc) => doc.category === category)
                      .map((doc) => (
                        <DocumentCard key={doc.id} document={doc} onClick={() => {
                          setSelectedDocument(doc);
                          navigate(`/documents?id=${doc.id}`);
                        }} />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}
      </div>
    </Layout>
  );
};

interface DocumentCardProps {
  document: {
    id: string;
    title: string;
    description: string;
    category: string;
  };
  onClick: () => void;
}

const DocumentCard = ({ document, onClick }: DocumentCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader>
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-lawmate mr-2" />
          <CardTitle className="text-lg">{document.title}</CardTitle>
        </div>
        <CardDescription>
          Category: {document.category.charAt(0).toUpperCase() + document.category.slice(1)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{document.description}</p>
      </CardContent>
    </Card>
  );
};

export default Documents;
