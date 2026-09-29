const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


//square (snake) variables
let column = 0;
let speed = 1;

//cell variables
const cellSize = 25;
const columns = canvas.width / cellSize;

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

        if (column >= columns - 1) {// If the square reaches the right edge, reverse direction
            speed = -1;
        }
        else if (column <= 0) { // If the square reaches the left edge, reverse direction
            speed = 1;
        }
        
        column += speed; // Move the square by the speed value

        if (column > columns - 1 || column < 0) {
            speed = speed * -1;
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "blue";
    ctx.fillRect(column * cellSize, 175, cellSize, cellSize);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);