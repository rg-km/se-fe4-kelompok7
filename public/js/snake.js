const CELL_SIZE = 20;
const CANVAS_SIZE = 400;

//made faster
const REDRAW_INTERVAL = 0;

// Size Width and Height
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;

// Draw DOM
function dom(element) {
    return document.querySelector(element)
}

// Get Element Life
// let lifeAppleNode = document.querySelectorAll(".img-apple");
let lifeCanvas = document.getElementById('life_icon');
let lifeHtml = dom('#life-child');
let lifeEathMax = dom('.love-number');
let lengthHealth = [];
let eatHealth = 0;
let eatHealthMax = [];
let totalHealth = [...lengthHealth, ...eatHealthMax];

// Get Element Score
let scoreHtml = dom('#child-score');
let scoreInit = [];

// Get Element Speed
let speedHtml = dom('.speed-number');

// Get Element Speed
let levelHtml = dom('.level-number');

//this
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}

let MOVE_INTERVAL = 150;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}

let snake1 = {
    score: 0,
    color: "green",
    ...initHeadAndBody(),
    direction: initDirection(),
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

let level = {
    point: 0
}

let isPrime = (value, object) => {
    
    if (value === 1) {
            return false
    } else if (value === 2) {
        object.drawImage(lifeCanvas, life.position.x * CELL_SIZE, life.position.y * CELL_SIZE, CELL_SIZE+20, CELL_SIZE+20)
    } else {
        for(let index = 2; index < value; index++) {
            if(value % index === 0) {
                return false
            }
            object.drawImage(lifeCanvas, life.position.x * CELL_SIZE, life.position.y * CELL_SIZE, CELL_SIZE+20, CELL_SIZE+20)    
        }
    }
}

function speed(value=150) {
    MOVE_INTERVAL = value;
    speedHtml.textContent = value + "ms";
}

function sound(value) {
    let sound = new Audio(value)
    sound.play();
}

function drawObject(object=0, img=0, x, y) {
    object.drawImage(img, x.head.x * CELL_SIZE, y.head.y * CELL_SIZE, CELL_SIZE+20, CELL_SIZE+20)
}

function drawScore(snake) {
    let tempScore = snake.score;
    scoreHtml.textContent = tempScore;    
}

function createLifeImage(value, limit) {

    function nodeLife() {
        let pathImg = document.createElement('img');
        pathImg.width = "25";
        pathImg.style.marginRight = "5px"
        pathImg.classList.add("img-apple")
        pathImg.src = "../../public/asset/images/heart.png";
        return pathImg;
    }

    for (let index = value; index < limit; index++) {
        lifeHtml.append(nodeLife(index));
    }
}

function draw() {

    // Get Element Snake
    let snakeImg = document.getElementById('snake_icon');

    // Get Element Apple
    let appleImg = document.getElementById('apple_icon');

    setInterval(function() {

        // Draw Canvas Snake
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");
        
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        // Draw Snake
        drawObject(ctx, snakeImg, snake1, snake1)
        
        // Draw Apple With Image
        ctx.drawImage(appleImg, apple1.position.x * CELL_SIZE, apple1.position.y * CELL_SIZE, CELL_SIZE+20, CELL_SIZE+20)
        ctx.drawImage(appleImg, apple2.position.x * CELL_SIZE, apple2.position.y * CELL_SIZE, CELL_SIZE+20, CELL_SIZE+20)

        for (let i = 1; i < snake1.body.length; i++) {
            ctx.fillStyle = snake1.color;
            ctx.fillRect( snake1.body[i].x * CELL_SIZE - 4, snake1.body[i].y * CELL_SIZE, CELL_SIZE+10, CELL_SIZE+10);
        }

        // Draw Score
        drawScore(snake1);
        
        isPrime(snake1.score, ctx)
        
    }, REDRAW_INTERVAL);
}

function levelUp(value) {
    if(value.length >= 0 && value.length < 5) {
        levelHtml.textContent = 0;
        speed(150);
    } else if(value.length >= 5 && value.length < 10) {
        levelHtml.textContent = 1;
        speed(120);
        if(value.length === 5) {
            sound("../../asset/sound/level-up.mp3") 
        }
        // if( snake1.position.x < 0 ) {
        //     snake1.position.x = CANVAS_SIZE / CELL_SIZE + 1;
        // }
    } else if (value.length >= 10 && value.length < 15) {
        levelHtml.textContent = 2;
        speed(90);
        if(value.length === 10) {
            sound("../../asset/sound/level-up.mp3")
        }
        // if( snake1.position.x < 0 && snake1.position.y < 0) {
        //     snake1.position.x = CANVAS_SIZE / CELL_SIZE + 1;
        //     snake1.position.y = CANVAS_SIZE / CELL_SIZE + 1;
        // }
    } else if (value.length >= 15 && value.length < 20) {
        levelHtml.textContent = 3;
        speed(60);
        if(value.length === 15) {
            sound("../../asset/sound/level-up.mp3")
        }
        // if( snake1.position.x < 0 && snake1.position.y < 0 && snake.position.x >= WIDTH) {
        //     snake1.position.x = CANVAS_SIZE / CELL_SIZE + 1;
        //     snake1.position.y = CANVAS_SIZE / CELL_SIZE + 1;
        //     snake1.position.x = CANVAS_SIZE / CELL_SIZE - 8;
        // }
    } else if (value.length >= 20 && value.length < 25) {
        levelHtml.textContent = 4;
        speed(40);
        if(value.length === 20) {
            sound("../../asset/sound/level-up.mp3")
        }
        // if( snake1.position.x < 0 && snake1.position.y < 0 && snake1.position.x >= WIDTH && snake1.position.y >= HEIGHT) {
        //     snake1.position.x = CANVAS_SIZE / CELL_SIZE + 1;
        //     snake1.position.y = CANVAS_SIZE / CELL_SIZE + 1;
        //     snake1.position.x = CANVAS_SIZE / CELL_SIZE - 8;
        //     snake1.position.y = CANVAS_SIZE / CELL_SIZE - 8;
        // }
    } else if (value.length >= 25 && value.length <= 30) {
        levelHtml.textContent = 5;
        speed(20);
        if(value.length === 25) {
            sound("../../asset/sound/level-up.mp3")
        }
        // if( snake1.position.x < 0 && snake1.position.y < 0 && snake1.position.x >= WIDTH && snake1.position.y >= HEIGHT) {
        //     snake1.position.x = CANVAS_SIZE / CELL_SIZE + 1;
        //     snake1.position.y = CANVAS_SIZE / CELL_SIZE + 1;
        //     snake1.position.x = CANVAS_SIZE / CELL_SIZE - 8;
        //     snake1.position.y = CANVAS_SIZE / CELL_SIZE - 8;
        // }
    } else if (value.length >= 30) {
        alert("Hurrayy, You WIN !")
        alert(`Total Score : ${scoreInit.length} \n\n Nyawa yang dimakan : ${eatHealthMax.length} Nyawa`)
        window.location.reload();
    }
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apple1, apple2, life ) {
    if (snake.head.x == apple1.position.x && snake.head.y == apple1.position.y ) {
        apple1.position = initPosition();
        snake.score++;
        scoreInit.push(1)
        levelUp(scoreInit);
        snake.body.push({x: snake.head.x, y: snake.head.y});
    } else if(snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
        apple2.position = initPosition();
        snake.score++;
        scoreInit.push(2)
        levelUp(scoreInit);
        snake.body.push({x: snake.head.x, y: snake.head.y});
    } else if (snake.head.x == life.position.x && snake.head.y == life.position.y) {
        life.position = initPosition();
        snake.score++;        
        scoreInit.push(3)
        levelUp(scoreInit);
        
        eatHealth+=1;
        lifeEathMax.textContent = eatHealthMax.push(eatHealth);
        if(lengthHealth.length > 5) {
            delete lengthHealth[7]
        } else {
            lengthHealth.push(createLifeImage(0,1))
        }       
        snake.body.push({x: snake.head.x, y: snake.head.y});
    } 
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple1, apple2, life);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple1, apple2, life);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple1, apple2, life);
}

function moveUp(snake) {
    snake.head.y--;
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
    removeBody(snake);
    setTimeout(function() {
        move(snake);
    }, MOVE_INTERVAL);
}

function removeBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function snakeTurn(snake, direction) {
    //dict
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {

    if (event.key === "ArrowLeft") return snakeTurn(snake1, DIRECTION.LEFT);
    if (event.key === "ArrowRight") return snakeTurn(snake1, DIRECTION.RIGHT);
    if (event.key === "ArrowUp") return snakeTurn(snake1, DIRECTION.UP);
    if (event.key === "ArrowDown") return snakeTurn(snake1, DIRECTION.DOWN);
})

move(snake1);
lengthHealth.push(createLifeImage(0,1))
lengthHealth.push(createLifeImage(0,1))