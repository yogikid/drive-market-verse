import type { Booking, Car, ChatMessage, Conversation, Driver, User, Vendor } from "@/types";

export const users: User[] = [
  { id: "u1", name: "Andre Wijaya", email: "andre@mail.com", phone: "0812", role: "customer" },
  { id: "u2", name: "Admin CorporaRent", email: "admin@corporarent.id", phone: "0813", role: "admin" },
  { id: "u3", name: "Budi Rental", email: "budi@rental.id", phone: "0814", role: "vendor" },
  { id: "u4", name: "Sari Auto", email: "sari@auto.id", phone: "0815", role: "vendor" },
  { id: "u5", name: "Joko Trans", email: "joko@trans.id", phone: "0816", role: "vendor" },
  { id: "u6", name: "Pak Tono", email: "tono@driver.id", phone: "0817", role: "driver" },
  { id: "u7", name: "Pak Slamet", email: "slamet@driver.id", phone: "0818", role: "driver" },
  { id: "u8", name: "Pak Rudi", email: "rudi@driver.id", phone: "0819", role: "driver" },
  { id: "u9", name: "Pak Agus", email: "agus@driver.id", phone: "0820", role: "driver" },
];

export const vendors: Vendor[] = [
  { id: "v1", ownerId: "u3", businessName: "Budi Rental Jakarta", city: "Jakarta", status: "active", rating: 4.7 },
  { id: "v2", ownerId: "u4", businessName: "Sari Auto Bandung", city: "Bandung", status: "active", rating: 4.5 },
  { id: "v3", ownerId: "u5", businessName: "Joko Trans Surabaya", city: "Surabaya", status: "pending", rating: 4.2 },
];

export const drivers: Driver[] = [
  { id: "d1", vendorId: "v1", userId: "u6", name: "Pak Tono", status: "on_trip", currentCarId: "c1" },
  { id: "d2", vendorId: "v1", userId: "u7", name: "Pak Slamet", status: "available" },
  { id: "d3", vendorId: "v2", userId: "u8", name: "Pak Rudi", status: "on_trip", currentCarId: "c5" },
  { id: "d4", vendorId: "v3", userId: "u9", name: "Pak Agus", status: "offline" },
];

const pricing = (base: number) => [
  { durationType: "per_jam" as const, selfDrivePrice: Math.round(base / 8), withDriverPrice: Math.round(base / 8) + 25000 },
  { durationType: "per_4_jam" as const, selfDrivePrice: Math.round(base / 2), withDriverPrice: Math.round(base / 2) + 75000 },
  { durationType: "per_6_jam" as const, selfDrivePrice: Math.round(base * 0.7), withDriverPrice: Math.round(base * 0.7) + 100000 },
  { durationType: "per_hari" as const, selfDrivePrice: base, withDriverPrice: base + 150000 },
];

