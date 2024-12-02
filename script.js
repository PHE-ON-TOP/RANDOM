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
  
    showResultsSequentially(results);
  
    setTimeout(() => {
      drawButton.style.display = "inline-block";
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