1. TUJUAN
Mengubah prototipe frontend ini menjadi sistem sewa mobil multi-vendor yang bisa dipakai: login nyata, CRUD mobil dan supir, booking dengan harga dan ketersediaan yang dihitung di server, pembayaran Midtrans, dan dashboard per peran. UI yang sudah ada dipertahankan dan tidak di-redesign. Semua teks UI dan pesan error untuk pengguna dalam Bahasa Indonesia.

2. KONDISI REPO (sudah diverifikasi)
- Stack (package.json): TanStack Start, React 19, Vite, Tailwind v4, shadcn/ui, TanStack Router (file-based), TanStack Query, Zustand, zod, react-hook-form. Package manager: bun (ada bun.lock). Target deploy: Cloudflare Workers (wrangler.jsonc).
- Brand di UI: "CorporaRent". Nama repo: drive-market-verse. Jangan ganti nama tanpa keputusan tertulis.
- Semua data masih mock: src/data/mock.ts, dilayani src/services/index.ts dari memori, sehingga hilang saat refresh.
- Login palsu: src/routes/login.tsx mengabaikan email dan password. Session disimpan di localStorage (src/lib/session.ts). Tidak ada guard route.
- src/routes/_public.booking.$carId.tsx menghitung harga dan mengirim status "confirmed" dari browser.
- src/components/AIChatWidget.tsx membalas dengan kalimat acak dari daftar tetap.
- .env ter-commit dan berisi VITE_API_BASE_URL, yang tidak dipakai di src.
- AGENTS.md berisi blok LOVABLE. Blok itu wajib dipertahankan.

3. FAKTA YANG WAJIB DIPEGANG
- 4 peran (tipe Role di src/types/index.ts): customer, admin, vendor, driver. Di UI, vendor tampil sebagai "Pemilik Rental" dan driver sebagai "Supir".
- 17 halaman UI, dengan URL dari routeTree.gen.ts:
  - Area publik, _public.* (7): / (_public.index.tsx), /cars (_public.cars.tsx), /cars/$id (_public.cars.$id.tsx), /booking/$carId (_public.booking.$carId.tsx), /my-bookings (_public.my-bookings.tsx), /profile (_public.profile.tsx), /chat (_public.chat.tsx)
  - Login (1): /login (login.tsx), dipakai semua peran
  - Admin (2): /admin/dashboard (admin.dashboard.tsx), /admin/vendors (admin.vendors.tsx)
  - Vendor (4): /vendor/dashboard (vendor.dashboard.tsx), /vendor/cars (vendor.cars.tsx), /vendor/chat (vendor.chat.tsx), /vendor/reports (vendor.reports.tsx)
  - Driver (3): /driver/home (driver.home.tsx), /driver/history (driver.history.tsx), /driver/trip/$id (driver.trip.$id.tsx)
- Bukan halaman, jangan dihitung: __root.tsx, _public.tsx, admin.tsx, vendor.tsx, driver.tsx.
- Komponen layout di src/components/layouts/: PublicLayout, OpsLayout, DriverLayout.
- Dugaan bug: /cars/$id mungkin tidak tampil, karena _public.cars.tsx tidak memuat <Outlet />, padahal _public.cars.$id.tsx adalah child-nya.
- Jika angka 17 atau 4 tidak cocok dengan kode, ikuti kode dan catat selisihnya.

4. ASUMSI DEFAULT
Ini keputusan produk dan teknis yang sudah dipilih. Pemilik repo bisa mengubahnya sebelum merge.
- Model bisnis: marketplace multi-vendor. Platform menerima pembayaran. Pencairan dana ke vendor di luar MVP.
- Backend: di dalam repo ini, memakai server functions TanStack Start dan PostgreSQL lewat Drizzle ORM. Provider Postgres default: Neon.
- Auth: better-auth dengan email dan password. Customer daftar sendiri. Vendor daftar lewat mode "daftar pemilik rental" di /login, statusnya pending sampai disetujui admin. Supir dibuat oleh vendor dengan password sementara yang wajib diganti saat login pertama. Admin dibuat dari seed.
- Pembayaran: Midtrans sandbox, metode QRIS dan Virtual Account. Refund di MVP manual, diproses admin dan dicatat di audit log.
- Zona waktu: input dan tampilan WIB (Asia/Jakarta), disimpan dalam UTC.
- Durasi: per_jam = 1 jam, per_4_jam = 4 jam, per_6_jam = 6 jam, per_hari = 24 jam. Total harga = tarif tier × jumlah unit (1 sampai 30). Tarif berbeda untuk self-drive dan dengan supir.
- Booking pending yang belum dibayar kedaluwarsa setelah 30 menit, lalu slotnya bebas.
- Supir untuk booking dengan supir dipilih otomatis dari supir vendor yang tersedia, dengan urutan yang deterministik.
- Selama proyek ini dikerjakan, Lovable tidak mengedit repo. Semua perubahan lewat PR.
- Jumlah halaman UI tetap 17. Fitur tambahan dipasang di halaman yang sudah ada, misalnya tab di /login atau section di /vendor/dashboard. Endpoint API dan webhook bukan halaman, boleh ditambah, dan dicatat di docs/SCREENS.md.

