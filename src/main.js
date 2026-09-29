const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const squareSize = 50;
let squaresx = 0;
let speed = 1;


let previousTimestamp = null;    // Variable to store the timestamp of the previous frame                                     
let accumulatedTime = 0;                   
let tickInterval = 500;

function gameLoop(timestamp) {
    
    if (!previousTimestamp) { // If this is the first frame, initialize previousTimestamp because there is no previous frame to compare to
        previousTimestamp = timestamp; 
    }

    const frameTime = Math.min(timestamp - previousTimestamp, 100); // Limit frame time to avoid large jumps (browser pauses, tab switching, etc.)

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