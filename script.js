document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('dark-toggle');
  const html = document.documentElement; // pakai <html>

  // Load dari localStorage
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark-mode');
  }

  function updateButtonText() {
    if (html.classList.contains('dark-mode')) {
      toggleBtn.textContent = '☀️ Light Mode';
    } else {
      toggleBtn.textContent = '🌙 Dark Mode';
    }
  }

  // Klik tombol
  toggleBtn.addEventListener('click', () => {
    html.classList.toggle('dark-mode');

    // Simpan ke localStorage
    if (html.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }

    updateButtonText();
  });

  updateButtonText(); // set teks tombol saat pertama kali buka
});

// ==============================
// FITUR 2: COUNTER
// ==============================

let count = 0;
let clickCount = 0; // ← Variabel ini penting untuk menghitung klik

const angkaDisplay = document.querySelector('#angka-counter');
const pesanDisplay = document.querySelector('#counter-pesan');
const btnTambah = document.querySelector('#btn-tambah');
const btnKurang = document.querySelector('#btn-kurang');

function updatePesan(n) {
  let teks = '';
  let warna = '';

  if (n === 0) {
    teks = 'Yuk mulai minum air! 💧';
    warna = '#666666';
  } else if (n < 3) {
    teks = 'Masih kurang nih...';
    warna = '#e63939';
  } else if (n < 5) {
    teks = 'Sudah mulai lumayan!';
    warna = '#f4a261';
  } else if (n < 7) {
    teks = 'Bagus! Terus semangat 💪';
    warna = '#f4d03f';
  } else if (n < 8) {
    teks = 'Hampir sampai! Satu lagi 🔥';
    warna = '#9acd32';
  } else {
    teks = 'Keren! Target tercapai hari ini 🎉';
    warna = '#2e7d32';
  }

  pesanDisplay.textContent = teks;
  pesanDisplay.style.color = warna;
}

// Fungsi Konfeti (Step 4)
function launchConfetti() {
  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement('div');
    confetti.textContent = ['🎉', '💧', '🥳', '✨'][Math.floor(Math.random() * 4)];
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-30px';
    confetti.style.fontSize = Math.random() * 25 + 25 + 'px';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    confetti.style.opacity = Math.random() * 0.8 + 0.7;
    document.body.appendChild(confetti);

    const duration = Math.random() * 2500 + 2500;

    confetti.animate(
      [
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        {
          transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 800 - 400}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }
    );

    setTimeout(() => confetti.remove(), duration + 100);
  }
}

// Event Tambah
btnTambah.addEventListener('click', () => {
  count = Math.min(count + 1, 15);
  angkaDisplay.textContent = count;
  updatePesan(count);

  // Animasi meloncat
  angkaDisplay.style.animation = 'none';
  void angkaDisplay.offsetWidth;
  angkaDisplay.style.animation = 'jump 0.4s ease-out';

  // Hitung klik untuk konfeti
  clickCount++;
  if (clickCount >= 10) {
    launchConfetti();
    clickCount = 0; // reset hitungan
  }
});

// Event Kurang
btnKurang.addEventListener('click', () => {
  if (count > 0) {
    count--;
    angkaDisplay.textContent = count;
    updatePesan(count);

    // Animasi meloncat
    angkaDisplay.style.animation = 'none';
    void angkaDisplay.offsetWidth;
    angkaDisplay.style.animation = 'jump 0.4s ease-out';

    // Hitung klik untuk konfeti
    clickCount++;
    if (clickCount >= 10) {
      launchConfetti();
      clickCount = 0;
    }
  }
});

// Inisialisasi awal
updatePesan(count);

// ==============================
// FITUR 3: VALIDASI FORM
// ==============================

// ==================== FORM CONTACT ====================
document.addEventListener('DOMContentLoaded', () => {
  const btnKirim = document.querySelector('#btn-kirim');
  const inputNama = document.querySelector('#input-nama');
  const inputEmail = document.querySelector('#input-email');
  const inputPesan = document.querySelector('#input-pesan');
  const formFeedback = document.querySelector('#form-feedback');

  function tampilkanPesan(teks, tipe) {
    formFeedback.textContent = teks;
    formFeedback.className = `feedback ${tipe}`;
  }

  function isEmailValid(email) {
    const regex = /^[a-z0-9.]+@[a-z]+\.[a-z]{2,}$/i;
    return regex.test(email);
  }

  btnKirim.addEventListener('click', function (e) {
    e.preventDefault(); // cegah refresh halaman

    const nama = inputNama.value.trim();
    const email = inputEmail.value.trim();
    const pesan = inputPesan.value.trim();

    // Reset pesan feedback
    formFeedback.textContent = '';
    formFeedback.className = 'feedback';

    // Validasi 1: Field kosong
    if (nama === '' || email === '' || pesan === '') {
      tampilkanPesan('⚠️ Semua field harus diisi!', 'error');
      return;
    }

    // Validasi 2: Email tidak valid
    if (!isEmailValid(email)) {
      tampilkanPesan('⚠️ Format email tidak valid!\nContoh: nama@email.com', 'error');
      inputEmail.focus();
      return;
    }

    // Semua valid → Success
    tampilkanPesan(`✅ Pesan berhasil dikirim! Terima kasih, ${nama}!`, 'success');

    // Kosongkan form
    inputNama.value = '';
    inputEmail.value = '';
    inputPesan.value = '';

    // Hilangkan pesan setelah 5 detik
    setTimeout(() => {
      formFeedback.textContent = '';
      formFeedback.className = 'feedback';
    }, 5000);
  });
});
