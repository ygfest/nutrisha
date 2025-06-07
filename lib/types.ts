export interface Admin {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  date_of_birth: string | null;
  gender: string | null;
  emergency_contact: string | null;
  emergency_phone: string | null;
  health_goals: string | null;
  dietary_restrictions: string | null;
  allergies: string | null;
  medications: string | null;
  medical_conditions: string | null;
  activity_level: string | null;
  previous_nutrition: string | null;
  referral_source: string | null;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  client_id: string;
  date: string;
  time: string;
  type: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  duration: number; // in minutes
  notes: string | null;
  created_at: string;
  updated_at: string;
  client?: Client;
}

export interface Message {
  id: string;
  client_id: string | null;
  client_name: string;
  message: string;
  type: "ai_chat" | "follow_up" | "booking" | "general";
  status: "read" | "unread";
  created_at: string;
  client?: Client;
}

export interface DashboardStats {
  total_clients: number;
  monthly_bookings: number;
  monthly_revenue: number;
  ai_chat_messages: number;
  success_rate: number;
  avg_session_time: number;
  previous_total_clients: number;
  previous_monthly_bookings: number;
  previous_monthly_revenue: number;
  previous_ai_chat_messages: number;
  previous_success_rate: number;
  previous_avg_session_time: number;
}

export interface Database {
  public: {
    Tables: {
      Admin: {
        Row: Admin;
        Insert: Omit<Admin, "id" | "createdAt" | "updatedAt">;
        Update: Partial<Omit<Admin, "id" | "createdAt">>;
      };
      clients: {
        Row: Client;
        Insert: Omit<Client, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Client, "id" | "created_at">>;
      };
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Booking, "id" | "created_at">>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, "id" | "created_at">;
        Update: Partial<Omit<Message, "id" | "created_at">>;
      };
    };
  };
}
