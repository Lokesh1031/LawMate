
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import AuthForm from "@/components/auth/AuthForm";
import { Scale } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      } else {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 mx-auto mb-4 text-lawmate">
              <Scale className="h-12 w-12" />
            </div>
            <p className="text-gray-600">Checking authentication...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-lawmate mb-4">Welcome to LawMate</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Sign in to save your case progress, access personalized legal guidance, and receive AI-powered assistance for your legal questions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-lawmate bg-opacity-10 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-lawmate mb-4">Benefits of an Account</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-lawmate text-white p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Save your legal case progress</span>
              </li>
              <li className="flex items-start">
                <div className="bg-lawmate text-white p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Access your cases from any device</span>
              </li>
              <li className="flex items-start">
                <div className="bg-lawmate text-white p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Get personalized legal guidance</span>
              </li>
              <li className="flex items-start">
                <div className="bg-lawmate text-white p-1 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Ask the AI assistant about your case</span>
              </li>
            </ul>
          </div>
          
          <div>
            <AuthForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
