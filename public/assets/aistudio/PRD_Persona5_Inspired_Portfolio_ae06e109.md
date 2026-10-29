# PRD.md --- Persona 5-Inspired Interactive Portfolio

**Versi:** 1.0\
**Tanggal:** 29 Oktober 2026\
**Status:** Siap menjadi acuan implementasi\
**Nama proyek:** Persona 5-Inspired Interactive Portfolio\
**Pemilik konten:** Habib Aulia Az Zuhri\
**GitHub:** https://github.com/abiii-rajaiblis\
**Instagram:** @abib_bibib\
**Email:** abibaulia26@gmail.com

> Dokumen ini mendefinisikan portofolio personal dengan bahasa visual
> yang terinspirasi oleh presentasi grafis Persona 5: merah-hitam-putih,
> komposisi miring, tipografi tebal, kolase, cut-out, transisi dinamis,
> dan micro-interaction. Gunakan aset yang memang disediakan atau berhak
> digunakan oleh pemilik proyek. Jangan mengambil atau mendistribusikan
> ulang aset game berhak cipta tanpa izin; bila aset resmi tidak
> tersedia atau tidak berlisensi, buat aset orisinal yang menyampaikan
> nuansa serupa.

------------------------------------------------------------------------

## 1. Ringkasan Produk

Website portofolio interaktif yang memperkenalkan pemilik melalui
pengalaman visual yang dramatis dan responsif. Situs bukan sekadar
halaman CV dengan tema merah, tetapi pengalaman eksploratif dengan
navigasi yang terasa seperti antarmuka game: teks besar, bidang
geometris, elemen kolase, panel yang masuk dengan gerakan cepat,
sparkle/partikel, dan pesan interaktif saat elemen disentuh atau
diarahkan pointer.

Prioritas utama adalah **kesetiaan pada bahasa visual referensi**,
khususnya kualitas motion dan detail grafis, sambil tetap menjaga
keterbacaan, aksesibilitas, performa, dan kemudahan pemeliharaan.

## 2. Tujuan dan Kriteria Keberhasilan

### Tujuan

1.  Menampilkan identitas, kemampuan, pengalaman, dan proyek dengan gaya
    editorial yang berani.
2.  Menciptakan interaksi yang konsisten dari hero hingga detail proyek.
3.  Memakai seluruh aset referensi yang disediakan, setelah
    inventarisasi dan pemetaan fungsi.
4.  Memberikan pengalaman yang baik di desktop, tablet, dan ponsel
    Android.
5.  Memastikan animasi halus tanpa mengorbankan performa atau
    aksesibilitas.

### Kriteria keberhasilan

-   Semua tautan navigasi dan CTA berfungsi.
-   Seluruh gambar/aset lokal termuat tanpa error dan memiliki fallback.
-   Semua bagian utama responsif pada lebar 360 px hingga desktop.
-   Animasi utama terasa konsisten; tidak ada elemen bergerak secara
    acak tanpa tujuan.
-   Mode reduced-motion tersedia dan menghormati preferensi perangkat.
-   Tidak ada overflow horizontal yang tidak disengaja pada mobile.
-   Console bersih dari error kritis dan aset 404.
-   Pengguna dapat mencapai bagian About, Skills, Projects, dan Contact
    tanpa kebingungan.

## 3. Target Pengguna

-   Recruiter, calon kolaborator, klien, dan pengunjung yang ingin
    memahami profil serta proyek pemilik.
-   Pengguna desktop yang mengharapkan pengalaman visual penuh.
-   Pengguna mobile yang membutuhkan navigasi sederhana, teks terbaca,
    dan interaksi berbasis sentuhan.

## 4. Arah Visual dan Design Principles

### 4.1 Bahasa visual

-   **Palet utama:** merah crimson, hitam pekat, putih/off-white.
-   **Warna pendukung:** abu-abu gelap dan merah lebih terang untuk
    hover/focus; gunakan warna lain hanya bila dibutuhkan oleh isi
    proyek.
-   **Kontras:** tinggi, blok warna tegas, bidang miring, outline kuat,
    potongan geometris, layering seperti kolase.
-   **Komposisi:** asimetris dan dinamis, tetapi grid dan hierarki
    konten tetap jelas.
-   **Tekstur:** grain/halftone atau pola titik yang sangat ringan jika
    aset tersedia; jangan menambah noise berlebihan.
