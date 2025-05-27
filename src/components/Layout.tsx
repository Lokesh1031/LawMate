
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import UserProfile from "@/components/auth/UserProfile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-lawmate py-4 px-6 shadow-md">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/f02b5f04-21e3-447d-bf8b-338e04242896.png" 
              alt="LawMate Logo" 
              className="h-10 w-10"
            />
            <Link to="/">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Castellar, serif' }}>LawMate</h1>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-white hover:text-lawmate-accent transition">Home</Link>
            <Link to="/categories" className="text-white hover:text-lawmate-accent transition">Legal Categories</Link>
            <Link to="/documents" className="text-white hover:text-lawmate-accent transition">Documents</Link>
            <Link to="/faq" className="text-white hover:text-lawmate-accent transition">FAQ</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            {!loading && (
              user ? (
                <UserProfile />
              ) : (
                <Link to="/auth">
                  <Button variant="outline" className="hidden md:inline-flex bg-white text-lawmate hover:bg-lawmate-accent hover:text-white">
                    Sign In
                  </Button>
                </Link>
              )
            )}
            
            <Link to="/questionnaire">
              <Button variant="outline" className="hidden md:inline-flex bg-white text-lawmate hover:bg-lawmate-accent hover:text-white">
                Get Started
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-lawmate-light text-white py-4">
          <nav className="container flex flex-col gap-4">
            <Link to="/" className="px-4 py-2 hover:bg-lawmate hover:bg-opacity-50 rounded" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/categories" className="px-4 py-2 hover:bg-lawmate hover:bg-opacity-50 rounded" onClick={() => setMobileMenuOpen(false)}>Legal Categories</Link>
            <Link to="/documents" className="px-4 py-2 hover:bg-lawmate hover:bg-opacity-50 rounded" onClick={() => setMobileMenuOpen(false)}>Documents</Link>
            <Link to="/faq" className="px-4 py-2 hover:bg-lawmate hover:bg-opacity-50 rounded" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            {!loading && !user && (
              <Link to="/auth" className="px-4 py-2 hover:bg-lawmate hover:bg-opacity-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                Sign In
              </Link>
            )}
            <Link to="/questionnaire" className="px-4 py-2 hover:bg-lawmate hover:bg-opacity-50 rounded" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full bg-white text-lawmate hover:bg-lawmate-accent hover:text-white">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/lovable-uploads/f02b5f04-21e3-447d-bf8b-338e04242896.png" 
                  alt="LawMate Logo" 
                  className="h-8 w-8"
                />
                <h3 className="text-xl font-bold" style={{ fontFamily: 'Castellar, serif' }}>LawMate</h3>
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

export default Layout;
