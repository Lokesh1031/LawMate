
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History as HistoryIcon, Eye, Trash2, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface UserCase {
  id: string;
  case_type: string;
  analysis_result: string;
  answers: Record<string, string>;
  created_at: string;
}

const History = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cases, setCases] = useState<UserCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserCases();
    }
  }, [user]);

  const fetchUserCases = async () => {
    try {
      const { data, error } = await supabase
        .from('user_cases')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCases(data || []);
    } catch (error) {
      console.error('Error fetching user cases:', error);
      toast({
        title: "Error",
        description: "Failed to load your case history.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteCase = async (caseId: string) => {
    try {
      const { error } = await supabase
        .from('user_cases')
        .delete()
        .eq('id', caseId);

      if (error) throw error;

      setCases(cases.filter(c => c.id !== caseId));
      toast({
        title: "Success",
        description: "Case deleted successfully."
      });
    } catch (error) {
      console.error('Error deleting case:', error);
      toast({
        title: "Error",
        description: "Failed to delete case.",
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-16 text-center">
          <HistoryIcon className="h-16 w-16 mx-auto mb-6 text-gray-400" />
          <h1 className="text-3xl font-bold mb-4">Access Your Case History</h1>
          <p className="text-gray-600 mb-8">Please sign in to view your saved legal assessments and case history.</p>
          <Link to="/auth">
            <Button className="bg-lawmate text-white hover:bg-lawmate-dark">
              Sign In
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <HistoryIcon className="h-16 w-16 mx-auto mb-6 text-lawmate" />
          <h1 className="text-3xl font-bold mb-4">Your Case History</h1>
          <p className="text-gray-600">Review your previous legal assessments and saved cases.</p>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lawmate mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your case history...</p>
          </div>
        ) : cases.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-8">You haven't saved any cases yet.</p>
            <Link to="/questionnaire">
              <Button className="bg-lawmate text-white hover:bg-lawmate-dark">
                Start Your First Assessment
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((userCase) => (
              <Card key={userCase.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary">{userCase.case_type || "General"}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(userCase.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-lg">Case Analysis</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {userCase.analysis_result ? 
                      userCase.analysis_result.substring(0, 150) + "..." : 
                      "Legal case analysis completed"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteCase(userCase.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;