-   **Bentuk:** diagonal, polygon, strip, sticker/cut-out, panel seperti
    komik, garis gerak, dan label editorial.
-   **Tipografi:** gunakan font display bold/condensed untuk heading dan
    sans-serif yang sangat terbaca untuk isi. Font referensi harus lokal
    atau dimuat dengan lisensi yang sesuai. Jangan mengandalkan font
    sistem sebagai hasil akhir.

### 4.2 Token desain awal

Nilai dapat disesuaikan setelah audit aset dan pencocokan visual.

``` css
:root {
  --color-red: #e60012;
  --color-red-bright: #ff1b2d;
  --color-black: #080808;
  --color-ink: #171717;
  --color-white: #f7f5f2;
  --color-muted: #b9b9b9;

  --font-display: "Anton", "Arial Narrow", sans-serif;
  --font-body: "Inter", Arial, sans-serif;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;

  --ease-snap: cubic-bezier(.2, .8, .2, 1);
  --duration-fast: 160ms;
  --duration-base: 320ms;
  --duration-scene: 650ms;
}
```

Gunakan token CSS terpusat; hindari menulis nilai warna dan timing
berulang-ulang di tiap komponen.

### 4.3 Prinsip kemiripan

Targetnya adalah **meniru prinsip desain dan kualitas gerak**, bukan
menyalin halaman atau aset berhak cipta secara mentah. Jika pemilik
menyediakan aset yang memang boleh digunakan, gunakan aset tersebut
sebagaimana dimaksud. Jika tidak, buat elemen orisinal yang tetap sesuai
dengan palet, bentuk, ritme, dan mood visual.

------------------------------------------------------------------------

## 5. Struktur Informasi dan Halaman

Situs dapat berupa one-page portfolio dengan transisi antar-section yang
terasa seperti pergantian scene. URL anchor tetap harus berfungsi untuk
akses langsung.

### 5.1 Intro / Loading

-   Intro singkat dengan logo/monogram pemilik atau wordmark orisinal.
-   Animasi reveal berupa strip, mask, atau potongan diagonal.
-   Progress hanya ditampilkan bila proses loading benar-benar nyata;
    jangan membuat loading palsu yang menunda akses.
-   Tombol skip atau transisi otomatis singkat.
-   Setelah intro, masuk ke Hero.

### 5.2 Hero

-   Headline besar: **HABIB AULIA AZ ZUHRI**.
-   Role line: **Developer • Designer • Creative Technologist** (dapat
    diedit).
-   Komposisi teks bertumpuk dengan sudut/rotasi terkontrol.
-   Foto atau portrait utama sebagai cut-out, bila aset foto disediakan.
-   Background merah-hitam dengan bidang diagonal, sparkle, partikel,
    dan garis gerak.
-   CTA: **View Projects** dan **Contact Me**.
-   Hint scroll yang jelas, bukan satu-satunya cara navigasi.

### 5.3 About

-   Intro singkat yang dapat diedit melalui file data.
-   Portrait/visual sekunder, stiker, label, angka atau tag editorial.
-   Reveal teks bertahap ketika section masuk viewport.
-   Hover/tap pada kata atau label tertentu dapat menampilkan microcopy
    singkat.

### 5.4 Skills

-   Kategori skill: Frontend, Backend, UI/UX, Tools, AI/Automation (isi
    dapat diubah).
-   Bentuk chip, poster, atau panel miring, bukan daftar default tanpa
    karakter.
-   Hover/focus memberi perubahan outline, pergeseran ringan, atau label
    detail.
-   Hindari progress bar persentase yang tidak punya dasar terukur.

### 5.5 Projects

-   Grid atau layout editorial asimetris.
-   Tiap kartu menampilkan cover, judul, kategori, deskripsi singkat,
    tech stack, serta link demo/repository jika tersedia.
-   Hover desktop: gambar bergerak/zoom sangat ringan, overlay diagonal
    atau label muncul.
-   Tap mobile: detail dapat dibuka lewat tombol atau modal; jangan
    bergantung pada hover.
-   Project yang disorot:
    -   Desa Senja Pixel
    -   Home Care AI
    -   Website Pembelajaran Desain Grafis / DGI Academy
    -   Proyek lain yang akan ditambahkan dari data proyek.
-   Data proyek disimpan terpisah dari komponen UI agar mudah
    diperbarui.