5. ATURAN ANTI-HALUSINASI (WAJIB)
a. Buka file sebelum menyebutnya. Setiap klaim tentang kode wajib menyebut path file.
b. Jangan memakai API library, framework, atau layanan dari ingatan. Untuk TanStack Start, TanStack Router, better-auth, Drizzle, Midtrans, dan Cloudflare, cek dokumentasi resmi atau kode di node_modules sesuai versi yang terpasang. Kalau tidak bisa dicek, tulis TODO dan berhenti di titik itu.
c. Sebelum menambah dependency, cek versi terbaru dengan `npm view <paket> version` dan tulis alasannya di PR. Jangan upgrade TanStack, React, atau Vite tanpa perintah eksplisit.
d. Jangan menambah fitur di luar spesifikasi ini. Ide tambahan masuk ke docs/OPEN_QUESTIONS.md.
e. Jangan memutuskan hal bisnis baru. Yang tidak ada di bagian 4, 7, atau 8 masuk ke docs/OPEN_QUESTIONS.md.
f. Jangan tulis "sudah dites", "lulus", atau "berjalan" kalau perintahnya tidak kamu jalankan. Test yang di-skip, misalnya karena Postgres tidak tersedia, dilaporkan sebagai BELUM DIUJI.
g. Kalau kode dan spesifikasi bertentangan: untuk fakta tentang kode, ikuti kode. Untuk keputusan produk, ikuti spesifikasi. Catat konfliknya di docs/OPEN_QUESTIONS.md.
h. Jangan edit src/routeTree.gen.ts (auto-generated). Jangan buat folder src/pages (lihat src/routes/README.md). Jangan ubah src/server.ts, src/lib/error-capture.ts, src/lib/error-page.ts, atau src/lib/lovable-error-reporting.ts tanpa alasan tertulis di PR.
i. Jangan mengubah tampilan visual yang sudah ada kecuali yang diminta. Tambahkan fungsi tanpa merombak layout.

6. ATURAN GIT (WAJIB)
- Kerja di branch baru (contoh: docs/m0-spec). Buka PR. Jangan push ke main.
- Jangan force-push, rebase, atau squash commit yang sudah di-push.
- Jangan ubah blok <!-- LOVABLE:BEGIN --> sampai <!-- LOVABLE:END --> di AGENTS.md. Tambahkan bagian baru di bawahnya.
- Jangan commit .env atau secret apa pun. Nilai secret hanya lewat environment.

7. HAK AKSES PER PERAN (sumber kebenaran untuk server)
- Publik tanpa login: katalog, detail mobil, /login.
- Customer: membuat booking, melihat dan membatalkan booking miliknya (pending, atau confirmed sebelum mulai), mengubah profil sendiri, chat di percakapannya.
- Vendor dengan status active: CRUD mobil dan supir miliknya, melihat booking mobilnya, memulai dan menyelesaikan trip, chat, dan laporan miliknya.
- Vendor dengan status pending atau suspended: boleh login, tapi tidak boleh membuat mobil, supir, atau menerima booking baru.
- Supir: melihat dan mengubah trip yang ditugaskan kepadanya (mulai, selesai), dan melihat riwayat miliknya. Nama dan telepon customer hanya terlihat untuk trip yang ditugaskan kepadanya.
- Admin: menyetujui atau menangguhkan vendor, dashboard global, refund manual (dicatat di audit log).
- Setiap server function wajib memeriksa peran DAN kepemilikan data. Pengecekan di klien (guard route, Zustand) hanya untuk UX, bukan keamanan.

