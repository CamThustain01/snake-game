const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let squaresx = 0;
let squareIncrement = 1;

function gameLoop(timestamp) {
    
    ctx.clearRect(squaresx, 175, 50, 50);

    squaresx += squareIncrement;
    ctx.fillStyle = "blue";
    ctx.fillRect(squaresx, 175, 50, 50);

    if (squaresx > canvas.width - 50) {
        squareIncrement -= 1;
    }
    else if (squaresx <0) {
        squareIncrement += 1;
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);