
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Scale } from "lucide-react";
import Layout from "@/components/Layout";
import FeaturesSection from "@/components/FeaturesSection";
import LegalCategoriesSection from "@/components/LegalCategoriesSection";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lawmate to-lawmate-dark text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Castellar, serif' }}>
            Complete Legal Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Get comprehensive legal guidance with AI-powered analysis, specific article references, 
            and step-by-step solutions - no attorney required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/questionnaire">
              <Button size="lg" className="bg-white text-lawmate hover:bg-gray-100 px-8 py-3 text-lg">
                Start Legal Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/categories">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-lawmate px-8 py-3 text-lg">
                Browse Legal Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Legal Categories Section */}
      <LegalCategoriesSection />

      {/* Why Choose LawMate Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose LawMate?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered legal platform provides everything you need to handle your legal matters independently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Complete Case Resolution",
                description: "Get comprehensive solutions that guide you through your entire legal case from start to finish."
              },
              {
                title: "Specific Legal References",
                description: "Access exact article numbers and section details relevant to your specific legal situation."
              },
              {
                title: "AI-Powered Analysis",
                description: "Advanced AI provides personalized legal guidance based on your unique circumstances."
              },
              {
                title: "No Attorney Required",
                description: "Handle most legal matters independently with our comprehensive guidance system."
              },
              {
                title: "Step-by-Step Process",
                description: "Follow clear, sequential instructions that simplify complex legal procedures."
              },
              {
                title: "Instant Access",
                description: "Get immediate legal guidance 24/7 without waiting for appointments or consultations."
              }
            ].map((benefit, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                  <CardDescription>
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-lawmate text-white">
        <div className="container mx-auto px-6 text-center">
          <Scale className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Resolve Your Legal Matter?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your comprehensive legal assessment now and get the complete guidance you need.
          </p>
          <Link to="/questionnaire">
            <Button size="lg" className="bg-white text-lawmate hover:bg-gray-100 px-8 py-3 text-lg">
              Begin Your Legal Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
