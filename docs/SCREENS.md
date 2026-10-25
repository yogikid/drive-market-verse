# Screens

Total 17 halaman UI.

## Area Publik
1. `/` (`_public.index.tsx`) - Peran: Publik (tanpa login) - Komponen: PublicLayout - Service: belum ada - Aksi: Halaman utama (landing)
2. `/cars` (`_public.cars.tsx`) - Peran: Publik (tanpa login) - Komponen: PublicLayout, CarsListPage - Service: carService.list - Aksi: Katalog mobil dengan filter
3. `/cars/$id` (`_public.cars.$id.tsx`) - Peran: Publik (tanpa login) - Komponen: PublicLayout, CarDetail - Service: carService.get, vendorService.get - Aksi: Detail mobil dan harga
4. `/booking/$carId` (`_public.booking.$carId.tsx`) - Peran: Customer - Komponen: PublicLayout, BookingPage - Service: carService.get, bookingService.create - Aksi: Buat booking
5. `/my-bookings` (`_public.my-bookings.tsx`) - Peran: Customer - Komponen: PublicLayout, MyBookings - Service: bookingService.list, carService.list - Aksi: Daftar booking dan batal
6. `/profile` (`_public.profile.tsx`) - Peran: Customer - Komponen: PublicLayout, ProfilePage - Service: direncanakan (authService.update) - Aksi: Ubah profil dan password
7. `/chat` (`_public.chat.tsx`) - Peran: Customer - Komponen: PublicLayout, ChatPage - Service: chatService.listConversations, chatService.messages, chatService.send - Aksi: Chat dengan vendor

## Login
8. `/login` (`login.tsx`) - Peran: Semua - Komponen: LoginPage - Service: direncanakan (authService.login, authService.register) - Aksi: Login dan daftar (termasuk daftar vendor)

## Admin
9. `/admin/dashboard` (`admin.dashboard.tsx`) - Peran: Admin - Komponen: OpsLayout, AdminDashboard - Service: direncanakan (adminService.stats) - Aksi: Dashboard global
10. `/admin/vendors` (`admin.vendors.tsx`) - Peran: Admin - Komponen: OpsLayout, AdminVendors - Service: direncanakan (adminService.vendors) - Aksi: Setujui dan tangguhkan vendor

## Vendor
11. `/vendor/dashboard` (`vendor.dashboard.tsx`) - Peran: Vendor - Komponen: OpsLayout, VendorDashboard - Service: carService.list, bookingService.list, driverService.list - Aksi: Ringkasan vendor, kelola supir (section)
12. `/vendor/cars` (`vendor.cars.tsx`) - Peran: Vendor - Komponen: OpsLayout, VendorCars - Service: carService.list, carService.create, carService.update, carService.remove - Aksi: CRUD mobil
13. `/vendor/chat` (`vendor.chat.tsx`) - Peran: Vendor - Komponen: OpsLayout, VendorChat - Service: chatService.listConversations, chatService.messages, chatService.send, vendorService.list - Aksi: Chat dengan customer
14. `/vendor/reports` (`vendor.reports.tsx`) - Peran: Vendor - Komponen: OpsLayout, VendorReports - Service: bookingService.list - Aksi: Laporan pendapatan

## Driver
15. `/driver/home` (`driver.home.tsx`) - Peran: Driver - Komponen: DriverLayout, DriverHome - Service: direncanakan (driverService.trip) - Aksi: Lihat trip yang ditugaskan
16. `/driver/history` (`driver.history.tsx`) - Peran: Driver - Komponen: DriverLayout, DriverHistory - Service: direncanakan (driverService.history) - Aksi: Riwayat trip
17. `/driver/trip/$id` (`driver.trip.$id.tsx`) - Peran: Driver - Komponen: DriverLayout, DriverTrip - Service: direncanakan (driverService.trip) - Aksi: Memulai/menyelesaikan trip

## API / Webhooks (Direncanakan)
- `POST /api/webhooks/midtrans` - Webhook pembayaran Midtrans (idempotensi, verifikasi signature, ubah paymentStatus).
