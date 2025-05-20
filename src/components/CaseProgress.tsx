
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Check, Clock } from "lucide-react";

interface CaseProgressProps {
  currentStep: number;
  totalSteps: number;
  completedQuestions: number;
  totalQuestions: number;
}

const CaseProgress: React.FC<CaseProgressProps> = ({
  currentStep,
  totalSteps,
  completedQuestions,
  totalQuestions,
}) => {
  const progressPercentage = (completedQuestions / totalQuestions) * 100;
  
  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-lawmate">Case Progress</h3>
        <span className="text-sm text-gray-500">
          {completedQuestions} of {totalQuestions} questions answered
        </span>
      </div>
      
      <Progress value={progressPercentage} className="h-2 mb-4" />
      
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`flex items-center px-3 py-1 rounded-full text-xs ${
              index < currentStep 
                ? "bg-green-100 text-green-800" 
                : index === currentStep
                ? "bg-lawmate text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {index < currentStep ? (
              <Check className="w-3 h-3 mr-1" />
            ) : (
              <Clock className="w-3 h-3 mr-1" />
            )}
            Step {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseProgress;
