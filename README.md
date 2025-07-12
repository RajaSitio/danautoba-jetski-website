# Proyek Next.js Starter

Ini adalah proyek awal Next.js yang dikonfigurasi dengan Tailwind CSS, ShadCN UI, dan Genkit.

## Memulai

1.  Pastikan Anda memiliki Node.js dan npm (atau yarn) terinstal.
2.  Salin file `.env.example` menjadi `.env` dan isi variabel lingkungan yang diperlukan (misalnya, `GOOGLE_API_KEY` jika menggunakan Genkit dengan Google AI).
3.  Instal dependensi:
    ```bash
    npm install
    # atau
    yarn install
    ```
4.  Jalankan server pengembangan:
    ```bash
    npm run dev
    # atau
    yarn dev
    ```
    Ini akan menjalankan aplikasi Next.js.

5.  Jika Anda menggunakan Genkit, jalankan juga server pengembangan Genkit di terminal terpisah:
    ```bash
    npm run genkit:dev
    ```

Aplikasi akan tersedia di `http://localhost:9002` (atau port yang Anda konfigurasi). Server Genkit biasanya berjalan di port lain (misalnya 3400) untuk development flow.

## Struktur Proyek

-   `src/app`: Berisi rute utama, layout, dan halaman aplikasi menggunakan App Router Next.js.
-   `src/components`:
    -   `ui`: Komponen UI dari ShadCN (jangan diubah manual, gunakan CLI ShadCN).
    -   `common`: Komponen umum yang Anda buat.
    -   `layout`: Komponen untuk tata letak (Header, Footer, dll.).
    -   `sections`: Komponen untuk bagian-bagian spesifik dari halaman.
-   `src/lib`: Utilitas dan logika bersama.
    -   `utils.ts`: Utilitas umum (seperti `cn` dari ShadCN).
    -   `locales.ts`: Untuk internasionalisasi (i18n).
-   `src/hooks`: Custom React hooks.
-   `src/contexts`: React contexts.
-   `src/data`: File data statis untuk aplikasi Anda.
-   `src/ai`:
    -   `flows`: Alur kerja Genkit Anda.
    -   `genkit.ts`: Konfigurasi instance Genkit utama.
    -   `dev.ts`: File untuk menjalankan Genkit development server.
-   `public`: Aset statis.
-   `styles`: File CSS global.

Modifikasi `src/app/page.tsx` untuk mulai membangun halaman utama Anda.
