let countdownTimer;
let timeLeft = 10;
let isPlaying = false;
let isSlotActive = false;

const introVideo = document.getElementById('introVideo');
const skipButton = document.getElementById('skipButton');
const drawButton = document.getElementById("drawButton");
const slotMachines = document.querySelectorAll('.slotMachine');
const countdownDisplay = document.getElementById('countdown');

function startCountdown() {
  countdownTimer = setInterval(function() {
    if (timeLeft > 0) {
      timeLeft--;
      countdownDisplay.textContent = `ข้ามโฆษณาในอีก ${timeLeft} วินาที`;
    } else {
      clearInterval(countdownTimer);
      skipButton.style.display = "inline-block";
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(countdownTimer);
}

introVideo.addEventListener('play', function() {
  if (!isPlaying) {
    isPlaying = true;
    startCountdown();
  }
});

introVideo.addEventListener('pause', function() {
  if (isPlaying) {
    isPlaying = false;
    stopCountdown();
    if (isSlotActive) {
      stopSlotMachine();
    }
  }
});

introVideo.addEventListener('ended', function() {
  isPlaying = false;
  stopCountdown();
  if (isSlotActive) {
    stopSlotMachine();
  }
});

skipButton.addEventListener("click", function() {
  introVideo.style.display = "none";
  skipButton.style.display = "none";
  countdown.style.display = "none";
  drawButton.style.display = "inline-block";
  slotMachines.forEach(slot => {
    slot.style.display = "block";
  });

  introVideo.pause();
  timeLeft = 10;
  countdownDisplay.textContent = `เวลาถอยหลัง: ${timeLeft}`;
});

document.getElementById("drawButton").addEventListener("click", function() {
  const drawButton = document.getElementById("drawButton");
  drawButton.style.display = "none";

  resetReels();

  let results = [];

  function getCardResult() {
    const chance = Math.random();

    if (chance < 0.05) {
      return "gold"; // 5%
    } else if (chance < 0.20) {
      return "red"; // 15%
    } else if (chance < 0.50) {
      return "blue"; // 30%
    } else {
      return "green"; // 50%
    }
  }

  for (let i = 0; i < 3; i++) {
    results.push(getCardResult());
  }

  let goldCount = results.filter(card => card === "gold").length;
  while (goldCount > 2) {
    results = [];
    for (let i = 0; i < 3; i++) {
      results.push(getCardResult());
    }
    goldCount = results.filter(card => card === "gold").length;
  }

  isSlotActive = true;
  showResultsSequentially(results);

  setTimeout(() => {
    drawButton.style.display = "inline-block";
    isSlotActive = false;
  }, results.length * 500);
});

function resetReels() {
  const reels = document.querySelectorAll('.reel');
  reels.forEach(reel => {
    reel.innerHTML = '';
  });
}

function showResultsSequentially(results) {
  const reels = document.querySelectorAll('.reel');
  let currentSlot = 0;

  function showSlot(slotIndex) {
    const reel = reels[slotIndex];
    let slotResult = results[slotIndex];

    const card = document.createElement('div');
    card.classList.add('card', slotResult);
    card.textContent = slotResult.charAt(0).toUpperCase() + slotResult.slice(1);

    reel.appendChild(card);
    
    currentSlot++;
    if (currentSlot < results.length) {
      setTimeout(() => showSlot(currentSlot), 500);
    }
  }

  showSlot(currentSlot);
}

function stopSlotMachine() {
  const reels = document.querySelectorAll('.reel');
  reels.forEach(reel => {
    reel.innerHTML = '';
  });
  isSlotActive = false;
  drawButton.style.display = "inline-block";
}

document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
    e.preventDefault();
  }
});

document.addEventListener('mousedown', function(e) {
  if (e.button === 0) {
    e.preventDefault();
  }
});