8. ENTITAS DAN STATUS
Mulai dari src/types/index.ts, lalu tambahkan yang berikut.
- Booking.status: pending → confirmed (setelah webhook pembayaran sukses) → ongoing (dimulai vendor atau supir) → completed. Pending atau confirmed bisa menjadi cancelled. Ongoing tidak bisa dibatalkan (open question).
- Booking.paymentStatus: unpaid → paid (lewat webhook) → refunded (manual oleh admin).
- Booking tidak boleh overlap untuk mobil yang sama, dan untuk supir yang sama. Jaga ini di database dengan exclusion constraint (butuh extension btree_gist), bukan hanya di UI.
- Car.status: ready (default), active (saat ada booking ongoing), maintenance (diatur vendor; mobil maintenance tidak bisa dibooking). Arti "active" di tipe lama ambigu, jadi pemetaan ini adalah asumsi.
- Driver.status: available, on_trip (saat trip ongoing), offline.
- Vendor.status: pending, active, suspended. Suspended ditambahkan dan dicatat di PR.
- Tabel tambahan: kredensial dan session (lewat better-auth), audit_logs, payments (provider, provider_order_id unik, status, gross_amount), webhook_events (ID notifikasi unik untuk idempotensi).
- Hapus mobil berarti arsip (archived_at). Mobil yang pernah dibooking tidak boleh dihapus permanen.
- ID, timestamp, status, dan harga dibuat server. Klien tidak boleh mengirimnya. Ini berlaku untuk bookingService.create dan chatService.send.

9. MILESTONE (urutan wajib, satu PR per milestone)

M0: Spesifikasi dan verifikasi (sesi ini)
- Simpan bagian 1 sampai 11 dari prompt ini sebagai docs/SPEC.md, persis seperti tertulis.
- Buat docs/SCREENS.md: 17 halaman dengan URL, file, peran, komponen, service, aksi, dan status. Tambahkan bagian API yang berisi endpoint yang DIRENCANAKAN, bukan yang sudah ada. Buat juga docs/ROLES.md, docs/DOMAIN.md, dan docs/OPEN_QUESTIONS.md.
- Verifikasi 17 halaman dengan: `ls src/routes/*.tsx | grep -v __root | grep -vE '/(_public|admin|driver|vendor)\.tsx$' | wc -l`. Hasilnya harus 17. Verifikasi juga dugaan bug /cars/$id dan catat hasilnya.
- Tambahkan bagian "Aturan Proyek" di AGENTS.md, di bawah blok LOVABLE, yang merangkum bagian 5 dan 6.
- Tidak ada perubahan di src/ atau file konfigurasi.
- Kriteria selesai: dokumen lengkap, angka terverifikasi, dan `bun run lint` serta `bun run build` dijalankan dengan hasil dilaporkan apa adanya.

