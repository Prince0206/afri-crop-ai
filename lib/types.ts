export type ChatMessage = {
  id: string;
  conversationId: string;
  sender: "user" | "ai" | "expert";
  content: string;
  imageUrl?: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  userId: string;
  userName?: string;
  userPhone?: string;
  cropType: string;
  question: string;
  imageUrl?: string;
  aiResponse?: string;
  expertResponse?: string;
  expertId?: string;
  status:
    | "pending"
    | "ai_answered"
    | "expert_answered"
    | "resolved"
    | "open"
    | "awaiting_expert";
  rating?: 1 | 2 | 3 | 4 | 5;
  feedback?: string;
  helpful?: boolean;
  notificationToken?: string;
  phoneNumber?: string;
  cropContext?: string;
  lastMessageAt?: string;
  createdAt: string;
  updatedAt: string;
};

export interface ExpertProfile {
  id: string;
  name: string;
  specialty: string[];
  avgRating: number;
  totalReviews: number;
  responsesCount: number;
  badges: ("verified" | "top_rated" | "fast_responder")[];
}
