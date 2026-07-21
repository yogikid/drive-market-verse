// Service layer — swap these implementations with real API calls later.
// All UI code MUST go through this layer, never touch mock data directly.
import { bookings, cars, conversations, drivers, messages, users, vendors } from "@/data/mock";
import type { Booking, Car, ChatMessage, Conversation, Driver, User, Vendor } from "@/types";

// Simulate async
const wait = <T>(v: T, ms = 100) => new Promise<T>((r) => setTimeout(() => r(v), ms));

// In-memory mutable stores (mock)
let _cars = [...cars];
let _bookings = [...bookings];
let _messages = [...messages];

export const carService = {
  list: (filters?: { brand?: string; carClass?: string; q?: string; vendorId?: string }) =>
    wait(
      _cars.filter((c) => {
        if (filters?.brand && c.brand !== filters.brand) return false;
        if (filters?.carClass && c.carClass !== filters.carClass) return false;
        if (filters?.vendorId && c.vendorId !== filters.vendorId) return false;
        if (filters?.q && !c.name.toLowerCase().includes(filters.q.toLowerCase())) return false;
        return true;
      }),
    ),
  get: (id: string) => wait(_cars.find((c) => c.id === id)),
  create: (car: Car) => {
    _cars = [..._cars, car];
    return wait(car);
  },
  update: (id: string, patch: Partial<Car>) => {
    _cars = _cars.map((c) => (c.id === id ? { ...c, ...patch } : c));
    return wait(_cars.find((c) => c.id === id));
  },
  remove: (id: string) => {
    _cars = _cars.filter((c) => c.id !== id);
    return wait(true);
  },
  brands: () => wait(Array.from(new Set(cars.map((c) => c.brand))).sort()),
  classes: () => wait(Array.from(new Set(cars.map((c) => c.carClass))).sort()),
};

export const bookingService = {
  list: (filters?: { customerId?: string; vendorId?: string; driverId?: string }) =>
    wait(
      _bookings.filter((b) => {
        if (filters?.customerId && b.customerId !== filters.customerId) return false;
        if (filters?.driverId && b.driverId !== filters.driverId) return false;
        if (filters?.vendorId) {
          const car = _cars.find((c) => c.id === b.carId);
          if (!car || car.vendorId !== filters.vendorId) return false;
        }
        return true;
      }),
    ),
  get: (id: string) => wait(_bookings.find((b) => b.id === id)),
  create: (b: Booking) => {
    _bookings = [..._bookings, b];
    return wait(b);
  },
  updateStatus: (id: string, status: Booking["status"]) => {
    _bookings = _bookings.map((b) => (b.id === id ? { ...b, status } : b));
    return wait(_bookings.find((b) => b.id === id));
  },
};

export const vendorService = {
  list: () => wait(vendors),
  get: (id: string) => wait(vendors.find((v) => v.id === id)),
};

export const driverService = {
  list: (vendorId?: string) => wait(vendorId ? drivers.filter((d) => d.vendorId === vendorId) : drivers),
  get: (id: string) => wait(drivers.find((d) => d.id === id)),
};

export const userService = {
  get: (id: string) => wait(users.find((u) => u.id === id)),
  list: () => wait(users),
};

export const chatService = {
  listConversations: (userId: string) =>
    wait(conversations.filter((c) => c.customerId === userId || vendors.find((v) => v.id === c.vendorId)?.ownerId === userId)),
  messages: (conversationId: string) => wait(_messages.filter((m) => m.conversationId === conversationId)),
  send: (m: ChatMessage) => {
    _messages = [..._messages, m];
    return wait(m);
  },
};

export type { Booking, Car, ChatMessage, Conversation, Driver, User, Vendor };