### 5.6 Experience / Timeline (opsional)

-   Timeline ringkas untuk pengalaman, pendidikan, atau milestone.
-   Gunakan angka besar, garis gerak, dan panel editorial.
-   Section boleh disembunyikan bila data belum tersedia; jangan mengisi
    dengan fakta rekaan.

### 5.7 Contact

-   Ajakan singkat dan jelas.
-   Email: `abibaulia26@gmail.com`
-   GitHub: `https://github.com/abiii-rajaiblis`
-   Instagram: `@abib_bibib` (tambahkan URL akun yang benar jika
    tersedia).
-   Tombol salin email dengan feedback yang dapat diakses.
-   Tautan eksternal membuka dengan perilaku aman.
-   Jangan membuat formulir yang seolah mengirim pesan jika backend
    belum ada.

### 5.8 Footer

-   Copyright personal yang dapat diubah.
-   Link kembali ke atas.
-   Elemen dekoratif kecil dengan animasi yang tidak mengganggu.

------------------------------------------------------------------------

## 6. Sistem Aset dan Manajemen File

### 6.1 Inventarisasi sebelum implementasi

Sebelum mengubah UI: 1. Telusuri seluruh folder proyek dan identifikasi
aset gambar, SVG, font, video, audio, dan kode animasi yang tersedia. 2.
Catat nama file, format, dimensi, transparansi, ukuran file, dan fungsi
visual yang diperkirakan. 3. Buat `docs/ASSET_MANIFEST.md` berisi daftar
aset dan lokasi penggunaannya. 4. Jangan menghapus, mengganti nama, atau
mengompresi aset sumber tanpa persetujuan. 5. Identifikasi duplikat dan
file rusak, tetapi laporkan dahulu sebelum menghapus. 6. Jika gambar
referensi berasal dari screenshot, gunakan sebagai panduan visual;
jangan otomatis memotong atau memublikasikan ulang artwork berhak cipta.

### 6.2 Struktur folder yang disarankan

``` text
public/
  assets/
    images/
      portraits/
      projects/
      backgrounds/
      textures/
    icons/
    fonts/
    motion/
src/
  components/
  sections/
  animations/
  data/
docs/
  PRD.md
  ASSET_MANIFEST.md
```

Sesuaikan dengan struktur repositori yang sudah ada. Jangan membuat
struktur baru yang menduplikasi folder yang sudah berjalan.

### 6.3 Aturan penggunaan aset

-   Utamakan aset yang diberikan pemilik proyek dan memiliki hak
    penggunaan yang jelas.
-   Gunakan PNG transparan untuk cut-out; SVG untuk ikon atau shape
    sederhana; WebP/AVIF untuk gambar besar bila build mendukung.
-   Hindari menampilkan gambar beresolusi rendah dengan cara memperbesar
    secara ekstrem.
-   Tetapkan `width`, `height` atau `aspect-ratio` agar layout tidak
    bergeser ketika gambar dimuat.
-   Beri alt text yang deskriptif untuk gambar informatif; gunakan alt
    kosong untuk dekorasi.
-   Siapkan fallback visual jika file gagal dimuat.
-   Font lokal harus memiliki lisensi yang sesuai dan fallback yang
    baik.

------------------------------------------------------------------------

## 7. Motion Design dan Interaksi

Motion adalah bagian inti produk dan tidak boleh dianggap sebagai
pemolesan terakhir.

### 7.1 Intro dan transisi scene

-   Gunakan reveal melalui panel diagonal, masking, clip-path, atau
    transform.
-   Urutan animasi: background/panel, headline, visual utama, lalu CTA.
-   Durasi singkat dan ritmis; hindari animasi panjang yang menghambat
    akses konten.
-   Transisi section konsisten, tetapi tidak harus identik di semua
    bagian.

### 7.2 Sparkle / star particles

-   Implementasikan lapisan sparkle dengan ukuran, opacity, rotasi, dan
    durasi yang bervariasi.
-   Sebagian sparkle berdenyut atau menyala singkat; sebagian bergerak
    sedikit atau muncul lalu menghilang.
-   Hindari titik bintang yang bergerak seragam atau terlihat seperti
    confetti generik.
-   Gunakan SVG/CSS untuk sparkle yang sederhana; gunakan Canvas hanya
    jika jumlah partikel benar-benar memerlukannya.
