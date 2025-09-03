// This script is for a simple Flappy Bird clone using HTML5 Canvas and JavaScript.

// Import the Bird and Pipe classes
import { Bird, ImageLoader } from './Bird.js';
import game from './global_api.js';
import PipeSpawner from "./pipe_spawner";

// Load required elements from the HTML
const scoreElement = document.getElementById("score");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Setup event listeners for user input
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === ' ') {
        bird.jump();
    }
});

// Set canvas dimensions
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
let running = true;
let score = 0;
let touchingTrigger = false;

// Example usage:
//const pipe = new Pipe(400, 200, 60, 200, 2);
const spawner = new PipeSpawner(1000, 0, 200, 60, 1000, 2)
let bird;
const imageLoader = new ImageLoader();
imageLoader.load('./assets/bird.png', (birdImg) => {
    bird = new Bird(50, 300, 80, birdImg);

    // Start the game loop only after the image is loaded
    gameLoop();
});

function gameLoop() {
    // No background drawing, background handled by CSS
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bird.update();
    spawner.update();
    bird.draw(ctx, game.isHitboxEnabled());
    spawner.draw(ctx, game.isHitboxEnabled());

    // Collision detection with pipe (top and bottom)
    const birdHitbox = bird.getHitbox();
    let pipeHitboxes = spawner.getFirstPipe().getHitboxes(ctx);

    // Check for collision with the trigger hitbox
    if (
        rectsIntersect(birdHitbox, pipeHitboxes.trigger)
    ) {
        if (!touchingTrigger) {
            score++;
            touchingTrigger = true;
        }
    } else {
        touchingTrigger = false;
    }

    // Check for collision with the top and bottom pipes
    if (
        rectsIntersect(birdHitbox, pipeHitboxes.top) ||
        rectsIntersect(birdHitbox, pipeHitboxes.bottom)
    ) {
        alert("Game Over! Your score: " + scoreElement.textContent);
        running = false;
    }

    // Check if the bird is out of bounds
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        alert("Game Over! Your score: " + scoreElement.textContent);
        running = false;
    }

    // Update the score display
    scoreElement.innerText = score.toString();

    if (running) requestAnimationFrame(gameLoop);
}

function rectsIntersect(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}
