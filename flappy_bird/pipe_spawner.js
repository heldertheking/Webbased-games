import Pipe from "./Pipe.js";

class PipeSpawner {
    constructor(time_interval = 1000, start_delay = 0, pipe_gap_y = 100, pipe_width = 60, pipe_height = 300, speed = 2) {
        this.interval = null;
        this.time_interval = time_interval;
        this.startDelay = start_delay;
        this.pipes = [];
        this.pipe_gap_y = pipe_gap_y;
        this.pipe_width = pipe_width;
        this.pipe_height = pipe_height;
        this.speed = speed;
    }

    start() {
        if (this.interval) return; // Prevent multiple intervals
        this.interval = setInterval(() => {
            let pipe = new Pipe(window.innerWidth, this.pipe_gap_y, this.pipe_width, this.pipe_height, this.speed);
            this.pipes.push(pipe);
            this.handleOffScreenPipes();
        }, this.time_interval);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    handleOffScreenPipes() {
        // Remove pipes that are off the left side of the screen
        this.pipes = this.pipes.filter(pipe => pipe.x + pipe.width > 0);
    }

    update() {
        this.pipes.forEach(pipe => pipe.update());
        this.handleOffScreenPipes();
    }

    draw(ctx, b) {
        this.pipes.forEach(pipe => pipe.draw(ctx, b));
    }

    getFirstPipe() {
        // Return the first (oldest) pipe, or null if none
        return this.pipes.length > 0 ? this.pipes[0] : null;
    }
}

export default PipeSpawner;