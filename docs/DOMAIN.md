# Domain

Entitas utama:
- **User**: Pengguna dengan role (customer, admin, vendor, driver).
- **Vendor**: Data spesifik vendor (status: pending, active, suspended).
- **Car**: Mobil yang disewakan (status: ready, active, maintenance). Memiliki tarif per durasi (1 jam, 4 jam, 6 jam, 24 jam) untuk self-drive dan dengan supir. Tidak dihapus permanen jika pernah dibooking (archived).
- **Driver**: Supir yang bisa ditugaskan ke booking (status: available, on_trip, offline).
- **Booking**: Transaksi penyewaan.
  - status: pending, confirmed, ongoing, completed, cancelled.
  - paymentStatus: unpaid, paid, refunded.
- **Payment**: Transaksi pembayaran Midtrans (provider, provider_order_id, status, gross_amount).
- **AuditLog**: Log aktivitas (seperti refund manual, perubahan status vendor).
- **WebhookEvent**: ID notifikasi unik untuk idempotensi webhook.
