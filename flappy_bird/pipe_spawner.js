import Pipe from "./Pipe";

class PipeSpawner {

    constructor(time_interval = 1000, start_delay = 0, pipe_gap = 200, pipe_width = 60, pipe_height = 300, speed = 2) {
        this.interval = null;
        this.time_interval = time_interval;
        this.startDelay = 0 /*start_delay;*/
        this.pipes = [];
        this.pipe_gap = pipe_gap;
        this.pipe_width = pipe_gap;
        this.pipe_height = pipe_gap;
        this.speed = speed;
    }

    start() {
        this.interval = setInterval(() => {
            let pipe = new Pipe(window.innerWidth, this.pipe_gap, this.pipe_width, this.pipe_height, this.speed);
            this.pipes.push(pipe);
            this.handleOffScreenPipes();
        }, this.time_interval)
    }

    handleOffScreenPipes() {
        this.pipes.forEach(pipe => {
            if (pipe.x > (0-pipe.width)) {
                this.pipes.remove(pipe);
            }
        })
    }

    update() {
        this.pipes.forEach(pipe => pipe.update());
    }

    draw(ctx, b) {
        this.pipes.forEach(pipe => pipe.draw(ctx, b));
    }

    getFirstPipe() {
        return this.pipes.get(this.pipes.length-1)
    }
}

export default PipeSpawner;