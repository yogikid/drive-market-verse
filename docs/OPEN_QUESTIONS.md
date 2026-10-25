# Open Questions

- Apakah status `ongoing` pada Booking bisa dibatalkan jika ada kendala darurat? (Sesuai spesifikasi, ini open question).
- Ide Tambahan: Bagaimana penanganan denda keterlambatan pengembalian? (Di luar scope MVP)
- Ide Tambahan: Fitur upload KTP/SIM tidak ada di MVP, bagaimana verifikasi identitas di lapangan?
- Ide Tambahan: Pencairan dana (payout) ke vendor berada di luar MVP. Bagaimana mekanisme dan pencatatan manualnya jika admin mentransfer ke vendor?
- Rate limit untuk login di Cloudflare Workers: Perlu mengecek dokumentasi Cloudflare Workers lebih lanjut, apakah menggunakan KV atau memory limit per instance cukup untuk rate limit login.
- Bug Halaman Mobil: Terverifikasi bahwa `_public.cars.tsx` tidak memiliki komponen `<Outlet />`. Karena `_public.cars.$id.tsx` adalah child dari `_public.cars.tsx`, konten halamannya tidak bisa render (tampil). Bug ini akan diperbaiki di tahap M1.
