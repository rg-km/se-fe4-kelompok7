const CELL_SIZE = 20;
const CANVAS_SIZE = 400;

//made faster
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;

// Get Element Life
let lifeCanvas = document.getElementById('life_icon');
let lifeHtml = document.querySelector('#life-child');
let lifeAppleNode = document.querySelectorAll(".img-apple");
let lifeEathMax = document.querySelector(".love-number");
let lengthHealth = [];
let eatHealth = 0;

// Get Element Score
let scoreHtml = document.querySelector("#child-score");

//this
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}

const MOVE_INTERVAL = 150;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

let snake1 = {
    color: "purple",
    position: initPosition(),
    direction: initDirection(),
    score: 0,
}
let snake2 = {
    color: "blue",
    position: initPosition(),
    direction: initDirection(),
    score: 0,
}
let snake3 = {
    color: "orange",
    position: initPosition(),
    direction: initDirection(),
    score: 0,
}
let apple1 = {
    position: initPosition(),
}
let apple2 = {
    position: initPosition(),
}

let life = {
    position: initPosition(),
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
    let scoreCanvas;
    let tempScore = snake.score;

    scoreHtml.textContent = tempScore;

    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    } else if(snake.color == snake2.color) {
        scoreCanvas = document.getElementById("score2Board");
    } else {
        scoreCanvas = document.getElementById("score3Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

let isPrime = (value, object) => {
    
    if (value === 1) {
            return false
    } else if (value === 2) {
        object.drawImage(lifeCanvas, life.position.x * CELL_SIZE, life.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    } else {
        for(let index = 2; index < value; index++) {
            if(value % index === 0) {
                return false
            }
            object.drawImage(lifeCanvas, life.position.x * CELL_SIZE, life.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)    
        }
    }
}

function createLifeImage(value, limit) {

    function nodeLife() {
        let pathImg = document.createElement('img');
        pathImg.src = "../../asset/images/heart.png";
        pathImg.width = "25";
        pathImg.style.marginRight = "5px"
        pathImg.classList.add("img-apple")
        return pathImg;
    }

    for (let index = value; index < limit; index++) {
        lifeHtml.append(nodeLife(index));
    }
}

function draw() {

    // Get Element Apple
    let appleImg = document.getElementById('apple_icon');

    setInterval(function() {

        // Draw Canvas Snake
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");
        
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        // Draw Snake
        drawCell(ctx, snake1.position.x, snake1.position.y, snake1.color);
        drawCell(ctx, snake2.position.x, snake2.position.y, snake2.color);
        drawCell(ctx, snake3.position.x, snake3.position.y, snake3.color);
        
        // Draw Apple With Image
        ctx.drawImage(appleImg, apple1.position.x * CELL_SIZE, apple1.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        ctx.drawImage(appleImg, apple2.position.x * CELL_SIZE, apple2.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)

        // Draw Score
        drawScore(snake1);
        drawScore(snake2);
        drawScore(snake3);


        isPrime(snake1.score, ctx)

    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.position.x < 0) {
        snake.position.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.position.x >= WIDTH) {
        snake.position.x = 0;
    }
    if (snake.position.y < 0) {
        snake.position.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.position.y >= HEIGHT) {
        snake.position.y = 0;
    }
}

function eat(snake, apple1, apple2,life ) {
    if (snake.position.x == apple1.position.x && snake.position.y == apple1.position.y ) {
        apple1.position = initPosition();
        snake.score++;
    } else if(snake.position.x == apple2.position.x && snake.position.y == apple2.position.y) {
        apple2.position = initPosition();
        snake.score++;
    } else if (snake.position.x == life.position.x && snake.position.y == life.position.y) {
        life.position = initPosition();
        snake.score+=1;
        lifeEathMax.textContent = eatHealth+=1;

        if(lengthHealth.length > 5) {
            delete lengthHealth[7]
        } else {
            lengthHealth.push(createLifeImage(0,1))
            console.log(lengthHealth);
        }
    }
}

function moveLeft(snake) {
    snake.position.x--;
    teleport(snake);
    eat(snake, apple1, apple2, life);
}

function moveRight(snake) {
    snake.position.x++;
    teleport(snake);
    eat(snake, apple1, apple2, life);
}

function moveDown(snake) {
    snake.position.y++;
    teleport(snake);
    eat(snake, apple1, apple2, life);
}

function moveUp(snake) {
    snake.position.y--;
    teleport(snake);
    eat(snake, apple1, apple2, life);
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    setTimeout(function() {
        move(snake);
    }, MOVE_INTERVAL);
}

document.addEventListener("keydown", function (event) {

    if (event.key === "ArrowLeft") return snake1.direction = DIRECTION.LEFT;
    if (event.key === "ArrowRight") return snake1.direction = DIRECTION.RIGHT;
    if (event.key === "ArrowUp") return snake1.direction = DIRECTION.UP;
    if (event.key === "ArrowDown") return snake1.direction = DIRECTION.DOWN;

    if (event.key === "a") return snake2.direction = DIRECTION.LEFT;
    if (event.key === "d") return snake2.direction = DIRECTION.RIGHT;
    if (event.key === "w") return snake2.direction = DIRECTION.UP;
    if (event.key === "s") return snake2.direction = DIRECTION.DOWN;


    if (event.key === "j") return snake3.direction = DIRECTION.LEFT;
    if (event.key === "l") return snake3.direction = DIRECTION.RIGHT;
    if (event.key === "i") return snake3.direction = DIRECTION.UP;
    if (event.key === "k") return snake3.direction = DIRECTION.DOWN;
})

move(snake1);
move(snake2);
move(snake3);
lengthHealth.push(createLifeImage(0,1))
lengthHealth.push(createLifeImage(0,1))