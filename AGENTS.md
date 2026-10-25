<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Aturan Proyek

**5. ATURAN ANTI-HALUSINASI (WAJIB)**
a. Buka file sebelum menyebutnya. Setiap klaim tentang kode wajib menyebut path file.
b. Jangan memakai API library, framework, atau layanan dari ingatan. Untuk TanStack Start, TanStack Router, better-auth, Drizzle, Midtrans, dan Cloudflare, cek dokumentasi resmi atau kode di node_modules sesuai versi yang terpasang. Kalau tidak bisa dicek, tulis TODO dan berhenti di titik itu.
c. Sebelum menambah dependency, cek versi terbaru dengan `npm view <paket> version` dan tulis alasannya di PR. Jangan upgrade TanStack, React, atau Vite tanpa perintah eksplisit.
d. Jangan menambah fitur di luar spesifikasi ini. Ide tambahan masuk ke docs/OPEN_QUESTIONS.md.
e. Jangan memutuskan hal bisnis baru. Yang tidak ada di spesifikasi masuk ke docs/OPEN_QUESTIONS.md.
f. Jangan tulis "sudah dites", "lulus", atau "berjalan" kalau perintahnya tidak dijalankan. Test yang di-skip dilaporkan sebagai BELUM DIUJI.
g. Kalau kode dan spesifikasi bertentangan: untuk fakta tentang kode, ikuti kode. Untuk keputusan produk, ikuti spesifikasi. Catat konfliknya di docs/OPEN_QUESTIONS.md.
h. Jangan edit `src/routeTree.gen.ts` (auto-generated). Jangan buat folder `src/pages`. Jangan ubah `src/server.ts`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`, atau `src/lib/lovable-error-reporting.ts` tanpa alasan tertulis di PR.
i. Jangan mengubah tampilan visual yang sudah ada kecuali yang diminta. Tambahkan fungsi tanpa merombak layout.

**6. ATURAN GIT (WAJIB)**
- Kerja di branch baru (contoh: docs/m0-spec). Buka PR. Jangan push ke main.
- Jangan force-push, rebase, atau squash commit yang sudah di-push.
- Jangan ubah blok `<!-- LOVABLE:BEGIN -->` sampai `<!-- LOVABLE:END -->` di `AGENTS.md`. Tambahkan bagian baru di bawahnya.
- Jangan commit `.env` atau secret apa pun. Nilai secret hanya lewat environment.
- Setiap PR milestone WAJIB punya baris pertama deskripsi: CHAIN-MILESTONE: Mx (x = milestone yang dikerjakan). Tanpa baris ini, otomatisasi tidak berjalan.
- Satu sesi hanya satu milestone. Setelah PR dibuat, berhenti.
- Lint dijalankan tanpa --fix.