-   Batasi jumlah partikel berdasarkan ukuran viewport dan kemampuan
    perangkat.
-   Partikel dekoratif tidak boleh menangkap pointer atau menutupi teks.
-   Gerakan acak harus dibatasi dan dikendalikan agar tidak membuat
    layout berubah.

### 7.3 Teks bergerak dan triggered text

-   Tambahkan label editorial yang bergerak di sekitar visual utama,
    dengan arah dan kecepatan berbeda.
-   Ketika pointer mendekat atau pengguna menyentuh elemen tertentu,
    tampilkan teks kecil, label, atau sticker yang terhubung dengan
    elemen tersebut.
-   Gunakan trigger yang terdefinisi: `pointerenter`, `focus`, `click`,
    atau `tap`; jangan memakai satu efek yang sama pada semua elemen.
-   Teks yang muncul harus memiliki posisi aman, kontras cukup, tidak
    terpotong viewport, dan tidak menutupi CTA.
-   Pada mobile, gunakan tap/click atau tampilkan label secara permanen;
    jangan mengandalkan hover.
-   Tambahkan `aria-label`/teks alternatif jika interaksi mengandung
    informasi penting.
-   Animasi teks harus memakai transform/opacity bila memungkinkan,
    bukan mengubah layout setiap frame.

### 7.4 Hover, focus, dan tap

-   Hover: pergeseran 2D ringan, perubahan warna, outline atau reveal
    mask.
-   Focus keyboard: indikator yang jelas dan konsisten.
-   Tap: respons instan, tidak menunggu animasi panjang.
-   Jangan membuat semua elemen bergerak bersamaan; gerakan harus punya
    hierarki dan ritme.

### 7.5 Scroll reveal

-   Gunakan `IntersectionObserver` atau mekanisme setara.
-   Jalankan animasi sekali per section jika tidak ada alasan untuk
    mengulanginya.
-   Jangan mengunci scroll pengguna.
-   Hindari scroll-jacking dan smooth scrolling yang memaksa.
-   Pastikan konten tetap terlihat jika JavaScript/animasi gagal.

### 7.6 Reduced motion

-   Hormati `prefers-reduced-motion: reduce`.
-   Kurangi atau matikan partikel, parallax, gerakan loop, dan transisi
    besar.
-   Informasi penting tidak boleh bergantung pada animasi.

------------------------------------------------------------------------

## 8. Teknologi dan Arsitektur

**Prinsip:** audit stack yang sudah ada terlebih dahulu dan pertahankan
framework, package manager, routing, dan konvensi proyek bila masih
layak. Jangan mengganti stack hanya demi preferensi pribadi.

Jika proyek baru, pilihan awal: - React + Vite atau Next.js, sesuai
kebutuhan deployment. - TypeScript bila sudah digunakan atau tim siap
mengelolanya. - CSS Modules, Tailwind, atau sistem styling proyek yang
ada; jangan mencampur beberapa pendekatan tanpa alasan. - Framer Motion
atau CSS animations untuk transisi komponen, jika cocok dengan stack
yang ada. - CSS/SVG untuk sparkle ringan; Canvas hanya jika profiling
menunjukkan kebutuhan. - Data profil dan proyek di file terpisah,
misalnya `src/data/portfolio.ts`.

### Batas arsitektur

-   Komponen dipisah berdasarkan tanggung jawab: `IntroTransition`,
    `HeroSection`, `SparkleField`, `InteractiveLabel`, `ProjectCard`,
    `ProjectsSection`, `ContactSection`, dan `Navigation`.
-   Animasi tidak boleh mengandung logika bisnis.
-   Jangan menambah dependensi besar jika CSS native sudah cukup.
-   Hindari manipulasi DOM langsung yang bertentangan dengan framework.
-   Pastikan cleanup untuk event listener, observer, dan animation
    frame.
-   Jangan menaruh secret/API key di frontend.

------------------------------------------------------------------------

## 9. Responsivitas

### Desktop

-   Komposisi visual luas, headline oversized, layering dan dekorasi
    lebih kaya.
-   Hover dan pointer interactions aktif.

### Tablet

-   Pertahankan layout editorial tetapi kurangi overlap dan jumlah
    partikel.
-   Hindari teks heading terpotong.

### Mobile

