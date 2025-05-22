
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatAssistantProps {
  caseData?: Record<string, string>;
  className?: string;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ caseData, className = "" }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your LawMate AI assistant. How can I help with your legal questions today?",
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Call the Supabase edge function to get an AI response
      const { data, error } = await supabase.functions.invoke('analyze-legal-case', {
        body: {
          caseDescription: input.trim(),
          caseType: "Chat question",
          previousMessages: messages.map(m => ({
            role: m.role,
            content: m.content
          })),
          caseData: caseData || {}
        }
      });

      if (error) {
        console.error("Error calling AI function:", error);
        throw new Error(error.message || "Failed to get a response");
      }

      // Add AI response to the chat
      const aiResponse: Message = {
        role: "assistant",
        content: data?.response || "I'm sorry, I couldn't process your request. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("Error in AI chat:", error);
      
      // Add fallback response
      const fallbackResponse: Message = {
        role: "assistant",
        content: "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, fallbackResponse]);
      
      toast({
        title: "Connection issue",
        description: "There was a problem connecting to the AI service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`flex flex-col h-full max-h-[600px] ${className}`}>
      <CardHeader className="bg-lawmate text-white p-4">
        <CardTitle className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2" />
          LawMate AI Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "assistant"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-lawmate text-white"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p>Thinking...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 border-t">
        <div className="flex w-full space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your legal issue..."
            className="flex-grow"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!loading) handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={loading || !input.trim()}
            className="self-end"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIChatAssistant;
