const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 500;

let bird = { x: 50, y: 150, width: 20, height: 20, velocity: 0, gravity: 0.5 };
let pipes = [];
let frame = 0;
let gameOver = false;

// Bird Controls
document.addEventListener("keydown", () => {
  if (!gameOver) bird.velocity = -7;
});

// Pipe Generation
function createPipe() {
  let pipeHeight = Math.floor(Math.random() * 150) + 100;
  pipes.push({ x: canvas.width, y: pipeHeight });
}

// Game Update
function update() {
  if (gameOver) return;

  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y >= canvas.height - bird.height) gameOver = true;

  if (frame % 90 === 0) createPipe();
  pipes.forEach((pipe, index) => {
    pipe.x -= 3;
    if (pipe.x + 40 < 0) pipes.splice(index, 1);

    if (
      bird.x < pipe.x + 40 &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.y || bird.y + bird.height > pipe.y + 100)
    ) {
      gameOver = true;
    }
  });

  frame++;
}

// Drawing Elements
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

  ctx.fillStyle = "green";
  pipes.forEach((pipe) => {
    ctx.fillRect(pipe.x, 0, 40, pipe.y);
    ctx.fillRect(pipe.x, pipe.y + 100, 40, canvas.height - pipe.y - 100);
  });

  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "20px Arial";
    ctx.fillText("Game Over!", canvas.width / 3, canvas.height / 2);
  }
}

// Game Loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
