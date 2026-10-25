# Domain

Entitas utama:
- **User**: Pengguna dengan role (customer, admin, vendor, driver). (Sudah ada)
- **Vendor**: Data spesifik vendor (status: pending, active, suspended). (Sudah ada)
- **Car**: Mobil yang disewakan (status: ready, active, maintenance). Memiliki tarif per durasi (1 jam, 4 jam, 6 jam, 24 jam) untuk self-drive dan dengan supir. Tidak dihapus permanen jika pernah dibooking (archived). (Sudah ada)
- **Driver**: Supir yang bisa ditugaskan ke booking (status: available, on_trip, offline). (Sudah ada)
- **Booking**: Transaksi penyewaan. (Sudah ada)
  - status: pending, confirmed, ongoing, completed, cancelled.
  - paymentStatus: unpaid, paid, refunded.
- **Conversation**: Percakapan antara customer dan vendor. (Sudah ada)
- **ChatMessage**: Pesan individual di dalam percakapan. (Sudah ada)
- **PricingTier**: Struktur harga sewa (per_jam, per_4_jam, per_6_jam, per_hari) untuk mode lepas kunci dan dengan supir. (Sudah ada)

Entitas tambahan (Direncanakan):
- **Payment**: Transaksi pembayaran Midtrans (provider, provider_order_id, status, gross_amount).
- **AuditLog**: Log aktivitas (seperti refund manual, perubahan status vendor).
- **WebhookEvent**: ID notifikasi unik untuk idempotensi webhook.
