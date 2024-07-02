// 在全局作用域中声明 score 和 level
let score = 0;
let level = 1;
let createdImagesCombinations = [];
let sampleCombination = '';


document.getElementById("level").textContent = "level:"+level;
document.getElementById("score").textContent = "score:"+score;

function start() {
  clearImages();
  createdImagesCombinations = [];
  initGame();
}

function clearImages() {
  // 清除网格中的图片
  document.getElementsByClassName('grid')[0].innerHTML = '';
  // 清除示例图片
  document.getElementsByClassName('sample')[0].innerHTML = '';
}

function initGame() {
  console.log("Game is starting");
  // 假设这里是生成网格图片的逻辑
  const usedCombinations = new Set();
  for (let i = 0; i < 6; i++) {
    createRandomImage(usedCombinations);
  }
  // 生成新的示例图片
  createSampleImage();
}

// Global array to store combinations of created images


function initGame() {
  console.log("Game is starting");

  const usedCombinations = new Set();
  for (let i = 0; i < 6; i++) {
    createRandomImage(usedCombinations);
  }

  // Create sample image from one of the created images
  createSampleImage();
}



function createRandomImage(usedCombinations) {
  let img = document.createElement("img");
  let x, y, combination;
  do {
    x = Math.floor(Math.random() * 8);
    y = Math.floor(Math.random() * 8);
    combination = `${x}_${y}`;
  } while (usedCombinations.has(combination));
  usedCombinations.add(combination);
  createdImagesCombinations.push(combination); // Store the combination
  img.src = `food_assets/tile_${combination}.png`;
  img.classList.add('pics', combination);
  // 添加事件监听器
  img.addEventListener('click', function() {
    checkMatch(this, sampleCombination);
  });
  document.getElementsByClassName('grid')[0].appendChild(img);
}

function createSampleImage() {
  if (createdImagesCombinations.length > 0) {
    const randomIndex = Math.floor(Math.random() * createdImagesCombinations.length);
    const combination = createdImagesCombinations[randomIndex];
    let img = document.createElement("img");
    img.src = `food_assets/tile_${combination}.png`;
    img.classList.add('pics', combination);
  

    document.getElementsByClassName('sample')[0].appendChild(img);
    sampleCombination = combination;
  } else {
    console.error("No images have been created to select a sample from.");
  }
  
}



function checkMatch(clickedImg, sampleCombination) {
  // Assume sampleCombination is the combination of the sample image
  if (clickedImg.classList.contains(sampleCombination)) {
    score += 1; // Increase score for correct match
  } else {
    score -= 1; // Decrease score for incorrect match
  }
  // Update score display
  document.getElementById("score").textContent = "Score: " + score;
  // Clear images and restart game
  clearImages();
  start();
  // Update level display (if level logic exists)
  document.getElementById("level").textContent = "Level: " + level;
  console.log(clickedImg, sampleCombination);
}

function clearImages() {
  document.getElementsByClassName('grid')[0].innerHTML = '';
  document.getElementsByClassName('sample')[0].innerHTML = '';
}

function nextLevel(){}


start();