-   Prioritaskan keterbacaan, tap targets, dan alur vertikal.
-   Ubah komposisi diagonal menjadi stack yang tetap dinamis.
-   Nonaktifkan parallax yang berat dan kurangi partikel.
-   Semua interaksi hover harus punya alternatif tap/focus.
-   Target tap ideal sekitar 44 × 44 CSS px.
-   Uji lebar 360, 375, 390, 412 px serta landscape.

------------------------------------------------------------------------

## 10. Aksesibilitas

-   Kontras teks memadai untuk ukuran dan ketebalan font.
-   Navigasi dapat digunakan dengan keyboard.
-   Semua kontrol memiliki nama aksesibel.
-   Jangan mengomunikasikan status hanya melalui warna.
-   Hormati reduced motion.
-   Hindari flash cepat dan animasi berkedip yang mengganggu.
-   Modal, jika digunakan, mengelola fokus dan dapat ditutup dengan
    Escape.
-   Pastikan urutan heading logis.
-   Jangan menonaktifkan zoom browser.

------------------------------------------------------------------------

## 11. Performa dan Kualitas

-   Optimalkan gambar tanpa mengurangi kualitas visual secara
    berlebihan.
-   Lazy-load gambar di bawah fold.
-   Hindari animasi `top/left/width/height` yang terus-menerus; utamakan
    transform dan opacity.
-   Gunakan `requestAnimationFrame` hanya saat diperlukan dan hentikan
    ketika tab/section tidak aktif.
-   Batasi jumlah partikel pada perangkat low-end.
-   Hindari layout shift saat font/gambar dimuat.
-   Pastikan tidak ada dependency yang diinstal berulang tanpa memeriksa
    lockfile.
-   Jangan menyalin folder `node_modules` sebagai solusi permanen lintas
    sistem; gunakan package manager proyek jika perlu instalasi yang
    bersih.

------------------------------------------------------------------------

## 12. Konten Awal

Gunakan informasi ini sebagai data awal yang mudah diedit: - Nama: Habib
Aulia Az Zuhri - Peran: Developer / Designer / Creative Technologist -
GitHub: https://github.com/abiii-rajaiblis - Instagram handle:
@abib_bibib - Email: abibaulia26@gmail.com - Proyek unggulan: Home Care
AI, Desa Senja Pixel, DGI Academy / website pembelajaran desain grafis.

Jangan mengarang tanggal, gelar, klien, metrik, pengalaman kerja, atau
hasil proyek. Tandai konten yang belum lengkap sebagai TODO di data,
bukan ditampilkan sebagai fakta.

------------------------------------------------------------------------

## 13. Acceptance Criteria / Checklist

### Visual

-   [ ] Palet crimson, hitam, dan putih konsisten.
-   [ ] Heading menggunakan display font yang sesuai dan body tetap
    terbaca.
-   [ ] Komposisi diagonal, cut-out, panel, dan kolase tampak disengaja.
-   [ ] Aset yang disediakan sudah diinventarisasi dan dipetakan.
-   [ ] Tidak ada gambar placeholder yang tertinggal.

### Motion

-   [ ] Intro/transisi memiliki timing dan urutan yang jelas.
-   [ ] Sparkle tampak seperti aksen grafis, bukan confetti generik.
-   [ ] Teks bergerak memiliki ritme dan tidak mengganggu konten.
-   [ ] Triggered text berfungsi dengan pointer, keyboard, dan tap
    sesuai konteks.
-   [ ] Animasi tidak membuat layout bergeser atau memotong konten.
-   [ ] Reduced-motion berjalan dengan benar.

### Fungsional

-   [ ] Semua navigasi, CTA, repository, dan tautan kontak benar.
-   [ ] Salin email menampilkan feedback.
-   [ ] Project cards dapat diakses tanpa hover.
-   [ ] Tidak ada error console kritis atau broken asset.

### Mobile dan aksesibilitas

-   [ ] Tidak ada horizontal overflow tak disengaja.
-   [ ] Tap targets nyaman dan interaksi tidak bergantung pada hover.
-   [ ] Keyboard focus terlihat.
-   [ ] Teks dan kontrol tetap terbaca pada layar kecil.
-   [ ] Preferensi reduced motion dihormati.

### Implementasi

-   [ ] Stack yang ada diaudit dan dipertahankan jika layak.
-   [ ] `ASSET_MANIFEST.md` dibuat.
-   [ ] Konten profil/proyek dipisahkan dari komponen.
-   [ ] Build dan pemeriksaan dasar berhasil.

