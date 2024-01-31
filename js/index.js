// Sound
const musicSound = new Audio('music.mp3');

// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
let speed = 13;//Snake Speed
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];//snake starting point
let food = { x: 6, y: 7 };//food starting point

// DOM Elements
const scoreBox = document.getElementById("scoreBox");
const hiscoreBox = document.getElementById("hiscoreBox");
const board = document.getElementById("board");

// Variável hiscoreval declarada no escopo mais amplo
let hiscoreval;

// Função para resetar o jogo
function resetGame() {
    musicSound.pause();
    inputDir = { x: 0, y: 0 }; // A cobra não se move
    alert("Gamessss Overssss...!"); // Game Over
    score = 0; // Score reset
    snakeArr = [{ x: 13, y: 15 }]; // Ponto de início
    musicSound.play();

    // Atualizar a exibição do score após a reinicialização
    updateScore();
}

// Score Update Function
function updateScore() {
    scoreBox.innerHTML = "Score: " + score;
}

// Main Function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

// Collition Function
function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        //collide with snake
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
        // colide with wall
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

// Game Engine Function
function gameEngine() {
    if (isCollide(snakeArr)) {
        resetGame();
    }

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        updateScore();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Initialize the game
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0; // Defina o valor inicial do hiscore aqui
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
}

// Direction
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; // Iniciar o jogo
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});