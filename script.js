const slides = document.querySelectorAll(".carousel-item");
const indicators = document.querySelectorAll(".indicator");
let activeSlide = 0;

// Flag untuk mencegah animasi bertumpuk
let isAnimating = false;

function showSlide(n, direction = "next") {
  // Cek jika sedang ada animasi berjalan
  if (isAnimating) return;
  isAnimating = true;
  // Menghitung index baru dengan memastikan tetap dalam range yang valid
  // Menggunakan operator modulo untuk membuat carousel berputar
  const newIndex = (n + slides.length) % slides.length;

  // Mengambil slide yang sedang aktif dan slide yang akan ditampilkan
  const currentSlide = slides[activeSlide];
  const nextSlide = slides[newIndex];

  // Membersihkan class animasi dari semua slide
  slides.forEach((slide) => slide.classList.remove("prev", "next"));

  // Update status aktif pada indikator
  indicators.forEach((ind, i) =>
    ind.classList.toggle("active", i === newIndex)
  );

  // Menambahkan class sesuai arah animasi
  nextSlide.classList.add(direction);

  // Menunggu sebentar untuk memastikan transisi CSS berjalan
  setTimeout(() => {
    // Menghapus class active dari slide saat ini
    currentSlide.classList.remove("active");

    // Membersihkan class animasi dan mengaktifkan slide baru
    nextSlide.classList.remove("prev", "next");
    nextSlide.classList.add("active");

    // Update index slide aktif
    activeSlide = newIndex;

    // Reset flag animasi
    isAnimating = false;
  }, 50);
}

// Menambahkan event listener untuk setiap indikator
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    // Menentukan arah animasi berdasarkan index yang diklik
    const direction = index > activeSlide ? "next" : "prev";

    // Menampilkan slide yang dipilih
    showSlide(index, direction);

    // Reset interval autoplay
    clearInterval(autoplay);
    autoplay = setInterval(() => showSlide(activeSlide + 1), 5000);
  });
});

// Inisialisasi carousel
// Mengaktifkan slide dan indikator pertama
slides[0].classList.add("active");
indicators[0].classList.add("active");

// Memulai autoplay - slide akan berganti setiap 5 detik
let autoplay = setInterval(() => showSlide(activeSlide + 1), 3000);