------------------------------------------------------------------------

## 14. Tahapan Implementasi

1.  **Audit** --- periksa framework, package scripts, struktur folder,
    aset, dan status Git. Jangan mengubah kode dulu sebelum memahami
    proyek.
2.  **Asset mapping** --- buat manifest, kelompokkan aset berdasarkan
    section, dan tandai aset yang tidak jelas hak penggunaannya.
3.  **Design system** --- buat token warna, font, spacing, bentuk
    diagonal, shadow, dan timing.
4.  **Layout statis** --- bangun semua section dan responsivitas tanpa
    motion kompleks.
5.  **Motion foundation** --- implementasikan intro, section reveal,
    hover/focus/tap, dan reduced-motion.
6.  **Sparkle & triggered text** --- buat sebagai sistem terpisah dengan
    konfigurasi jumlah/kecepatan berdasarkan breakpoint.
7.  **Content integration** --- masukkan portrait dan proyek dari
    aset/data yang tersedia.
8.  **QA** --- uji viewport, keyboard, touch, link, reduced motion,
    console, dan performa.
9.  **Polishing** --- bandingkan dengan referensi screenshot
    berdampingan; perbaiki detail terbesar lebih dulu.
10. **Handover** --- rangkum file yang berubah, fitur yang selesai, hal
    yang belum bisa diselesaikan, dan perintah menjalankan proyek.

## 15. Risiko dan Mitigasi

  -----------------------------------------------------------------------
  Risiko                              Mitigasi
  ----------------------------------- -----------------------------------
  Terlihat seperti template merah     Prioritaskan komposisi, typography,
  biasa                               mask, motion timing, dan interaksi
                                      spesifik.

  Aset referensi tidak lengkap        Inventarisasi dulu; gunakan
                                      fallback orisinal dan
                                      dokumentasikan aset yang
                                      dibutuhkan.

  Motion berat pada HP                Batasi partikel, matikan efek
                                      tertentu pada mobile, ukur
                                      performa.

  Teks dekoratif mengganggu           Jaga kontras, hindari overlap,
  aksesibilitas                       dukung keyboard/tap dan reduced
                                      motion.

  Hak cipta aset                      Gunakan aset milik
                                      sendiri/berlisensi atau buat
                                      alternatif orisinal.

  Perubahan merusak proyek lama       Audit stack, gunakan perubahan
                                      bertahap, dan jangan menghapus file
                                      yang belum dipahami.
  -----------------------------------------------------------------------

## 16. Referensi

-   Situs resmi Persona 5: https://persona5.jp/
-   Situs resmi Atlus Persona 5: https://atlus.com/games/persona5/
-   Referensi analisis desain UI Persona 5:
    https://personacentral.com/persona-5-interview-ui-design-sound-music/

Referensi digunakan untuk mempelajari bahasa visual dan prinsip desain.
Website portofolio tetap harus mempertahankan identitas personal
pemilik.

------------------------------------------------------------------------

# Prompt Implementasi untuk AI Coding Agent

Salin prompt berikut ke AI coding agent setelah membuka repositori
portofolio yang ingin diperbaiki. Lampirkan juga screenshot referensi
dan seluruh aset yang memang ingin digunakan.

## PROMPT

Kamu bertindak sebagai **Senior Frontend Engineer, Motion Designer, dan
UI/UX Engineer**. Tugasmu adalah mengimplementasikan ulang dan memoles
website portofolio personal yang sudah ada agar memiliki kualitas visual
dan motion design yang sangat kuat, terinspirasi oleh presentasi grafis
Persona 5.

Jadikan `PRD.md` ini sebagai sumber kebenaran utama. Jangan hanya
memberikan tutorial atau potongan kode: periksa proyek, lakukan
perubahan langsung pada file yang relevan, jalankan pemeriksaan yang
tersedia, dan laporkan hasilnya secara jujur.

### Tahap 1 --- Audit sebelum coding

1.  Periksa struktur folder, `package.json`, lockfile, framework,
    routing, komponen, CSS, dan semua aset yang tersedia.
2.  Jangan mengganti framework atau menghapus dependensi sebelum ada
    alasan teknis yang jelas.
