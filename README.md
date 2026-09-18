# Playfair Cipher GUI App

Aplikasi GUI berbasis web untuk melakukan enkripsi dan dekripsi teks menggunakan algoritma Playfair Cipher. Proyek ini dibuat untuk tugas mata kuliah Keamanan Informasi.

## Demo Aplikasi

Aplikasi dapat diakses melalui link berikut:
[Playfair Cipher - Kelompok 1](https://playfair-chiper.vercel.app/)

## Informasi Tugas

- Mata kuliah: Keamanan Informasi
- Kelas / Paralel: K2
- Kelompok: 1
- Nama tugas: Aplikasi Enkripsi dan Dekripsi Playfair Cipher
- Bentuk aplikasi: GUI (Graphical User Interface)
- Input utama: file `.txt` pesan yang akan dienkripsi atau dekripsi
- Output utama: file `.txt` hasil enkripsi atau dekripsi

## Anggota Kelompok

| Nama | NIM |
| :-- | :-- |
| Abdan Taris Hariri | G6401231049 |
| Nadya Shafwah | M0403241007 |
| Safira Ayu Damayanti | M0403241010 |
| Maulana Syarif Hidayatullah | M0403241049 |
| Ziyad Adiyan Kemal | M0403241085 |
| Asty Athetha Loethan | M0403241089 |
| Isyana Ajeng Khairani | M0403241096 |
| Azalia Noverizqy Aqila Pramono | M0403241123 |
| Deswita Diandra | M0403241127 |

## Deskripsi Aplikasi

Playfair Cipher GUI App adalah aplikasi web sederhana yang memungkinkan pengguna memasukkan pesan teks atau mengunggah file `.txt`, memilih mode enkripsi/dekripsi, memasukkan kunci berupa passphrase, lalu melihat hasil proses Playfair Cipher.

Aplikasi ini juga menampilkan visualisasi matriks kunci 5x5 dan langkah pemrosesan bigram, sehingga pengguna dapat melihat bagaimana setiap pasangan huruf diproses oleh algoritma.

## Fitur Utama

- Enkripsi pesan teks menggunakan Playfair Cipher.
- Dekripsi ciphertext menggunakan Playfair Cipher.
- Input teks manual melalui textarea.
- Upload file `.txt`.
- Drag and drop file `.txt`.
- Visualisasi matriks kunci 5x5 secara dinamis berdasarkan key.
- Visualisasi proses bigram per pasangan huruf.
- Highlight animasi pada huruf di matriks saat proses berjalan.
- Statistik proses, seperti panjang input, jumlah bigram, panjang output, dan mode.
- Copy hasil ke clipboard.
- Download hasil sebagai file `.txt`.
- Tampilan GUI modern bertema dark dashboard.

## Algoritma Yang Digunakan

Aplikasi ini menggunakan algoritma Playfair Cipher, yaitu algoritma kriptografi klasik berbasis substitusi digraf. Berbeda dari Caesar Cipher atau Vigenere Cipher yang memproses huruf satu per satu, Playfair Cipher memproses teks dalam pasangan huruf atau bigram.

### Aturan Dasar Playfair Cipher

1. Key atau passphrase dibersihkan dari karakter non-huruf.
2. Huruf diubah menjadi kapital.
3. Huruf `J` digabung dengan `I`, karena matriks Playfair hanya berukuran 5x5 atau 25 kotak.
4. Matriks 5x5 dibuat dari huruf unik pada key, lalu dilengkapi dengan alfabet A-Z tanpa J.
5. Plaintext dibersihkan dari karakter non-huruf.
6. Plaintext dibagi menjadi pasangan huruf.
7. Jika ada pasangan dengan huruf yang sama, disisipkan huruf `X`.
8. Jika jumlah huruf ganjil, ditambahkan huruf `X` di akhir.

### Aturan Enkripsi

- Jika dua huruf berada pada baris yang sama, masing-masing digeser satu kolom ke kanan.
- Jika dua huruf berada pada kolom yang sama, masing-masing digeser satu baris ke bawah.
- Jika dua huruf membentuk persegi panjang, masing-masing huruf diganti dengan huruf pada baris yang sama tetapi kolom milik pasangannya.

### Aturan Dekripsi

- Jika dua huruf berada pada baris yang sama, masing-masing digeser satu kolom ke kiri.
- Jika dua huruf berada pada kolom yang sama, masing-masing digeser satu baris ke atas.
- Jika dua huruf membentuk persegi panjang, aturan pertukarannya sama seperti enkripsi.

## Bahasa dan Teknologi

- HTML
- CSS
- JavaScript

Aplikasi ini tidak membutuhkan framework tambahan dan tidak membutuhkan proses build. Semua file dapat dijalankan langsung melalui browser.

## Struktur Folder

```text
playfair-chiper/
|-- index.html
|-- README.md
|-- css/
|   `-- style.css
|-- js/
|   |-- app.js
|   |-- input.js
|   |-- output.js
|   `-- playfair.js
`-- sample/
    |-- sample.txt
    `-- test_case.txt
```

### Penjelasan File

- `index.html`: struktur utama tampilan aplikasi.
- `css/style.css`: styling tampilan GUI, animasi, layout, dan responsive design.
- `js/playfair.js`: implementasi algoritma Playfair Cipher.
- `js/input.js`: fitur input file dan drag and drop.
- `js/output.js`: visualisasi matriks, bigram, animasi, copy, download, dan statistik.
- `js/app.js`: penghubung event tombol, mode enkripsi/dekripsi, validasi, dan proses aplikasi.
- `sample/`: contoh file teks untuk pengujian.

## Cara Menjalankan Di Lokal

### 1. Clone Repository

```bash
git clone https://github.com/m4ulanaash/playfair-chiper
```

### 2. Masuk Ke Folder Proyek

```bash
cd playfair-chiper
```

### 3. Jalankan Aplikasi

Karena aplikasi ini berbasis HTML, CSS, dan JavaScript murni, aplikasi dapat langsung dijalankan dengan membuka file:

```text
index.html
```

di browser seperti Google Chrome, Microsoft Edge, atau Mozilla Firefox.

Cara paling sederhana:

1. Buka folder proyek.
2. Klik dua kali file `index.html`.
3. Aplikasi akan terbuka di browser.

## Cara Menggunakan Aplikasi

1. Pilih mode `Encrypt` atau `Decrypt`.
2. Masukkan key/passphrase.
3. Masukkan teks secara manual atau upload file `.txt`.
4. Klik tombol `Encrypt Message` atau `Decrypt Message`.
5. Lihat hasil pada bagian `Result`.
6. Perhatikan visualisasi matriks dan langkah bigram.
7. Gunakan tombol `Copy` untuk menyalin hasil.
8. Gunakan tombol `Download .txt` untuk menyimpan hasil ke file teks.

## Contoh

Key:

```text
MONARCHY
```

Plaintext:

```text
HELLO
```

Setelah dibersihkan dan dibagi menjadi bigram:

```text
HE LX LO
```

Output enkripsi:

```text
CFSUPM
```

## Catatan Implementasi

- Huruf `J` otomatis diubah menjadi `I`.
- Karakter selain huruf A-Z diabaikan saat proses enkripsi/dekripsi.
- Huruf `X` digunakan sebagai filler untuk pasangan huruf yang sama atau jumlah huruf ganjil.
- Hasil dekripsi masih dapat mengandung filler `X`, sehingga pengguna dapat menyesuaikan kembali teks akhir sesuai konteks pesan asli.
- Visualisasi bigram menampilkan rule yang digunakan pada setiap pasangan huruf: `row`, `col`, atau `rect`.