const img = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=800&q=70`;

export const cars: Car[] = [
  { id: "c1", vendorId: "v1", name: "Toyota Avanza", brand: "Toyota", carClass: "MPV", plateNumber: "B 1234 XYZ", capacity: 7, fuelType: "Bensin", description: "MPV keluarga irit dan nyaman.", status: "active", images: [img("1553440569-bcc63803a83d")], pricing: pricing(350000), city: "Jakarta" },
  { id: "c2", vendorId: "v1", name: "Daihatsu Xenia", brand: "Daihatsu", carClass: "MPV", plateNumber: "B 2345 XYZ", capacity: 7, fuelType: "Bensin", description: "Alternatif MPV terjangkau.", status: "ready", images: [img("1494976388531-d1058494cdd8")], pricing: pricing(320000), city: "Jakarta" },
  { id: "c3", vendorId: "v1", name: "Toyota Innova Reborn", brand: "Toyota", carClass: "MPV", plateNumber: "B 3456 XYZ", capacity: 7, fuelType: "Diesel", description: "MPV premium diesel.", status: "ready", images: [img("1583121274602-3e2820c69888")], pricing: pricing(650000), city: "Jakarta" },
  { id: "c4", vendorId: "v1", name: "Honda Brio", brand: "Honda", carClass: "City Car", plateNumber: "B 4567 XYZ", capacity: 5, fuelType: "Bensin", description: "City car lincah.", status: "ready", images: [img("1550355291-bbee04a92027")], pricing: pricing(300000), city: "Jakarta" },
  { id: "c5", vendorId: "v2", name: "Toyota Fortuner", brand: "Toyota", carClass: "SUV", plateNumber: "D 1234 ABC", capacity: 7, fuelType: "Diesel", description: "SUV gagah untuk perjalanan jauh.", status: "active", images: [img("1606664515524-ed2f786a0bd6")], pricing: pricing(800000), city: "Bandung" },
  { id: "c6", vendorId: "v2", name: "Mitsubishi Pajero Sport", brand: "Mitsubishi", carClass: "SUV", plateNumber: "D 2345 ABC", capacity: 7, fuelType: "Diesel", description: "SUV tangguh medan berat.", status: "ready", images: [img("1552519507-da3b142c6e3d")], pricing: pricing(850000), city: "Bandung" },
  { id: "c7", vendorId: "v2", name: "Suzuki Ertiga", brand: "Suzuki", carClass: "MPV", plateNumber: "D 3456 ABC", capacity: 7, fuelType: "Bensin", description: "MPV modern dan hemat BBM.", status: "maintenance", images: [img("1580273916550-e323be2ae537")], pricing: pricing(340000), city: "Bandung" },
  { id: "c8", vendorId: "v2", name: "Honda HR-V", brand: "Honda", carClass: "SUV", plateNumber: "D 4567 ABC", capacity: 5, fuelType: "Bensin", description: "SUV kompak stylish.", status: "ready", images: [img("1606152421802-db97b9c7a11b")], pricing: pricing(550000), city: "Bandung" },
  { id: "c9", vendorId: "v3", name: "Toyota Alphard", brand: "Toyota", carClass: "Luxury", plateNumber: "L 1234 DEF", capacity: 7, fuelType: "Bensin", description: "MPV mewah untuk tamu VIP.", status: "ready", images: [img("1618843479313-40f8afb4b4d8")], pricing: pricing(1800000), city: "Surabaya" },
  { id: "c10", vendorId: "v3", name: "Hyundai Ioniq 5", brand: "Hyundai", carClass: "Luxury", plateNumber: "L 2345 DEF", capacity: 5, fuelType: "Listrik", description: "Mobil listrik futuristik.", status: "ready", images: [img("1617788138017-80ad40651399")], pricing: pricing(1200000), city: "Surabaya" },
  { id: "c11", vendorId: "v3", name: "Toyota Kijang Innova Zenix", brand: "Toyota", carClass: "MPV", plateNumber: "L 3456 DEF", capacity: 7, fuelType: "Hybrid", description: "MPV hybrid generasi baru.", status: "ready", images: [img("1552519507-da3b142c6e3d")], pricing: pricing(700000), city: "Surabaya" },
  { id: "c12", vendorId: "v3", name: "Wuling Air EV", brand: "Wuling", carClass: "City Car", plateNumber: "L 4567 DEF", capacity: 4, fuelType: "Listrik", description: "Mobil listrik mini dalam kota.", status: "ready", images: [img("1617469767053-3f0f4a1a4e2e")], pricing: pricing(280000), city: "Surabaya" },
];

export const bookings: Booking[] = [
  { id: "b1", carId: "c1", customerId: "u1", driverId: "d1", durationType: "per_hari", withDriver: true, startTime: new Date(Date.now() - 3600000).toISOString(), endTime: new Date(Date.now() + 86400000).toISOString(), totalPrice: 500000, status: "ongoing", paymentStatus: "paid" },
  { id: "b2", carId: "c4", customerId: "u1", durationType: "per_hari", withDriver: false, startTime: new Date(Date.now() - 5 * 86400000).toISOString(), endTime: new Date(Date.now() - 4 * 86400000).toISOString(), totalPrice: 300000, status: "completed", paymentStatus: "paid" },
  { id: "b3", carId: "c8", customerId: "u1", durationType: "per_6_jam", withDriver: false, startTime: new Date(Date.now() + 86400000).toISOString(), endTime: new Date(Date.now() + 86400000 + 6 * 3600000).toISOString(), totalPrice: 385000, status: "confirmed", paymentStatus: "paid" },
  { id: "b4", carId: "c5", customerId: "u1", durationType: "per_hari", withDriver: true, startTime: new Date(Date.now() + 3 * 86400000).toISOString(), endTime: new Date(Date.now() + 4 * 86400000).toISOString(), totalPrice: 950000, status: "pending", paymentStatus: "unpaid" },
];

export const conversations: Conversation[] = [
  { id: "conv1", customerId: "u1", vendorId: "v1", carId: "c1", lastMessage: "Baik pak, mobil siap jam 8", lastAt: new Date().toISOString() },
  { id: "conv2", customerId: "u1", vendorId: "v2", carId: "c5", lastMessage: "Terima kasih", lastAt: new Date(Date.now() - 86400000).toISOString() },
];

export const messages: ChatMessage[] = [
  { id: "m1", conversationId: "conv1", senderId: "u1", content: "Halo pak, mobilnya sudah siap?", timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: "m2", conversationId: "conv1", senderId: "u3", content: "Baik pak, mobil siap jam 8", timestamp: new Date(Date.now() - 3600000).toISOString() },
];
