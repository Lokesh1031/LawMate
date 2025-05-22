
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

export interface CaseData {
  currentQuestionId: string;
  previousQuestions: string[];
  answers: Record<string, string>;
  caseType?: string;
  analysisResult?: string;
}

export const useUserCase = () => {
  const [caseData, setCaseData] = useState<CaseData>({
    currentQuestionId: 'q1',
    previousQuestions: [],
    answers: {},
    caseType: undefined,
    analysisResult: undefined,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Method to update the current case
  const updateCase = (updates: Partial<CaseData>) => {
    setCaseData(prev => ({
      ...prev,
      ...updates,
    }));
  };

  // Method to reset the case data
  const resetCase = () => {
    setCaseData({
      currentQuestionId: 'q1',
      previousQuestions: [],
      answers: {},
      caseType: undefined,
      analysisResult: undefined,
    });
  };

  // Save case progress to local storage
  useEffect(() => {
    localStorage.setItem('lawmate_case_data', JSON.stringify(caseData));
  }, [caseData]);

  // Load case progress from local storage
  useEffect(() => {
    const savedCase = localStorage.getItem('lawmate_case_data');
    if (savedCase) {
      try {
        const parsedCase = JSON.parse(savedCase);
        setCaseData(parsedCase);
      } catch (error) {
        console.error('Error parsing saved case data', error);
      }
    }
  }, []);

  // Method to save user case data to Supabase
  const saveCaseToDatabase = async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Not logged in",
          description: "Please log in to save your case details.",
          variant: "destructive"
        });
        return false;
      }
      
      // Prepare the data for saving to Supabase
      const caseToSave = {
        user_id: user.id,
        case_type: caseData.caseType || "Unspecified",
        analysis_result: caseData.analysisResult || "",
        answers: caseData.answers,
        created_at: new Date().toISOString(),
      };
      
      // Insert the case into the Supabase database
      const { data, error } = await supabase
        .from('user_cases')
        .insert(caseToSave);
      
      if (error) {
        console.error('Error saving to Supabase:', error);
        throw error;
      }
      
      toast({
        title: "Progress saved",
        description: "Your case details have been saved to your account."
      });
      
      return true;
    } catch (error) {
      console.error('Error saving case data', error);
      toast({
        title: "Error saving progress",
        description: "Please try again later or check if you're logged in.",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    caseData,
    updateCase,
    resetCase,
    loading,
    saveCaseToDatabase
  };
};