M1: Fondasi
- Tambahkan vitest dan script `test`.
- Tambahkan Drizzle dan drizzle-kit. Buat skema untuk semua entitas, migrasi, dan script seed dari mock untuk dev. Password seed diambil dari environment, tidak ditulis di repo.
- Pasang better-auth: login email dan password, daftar customer, logout, dan session cookie httpOnly.
- Tambahkan guard route per area di beforeLoad, dan cek peran di setiap server function.
- Ganti implementasi src/services/index.ts dengan server functions. Pertahankan nama dan bentuk method sebisa mungkin supaya UI tidak banyak berubah. Hapus semua import dari src/data/mock.ts di route dan komponen (seed boleh).
- Perbaiki navigasi /cars/$id jika dugaan di M0 terkonfirmasi.
- Hapus VITE_API_BASE_URL dari .env, untrack .env (`git rm --cached .env`), pastikan .env ada di .gitignore, dan tambahkan .env.example tanpa nilai.
- Kriteria selesai: lint, build, dan test lulus. Akun seed untuk keempat peran bisa login. Password salah ditolak. Akses tanpa login ke /booking/$carId, /my-bookings, /profile, dan /chat diarahkan ke /login. Customer tidak bisa membuka /admin/*. Ke-17 halaman tetap ada.

M2: CRUD vendor dan persetujuan admin
- Vendor aktif: CRUD mobil beserta 4 tarif tier, arsip mobil, dan CRUD supir. Supir dikelola sebagai section di /vendor/dashboard.
- Vendor mendaftar lewat mode "daftar pemilik rental" di /login, statusnya pending.
- Admin di /admin/vendors: setujui (pending ke active) dan tangguhkan (active ke suspended). Aksi ini masuk audit log.
- /vendor/cars dan /admin/vendors memakai data dari database.
- Kriteria selesai: test memastikan vendor A tidak bisa mengubah mobil vendor B, vendor pending tidak bisa menambah mobil, tarif negatif ditolak, dan audit log tercatat.

M3: Katalog dan booking
- /cars: filter berdasarkan brand, carClass, pencarian nama, dan vendorId, dari database. /cars/$id menampilkan harga per durasi untuk self-drive dan dengan supir.
- Booking: pilih durasi, jumlah unit, tanggal dan jam (WIB), serta self-drive atau dengan supir. Server menghitung harga dan end_at, mengecek ketersediaan mobil dan supir, lalu membuat booking berstatus pending. Pembuatan transaksi pembayaran dipasang di M4.
- /my-bookings: daftar dan pembatalan. /profile: ubah nama dan telepon, ganti password dengan verifikasi password lama.
- Kriteria selesai: unit test harga untuk 4 tier × 2 mode × jumlah unit. Test integrasi: dua booking yang overlap untuk mobil atau supir yang sama ditolak database. Jika Postgres tidak tersedia, laporkan BELUM DIUJI. Klien tidak bisa mengirim harga atau status.

M4: Pembayaran dan trip
- Midtrans sandbox untuk QRIS dan VA. Kredensial hanya di environment server. Jika kredensial sandbox belum ada, buat adapter dengan mode "tidak terhubung" yang jelas, dan jangan pernah menyatakan pembayaran berhasil.
- Webhook di /api/webhooks/midtrans: verifikasi signature sesuai dokumentasi resmi Midtrans. Idempotensi: notifikasi yang sama tidak diproses dua kali. Hanya webhook yang boleh mengubah pending ke confirmed dan unpaid ke paid.
- Booking unpaid yang lewat 30 menit menjadi cancelled. Pengecekan dilakukan saat ada request yang membaca atau menulis booking. Pakai cron Cloudflare hanya jika dokumentasinya sudah dicek.
- Vendor atau supir memulai dan menyelesaikan trip. Refund manual oleh admin, dicatat di audit log.
- /driver/home, /driver/history, dan /driver/trip/$id memakai data database dengan batas akses per supir.
- Kriteria selesai: test webhook duplikat, test expiry, dan test bahwa supir lain tidak bisa melihat trip yang bukan miliknya.

M5: Chat dan dashboard
- Chat customer dan vendor per percakapan, dengan polling 5 detik. Hanya peserta percakapan yang bisa membaca dan mengirim.
- /vendor/dashboard dan /vendor/reports: angka dihitung dari database (booking per status, pendapatan paid per periode).
- /admin/dashboard: vendor per status, booking per status, dan total pendapatan paid.
- AIChatWidget tidak diubah sampai ada spesifikasinya.
- Kriteria selesai: angka dashboard dicocokkan dengan data seed lewat test.

M6: Pengerasan dan rilis
- Validasi input dengan zod di semua server function. Pesan error ke pengguna tidak membocorkan stack trace.
- Rate limit untuk login, dengan cara yang didukung Workers. Cek dokumentasinya. Jika belum jelas, catat sebagai open question.
- Checklist rilis: env var (DATABASE_URL, secret auth, kunci Midtrans), migrasi produksi, backup database, dan langkah rollback.
- docs/PRIVACY.md: data pribadi apa saja yang disimpan. Jangan menyimpan KTP atau SIM sebelum ada keputusan tertulis.

10. DI LUAR SCOPE (masuk OPEN_QUESTIONS, jangan dikerjakan)
AI assistant sungguhan, peta (MapPlaceholder tetap placeholder), upload KTP atau SIM, review dan rating, notifikasi WhatsApp atau email, pencairan dana ke vendor, komisi platform, realtime chat via WebSocket, zona waktu selain WIB, deposit, denda keterlambatan, GPS, reset password.

11. DEFINISI SELESAI PER PR
Deskripsi PR wajib memuat:
(a) milestone dan daftar file yang berubah, ringkas
(b) asumsi default yang dipakai, dan yang diubah
(c) open question baru
(d) hasil lint, build, dan test
(e) daftar yang BELUM DIUJI, beserta alasannya