3.  Inventarisasi gambar, SVG, font, video, tekstur, dan animasi yang
    tersedia.
4.  Buat atau perbarui `docs/ASSET_MANIFEST.md` dengan nama aset,
    kegunaan, dan section tujuan.
5.  Periksa screenshot referensi yang dilampirkan. Bandingkan layout,
    ukuran typography, bentuk panel, layering, gerak, sparkle, dan
    interaksi.
6.  Jangan mengarang aset yang tidak ada. Jika aset kurang, gunakan
    placeholder yang jelas atau buat bentuk dekoratif orisinal.

### Tahap 2 --- Bangun design system

1.  Buat token warna crimson-red, black, white/off-white, typography,
    spacing, clipping, outline, dan motion timing dalam satu sistem.
2.  Gunakan font display tebal/condensed untuk judul dan font sans-serif
    yang terbaca untuk isi. Pastikan font tersedia dan berlisensi
    sesuai.
3.  Terapkan komposisi asimetris, potongan diagonal, panel miring,
    kolase, label editorial, outline, dan layering dengan konsisten.
4.  Jangan puas dengan mengganti warna saja. Visual harus memiliki
    hierarki, ritme, proporsi, dan motion yang dirancang.

### Tahap 3 --- Implementasikan section portofolio

Bangun atau perbaiki: - Intro/loading singkat yang tidak menahan
pengguna secara tidak perlu. - Hero dengan nama **Habib Aulia Az
Zuhri**, peran yang dapat diedit, visual portrait jika tersedia, CTA,
panel grafis, sparkle, dan teks interaktif. - About. - Skills. -
Projects dengan kartu editorial dan detail proyek. - Experience/timeline
hanya jika data tersedia. - Contact dengan GitHub
`https://github.com/abiii-rajaiblis`, Instagram `@abib_bibib`, dan email
`abibaulia26@gmail.com`. - Footer.

Pisahkan konten proyek dan profil ke file data yang mudah diperbarui.
Jangan mengarang pencapaian, angka, tanggal, atau informasi pengalaman
yang tidak diberikan.

### Tahap 4 --- Motion design berkualitas tinggi

Ini bagian yang sangat penting. Motion harus dirancang secara spesifik
dan konsisten, bukan sekadar menambahkan `transition: all`.

**A. Page/section transition** - Gunakan reveal melalui panel diagonal,
clip-path, masking, translate, dan opacity. - Atur urutan masuk:
background/panel, heading, visual, lalu CTA. - Gunakan timing yang
tegas, responsif, dan konsisten. - Hindari animasi yang terlalu lama
atau memaksa scroll.

**B. Sparkle / star field** - Bangun sistem sparkle yang bervariasi
dalam ukuran, opacity, rotasi, durasi, jeda, dan posisi. - Kombinasikan
twinkle singkat dengan pergerakan kecil dan kemunculan yang bertahap. -
Buat bentuk bintang dengan SVG/CSS atau gunakan aset lokal yang
sesuai. - Hindari tampilan partikel generik seperti salju atau
confetti. - Jangan membuat semua bintang berkedip serentak. Gunakan
variasi timing yang terkontrol. - Batasi jumlah sparkle berdasarkan
breakpoint dan performa perangkat. - Jangan menutupi teks, CTA, atau
area interaksi.

**C. Moving text** - Tambahkan label atau teks editorial yang bergerak
dengan arah, kecepatan, dan rotasi yang bervariasi. - Gerakan harus
mendukung komposisi, bukan membuat seluruh layar terasa berisik. -
Pastikan tidak ada clipping teks penting pada viewport sempit.

**D. Triggered text saat disentuh/di-hover** - Ketika pointer masuk,
elemen difokuskan dengan keyboard, atau elemen disentuh, tampilkan
label/sticker/microcopy yang terkait dengan elemen tersebut. -
Implementasikan trigger sesuai konteks: pointer enter, focus, click,
atau tap. - Teks harus muncul dekat elemen pemicu tetapi tidak keluar
viewport, menutupi CTA, atau mengganggu pembacaan. - Untuk mobile,
sediakan tap/click atau state yang selalu terlihat. Jangan mengandalkan
hover. - Beri respons yang cepat, jelas, dan dapat diprediksi. -
Pastikan semua listener dan animation frame dibersihkan dengan benar.

