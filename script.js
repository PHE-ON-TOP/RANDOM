  let countdownTimer;
  let timeLeft = 3;
  let isPlaying = false;
  let isSlotActive = false;
  let spinResults = [];
  
  const introVideo = document.getElementById('introVideo');
  const skipButton = document.getElementById('skipButton');
  const drawButton = document.getElementById("drawButton");
  const slotMachines = document.querySelectorAll('.slotMachine');
  const countdownDisplay = document.getElementById('countdown');
  
  window.onload = function() {
    const savedResults = JSON.parse(localStorage.getItem('slotResults'));
    if (savedResults) {
      spinResults = savedResults;
      showResultsSequentially(spinResults);
    }

    setInterval(function() {
      location.reload();
    }, 300000);
  };  
  
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
    timeLeft = 3;
    countdownDisplay.textContent = `เวลาถอยหลัง: ${timeLeft}`;
  });
  
  document.getElementById("drawButton").addEventListener("click", function() {
    const drawButton = document.getElementById("drawButton");
    drawButton.style.display = "none";
  
    resetReels();
  
    let results = [];
  
    function getCardResult() {
      const chance = Math.random();
  
      if (chance < 0.01) {
        return "purple"; // 1%
      } else if (chance < 0.06) {
        return "gold"; // 5%
      } else if (chance < 0.21) {
        return "red"; // 15%
      } else if (chance < 0.51) {
        return "blue"; // 30%
      } else {
        return "green"; // 49%
      }   
    }   
  
    for (let i = 0; i < 3; i++) {
      results.push(getCardResult());
    }

    let goldCount = results.filter(card => card === "gold").length;
    let purpleCount = results.filter(card => card === "purple").length;
  
    while (goldCount > 1 || purpleCount > 0) {
      results = [];
      for (let i = 0; i < 3; i++) {
        results.push(getCardResult());
      }
      goldCount = results.filter(card => card === "gold").length;
      purpleCount = results.filter(card => card === "purple").length;
    }
  
    isSlotActive = true;
    spinResults = results;
    localStorage.setItem('slotResults', JSON.stringify(spinResults));
  
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
  
        document.body.style.backgroundColor = getCardBackgroundColor(slotResult);
    
        reel.appendChild(card);
    
        currentSlot++;
        if (currentSlot < results.length) {
          setTimeout(() => showSlot(currentSlot), 500);
        }
      }
    
      showSlot(currentSlot);
    
      const goldCount = results.filter(card => card === "gold").length;
      if (goldCount === 3) {
        setTimeout(() => {
          document.body.style.backgroundColor = 'black';
        }, results.length * 500);
        document.getElementById('drawButton').style.display = 'none';
      } else {
        const lastResult = results[results.length - 1];
        setTimeout(() => {
          document.body.style.backgroundColor = getCardBackgroundColor(lastResult);
        }, results.length * 500);
      }
    }
    
    function getCardBackgroundColor(card) {
      switch (card) {
        case 'red':
          return 'red';
        case 'blue':
          return 'blue';
        case 'green':
          return 'green';
        case 'gold':
          return 'gold';
        case 'purple':
          return 'purple';
        default:
          return '';
      }
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
