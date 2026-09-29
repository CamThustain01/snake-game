const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const squareSize = 50;
let squaresx = 0;
let speed = 1;


let previousTimestamp = null;                                         
let accumulatedTime = 0;                   
let tickInterval = 500;

function gameLoop(timestamp) {
    
    if (!previousTimestamp) {
        previousTimestamp = timestamp;
    }

    const frameTime = timestamp - previousTimestamp;

    previousTimestamp = timestamp;
    
    accumulatedTime += frameTime;
    
    if (accumulatedTime >= tickInterval) {
        accumulatedTime -= tickInterval;

        squaresx += speed * 50;

        if (squaresx > canvas.width - squareSize || squaresx < 0) {
            speed = speed * -1;
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "blue";
    ctx.fillRect(squaresx, 175, squareSize, squareSize);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);