**E. Hover dan focus** - Gunakan perpindahan kecil, perubahan outline,
mask reveal, atau transform yang punya tujuan. - Sediakan focus-visible
yang jelas. - Jangan memakai `transition: all`; tentukan properti yang
benar-benar dianimasikan.

### Tahap 5 --- Integrasi aset

1.  Gunakan aset lokal yang disediakan pemilik setelah memeriksa nama,
    dimensi, transparansi, dan konteksnya.
2.  Gunakan aset portrait dan cover proyek pada posisi yang tepat, bukan
    sebagai dekorasi acak.
3.  Jangan menghapus, menimpa, atau mengganti nama aset asli tanpa
    alasan dan tanpa melaporkannya.
4.  Jika aset resmi Persona 5 tidak tersedia atau tidak berizin, buat
    elemen visual orisinal yang terinspirasi oleh prinsip desainnya;
    jangan mengambil file dari sumber tidak jelas.
5.  Tambahkan fallback untuk gambar yang gagal dimuat, alt text, serta
    dimensi gambar untuk mencegah layout shift.

### Tahap 6 --- Responsivitas dan aksesibilitas

-   Uji lebar 360, 375, 390, 412 px, tablet, dan desktop.
-   Pastikan tidak ada horizontal overflow yang tidak disengaja.
-   Sesuaikan komposisi diagonal, heading, portrait, dan partikel untuk
    mobile.
-   Targetkan tap area nyaman, sekitar 44 × 44 CSS px.
-   Dukung keyboard dan `prefers-reduced-motion`.
-   Dalam reduced-motion, kurangi atau matikan partikel, parallax, dan
    transisi besar tanpa menghilangkan informasi.
-   Jangan mengunci scroll atau menonaktifkan zoom.

### Tahap 7 --- Performa

-   Prioritaskan `transform` dan `opacity` untuk animasi.
-   Gunakan CSS/SVG untuk efek ringan; gunakan Canvas hanya bila memang
    diperlukan.
-   Kurangi jumlah partikel pada perangkat low-end.
-   Lazy-load gambar di bawah fold.
-   Gunakan IntersectionObserver untuk reveal yang sesuai dan bersihkan
    observer ketika komponen tidak lagi digunakan.
-   Hindari dependency baru jika fitur dapat dibuat dengan teknologi
    yang sudah ada.

### Tahap 8 --- QA dan verifikasi

1.  Jalankan perintah lint, test, dan build yang memang tersedia di
    proyek.
2.  Periksa console error, broken image, link, overflow, fokus keyboard,
    dan interaksi mobile.
3.  Pastikan semua CTA dan link kontak benar-benar berfungsi.
4.  Periksa reduced-motion.
5.  Bandingkan hasil dengan screenshot referensi dan lakukan polishing
    berdasarkan perbedaan visual terbesar.
6.  Jangan mengklaim sudah menjalankan atau menguji sesuatu jika
    lingkungan tidak memungkinkan.

### Definition of Done

Pekerjaan dianggap selesai ketika: - Semua section utama terimplementasi
dan responsif. - Aset yang tersedia sudah dipetakan dan digunakan dengan
benar. - Sparkle tidak tampak generik; ada variasi bentuk, timing, dan
intensitas. - Moving text dan triggered text bekerja sesuai pointer,
keyboard, dan sentuhan. - Intro dan transisi section memiliki timing
yang konsisten. - Konten proyek mudah diedit dari data terpisah. -
Reduced-motion dan aksesibilitas dasar tersedia. - Build/pemeriksaan
yang tersedia berhasil atau setiap kegagalannya dijelaskan. - Tidak ada
placeholder yang tidak ditandai, link rusak yang diketahui, atau error
kritis yang dibiarkan tanpa laporan.

### Aturan kerja

-   Mulai dengan audit, bukan langsung menulis ulang seluruh proyek.
-   Kerjakan secara bertahap dan jaga fitur yang sudah berjalan.
-   Jangan membuat ulang seluruh website dengan template generik.
-   Jangan menghapus kode yang belum dipahami.
-   Setelah selesai, berikan ringkasan: file yang diubah, fitur yang
    diterapkan, hasil pemeriksaan, masalah tersisa, dan cara menjalankan
    proyek.

Mulai sekarang dari **Tahap 1 --- Audit repositori dan aset**, lalu
lanjutkan ke implementasi sampai seluruh kriteria PRD terpenuhi.
