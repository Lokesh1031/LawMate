
import React from "react";
import { Card } from "@/components/ui/card";
import AIChatAssistant from "@/components/AIChatAssistant";

interface AIChatTabProps {
  caseData: Record<string, string>;
}

const AIChatTab: React.FC<AIChatTabProps> = ({ caseData }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <AIChatAssistant caseData={caseData} />
    </div>
  );
};

export default AIChatTab;
