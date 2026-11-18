
const correctPin = "111126";

let enteredPin = "";
let giftOpened = false;

const pinDisplay = document.getElementById("pinDisplay");
const errorMessage = document.getElementById("errorMessage");

function updatePinDisplay() {
  pinDisplay.textContent =
    enteredPin.padEnd(6, "_");
}

function addPin(number) {
  if (enteredPin.length >= 6) return;

  enteredPin += number;
  updatePinDisplay();
  errorMessage.textContent = "";
}

function clearPin() {
  enteredPin = "";
  updatePinDisplay();
  errorMessage.textContent = "";
}

function checkPin() {
  if (enteredPin === correctPin) {
    enteredPin = "";
    updatePinDisplay();
    errorMessage.textContent = "";
    showPage(3);
  } else {
    errorMessage.textContent = "PIN salah, coba lagi ya! 💗";
    enteredPin = "";
    updatePinDisplay();
  }
}

function showPage(pageNumber) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById("page" + pageNumber)
    .classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  const music = document.getElementById("bgMusic");

  if (music.paused) {
    music.play().catch(() => {});
  }
}

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  const button = document.getElementById("musicButton");

  if (music.paused) {
    music.play().catch(() => {});
    button.textContent = "🔊 Musik";
  } else {
    music.pause();
    button.textContent = "🎵 Musik";
  }
}

/* BUKA HADIAH */

function openGift() {
  if (giftOpened) return;

  giftOpened = true;

  const giftBox = document.getElementById("giftBox");
  const giftButton = document.getElementById("openGiftButton");
  const giftMessage = document.getElementById("giftMessage");
  const giftInstruction = document.getElementById("giftInstruction");

  giftBox.classList.add("opened");
  giftButton.style.display = "none";

  giftInstruction.textContent =
    "Yeay! Hadiahnya terbuka! 🎉";

  createCelebration();

  setTimeout(() => {
    giftMessage.classList.add("show");
  }, 900);
}

/* MEMUNCULKAN BALON DAN BUNGA */

function createCelebration() {
  const celebration = document.getElementById("celebration");
  const giftBox = document.getElementById("giftBox");

  celebration.innerHTML = "";

  const boxPosition = giftBox.getBoundingClientRect();

  // Titik awal efek di bagian tengah kotak hadiah
  const centerX = boxPosition.left + boxPosition.width / 2;
  const startY = boxPosition.top + boxPosition.height / 2;

  const balloonEmojis = ["🎈", "🎈", "🎈", "💜", "🩷"];
  const flowerEmojis = ["🌷", "🌸", "🌼", "💐", "🌺"];

  // Balon
  for (let i = 0; i < 13; i++) {
    const balloon = document.createElement("span");

    balloon.className = "balloon";
    balloon.textContent =
      balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];

    balloon.style.left = (centerX - 18) + "px";
    balloon.style.top = startY + "px";
    balloon.style.setProperty(
      "--spread",
      (Math.random() * 300 - 150) + "px"
    );
    balloon.style.setProperty(
      "--delay",
      (Math.random() * 0.7) + "s"
    );
    balloon.style.setProperty(
      "--duration",
      (4 + Math.random() * 2) + "s"
    );

    celebration.appendChild(balloon);
  }

  // Bunga
  for (let i = 0; i < 16; i++) {
    const flower = document.createElement("span");

    flower.className = "flower";
    flower.textContent =
      flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];

    flower.style.left = (centerX - 15) + "px";
    flower.style.top = startY + "px";
    flower.style.setProperty(
      "--spread",
      (Math.random() * 350 - 175) + "px"
    );
    flower.style.setProperty(
      "--delay",
      (Math.random() * 1.2) + "s"
    );
    flower.style.setProperty(
      "--duration",
      (4 + Math.random() * 3) + "s"
    );

    celebration.appendChild(flower);
  }

  // Bersihkan elemen setelah animasi selesai
  setTimeout(() => {
    celebration.innerHTML = "";
  }, 9000);
}

/* HATI KECIL MELAYANG */

function createFloatingHeart() {
  const heart = document.createElement("div");

  heart.className = "floating-heart";
  heart.textContent = "💗";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 15) + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

setInterval(createFloatingHeart, 900);

/* ULANGI WEBSITE */

function restartWebsite() {
  giftOpened = false;
  enteredPin = "";

  updatePinDisplay();

  document.getElementById("giftBox")
    .classList.remove("opened");

  document.getElementById("openGiftButton")
    .style.display = "inline-block";

  document.getElementById("giftMessage")
    .classList.remove("show");

  document.getElementById("giftInstruction").textContent =
    "Ada hadiah kecil untuk kamu. Coba buka, ya!";

  document.getElementById("celebration").innerHTML = "";

  showPage(1);
}

updatePinDisplay();
