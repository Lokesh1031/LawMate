
export interface QuestionOption {
  id: string;
  text: string;
  nextQuestionId?: string;
  guideId?: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: "q1",
    text: "What general area of law are you interested in?",
    options: [
      {
        id: "family",
        text: "Family Law",
        nextQuestionId: "q2"
      },
      {
        id: "housing",
        text: "Housing & Property",
        nextQuestionId: "q3"
      },
      {
        id: "employment",
        text: "Employment",
        nextQuestionId: "q4"
      },
      {
        id: "contracts",
        text: "Contracts & Business",
        nextQuestionId: "q5"
      }
    ]
  },
  {
    id: "q2",
    text: "What specific family law matter do you need help with?",
    options: [
      {
        id: "divorce",
        text: "Divorce or Separation",
        guideId: "g1"
      },
      {
        id: "custody",
        text: "Child Custody",
        guideId: "g2"
      },
      {
        id: "support",
        text: "Child Support",
        guideId: "g3"
      },
      {
        id: "adoption",
        text: "Adoption",
        guideId: "g4"
      }
    ]
  },
  {
    id: "q3",
    text: "What housing or property issue are you facing?",
    options: [
      {
        id: "landlord",
        text: "Landlord-Tenant Dispute",
        guideId: "g5"
      },
      {
        id: "eviction",
        text: "Eviction",
        guideId: "g6"
      },
      {
        id: "property",
        text: "Property Damage",
        guideId: "g7"
      },
      {
        id: "neighbors",
        text: "Neighbor Disputes",
        guideId: "g8"
      }
    ]
  },
  {
    id: "q4",
    text: "What employment issue are you dealing with?",
    options: [
      {
        id: "termination",
        text: "Wrongful Termination",
        guideId: "g9"
      },
      {
        id: "discrimination",
        text: "Workplace Discrimination",
        guideId: "g10"
      },
      {
        id: "harassment",
        text: "Workplace Harassment",
        guideId: "g11"
      },
      {
        id: "compensation",
        text: "Wage & Hour Issues",
        guideId: "g12"
      }
    ]
  },
  {
    id: "q5",
    text: "What contract or business matter do you need help with?",
    options: [
      {
        id: "breach",
        text: "Breach of Contract",
        guideId: "g13"
      },
      {
        id: "formation",
        text: "Contract Formation",
        guideId: "g14"
      },
      {
        id: "business",
        text: "Business Formation",
        guideId: "g15"
      },
      {
        id: "intellectual",
        text: "Intellectual Property",
        guideId: "g16"
      }
    ]
  }
];

export const getQuestionById = (id: string): Question | undefined => {
  return questions.find(q => q.id === id);
};
