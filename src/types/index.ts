export type DurationType = "per_jam" | "per_4_jam" | "per_6_jam" | "per_hari";
export type CarStatus = "ready" | "active" | "maintenance";

export interface PricingTier {
  durationType: DurationType;
  selfDrivePrice: number;
  withDriverPrice: number;
}

export interface Car {
  id: string;
  vendorId: string;
  name: string;
  brand: string;
  carClass: string;
  plateNumber: string;
  capacity: number;
  fuelType: "Bensin" | "Diesel" | "Listrik" | "Hybrid";
  description: string;
  status: CarStatus;
  images: string[];
  pricing: PricingTier[];
  city?: string;
}

export interface Booking {
  id: string;
  carId: string;
  customerId: string;
  driverId?: string;
  durationType: DurationType;
  withDriver: boolean;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "ongoing" | "completed" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";
}

export type Role = "customer" | "admin" | "vendor" | "driver";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
}

export interface Vendor {
  id: string;
  ownerId: string;
  businessName: string;
  city: string;
  status: "active" | "pending";
  rating?: number;
}

export interface Driver {
  id: string;
  vendorId: string;
  userId: string;
  name: string;
  status: "available" | "on_trip" | "offline";
  currentCarId?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  customerId: string;
  vendorId: string;
  carId?: string;
  lastMessage?: string;
  lastAt?: string;
}
