
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Scale,
  FileText,
  HelpCircle,
  ArrowRight,
  Shield,
  Briefcase,
  Home,
  Gavel,
  Users
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-lawmate py-4 px-6 shadow-md">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scale className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">LawMate</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-white hover:text-lawmate-accent transition">Home</Link>
            <Link to="/categories" className="text-white hover:text-lawmate-accent transition">Legal Categories</Link>
            <Link to="/documents" className="text-white hover:text-lawmate-accent transition">Documents</Link>
            <Link to="/faq" className="text-white hover:text-lawmate-accent transition">FAQ</Link>
          </nav>
          <Button variant="outline" className="bg-white text-lawmate hover:bg-lawmate-accent hover:text-white">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-lawmate to-lawmate-light py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Personal Legal Guide</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Navigate legal matters with confidence, without expensive lawyer fees.
            Step-by-step guidance for your legal needs.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/questionnaire">
              <Button size="lg" className="bg-white text-lawmate hover:bg-lawmate-accent hover:text-white">
                Start Legal Questionnaire
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/categories">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-lawmate">
                Browse Legal Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-lawmate">How LawMate Helps You</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-lawmate-light h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gavel className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-lawmate">Personal Legal Assessment</h3>
              <p className="text-gray-600">
                Answer a few questions about your situation, and we'll identify your legal needs and options.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-lawmate-light h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-lawmate">Document Templates</h3>
              <p className="text-gray-600">
                Access professionally drafted legal document templates tailored to your specific situation.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-lawmate-light h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-lawmate">Step-by-Step Guidance</h3>
              <p className="text-gray-600">
                Clear, actionable steps to navigate your legal matter with confidence and understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-lawmate">Common Legal Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link to="/category/family">
              <div className="group p-6 bg-gray-50 rounded-lg hover:bg-lawmate hover:text-white transition text-center">
                <Users className="h-10 w-10 mx-auto mb-4 text-lawmate group-hover:text-white transition" />
                <h3 className="font-semibold">Family Law</h3>
              </div>
            </Link>
            
            <Link to="/category/housing">
              <div className="group p-6 bg-gray-50 rounded-lg hover:bg-lawmate hover:text-white transition text-center">
                <Home className="h-10 w-10 mx-auto mb-4 text-lawmate group-hover:text-white transition" />
                <h3 className="font-semibold">Housing & Property</h3>
              </div>
            </Link>
            
            <Link to="/category/employment">
              <div className="group p-6 bg-gray-50 rounded-lg hover:bg-lawmate hover:text-white transition text-center">
                <Briefcase className="h-10 w-10 mx-auto mb-4 text-lawmate group-hover:text-white transition" />
                <h3 className="font-semibold">Employment</h3>
              </div>
            </Link>
            
            <Link to="/category/contracts">
              <div className="group p-6 bg-gray-50 rounded-lg hover:bg-lawmate hover:text-white transition text-center">
                <FileText className="h-10 w-10 mx-auto mb-4 text-lawmate group-hover:text-white transition" />
                <h3 className="font-semibold">Contracts</h3>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/categories">
              <Button variant="outline" className="border-lawmate text-lawmate hover:bg-lawmate hover:text-white">
                View All Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-lawmate text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Solve Your Legal Issues?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Start your legal self-help journey today with our guided questionnaire.
          </p>
          <Link to="/questionnaire">
            <Button size="lg" className="bg-white text-lawmate hover:bg-lawmate-accent hover:text-white">
              Begin Your Legal Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-6 w-6" />
                <h3 className="text-xl font-bold">LawMate</h3>
              </div>
              <p className="text-gray-300">
                Your trusted companion for self-help legal guidance.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
                <li><Link to="/categories" className="text-gray-300 hover:text-white transition">Categories</Link></li>
                <li><Link to="/documents" className="text-gray-300 hover:text-white transition">Documents</Link></li>
                <li><Link to="/faq" className="text-gray-300 hover:text-white transition">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Legal Categories</h4>
              <ul className="space-y-2">
                <li><Link to="/category/family" className="text-gray-300 hover:text-white transition">Family Law</Link></li>
                <li><Link to="/category/housing" className="text-gray-300 hover:text-white transition">Housing & Property</Link></li>
                <li><Link to="/category/employment" className="text-gray-300 hover:text-white transition">Employment</Link></li>
                <li><Link to="/category/contracts" className="text-gray-300 hover:text-white transition">Contracts</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Disclaimer</h4>
              <p className="text-gray-300 text-sm">
                LawMate provides legal information, not legal advice. For professional legal advice, consult with a licensed attorney.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} LawMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
