const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


//square (snake) variables
let column = 0;
let row = 0;
let directionX = 0;
let directionY = 1;

//cell variables
const cellSize = 25;
const columns = canvas.width / cellSize;
const rows = canvas.height / cellSize;

let previousTimestamp = null;    // Variable to store the timestamp of the previous frame                                     
let accumulatedTime = 0;                   
let tickInterval = 500;

function gameLoop(timestamp) {
    
    if (previousTimestamp == null) { // If this is the first frame, initialize previousTimestamp because there is no previous frame to compare to
        previousTimestamp = timestamp; 
    }

    const frameTime = Math.min(timestamp - previousTimestamp, 100); // Limit frame time to avoid large jumps (browser pauses, tab switching, etc.)

    previousTimestamp = timestamp;
    
    accumulatedTime += frameTime;
    
    if (accumulatedTime >= tickInterval) { 
        accumulatedTime -= tickInterval; 

        const nextColumn = column + directionX; // Calculate the next column position based on the current direction
        const nextRow = row + directionY; // Calculate the next row position based on the current direction
       
        // Check if the square has gone out of bounds and reverse direction if necessary
        if (nextColumn > columns - 1 || nextColumn < 0 || nextRow > rows - 1 || nextRow < 0) {
            directionX *= -1; 
            directionY *= -1; 
        }
        else{
            column = nextColumn; // Update the column position
            row = nextRow; // Update the row position
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "blue";
    ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);

    requestAnimationFrame(gameLoop);
}

addEventListener("keydown", (e) => {
    switch(e.key) {
        case "ArrowUp":
            directionX = 0;
            directionY = -1;
            break;
        case "ArrowDown":
            directionX = 0;
            directionY = 1;
            break;
        case "ArrowLeft":
            directionX = -1;
            directionY = 0;
            break;
        case "ArrowRight":
            directionX = 1;
            directionY = 0;
            break;
    }
});

requestAnimationFrame(gameLoop);