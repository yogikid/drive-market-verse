# Roles

- **customer**: Customer yang menyewa mobil. Bisa melihat katalog, booking, mengubah profil sendiri, membatalkan booking miliknya, dan chat di percakapannya.
- **admin**: Admin platform. Bisa menyetujui atau menangguhkan vendor, melihat dashboard global, memproses refund manual (dicatat di audit log).
- **vendor**: Pemilik rental. Jika active, bisa CRUD mobil dan supir miliknya, melihat booking, memulai dan menyelesaikan trip, chat, dan laporan. Jika pending/suspended, bisa login tapi tidak bisa membuat mobil/supir/menerima booking.
- **driver**: Supir. Bisa melihat dan mengubah trip yang ditugaskan kepadanya (mulai, selesai), serta melihat riwayat miliknya. Nama dan telepon customer hanya terlihat untuk trip yang ditugaskan kepadanya.
