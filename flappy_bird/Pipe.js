// Pipe.js
class Pipe {
    constructor(x, gapY, width, height, speed, gapHeight = 300) {
        this.x = x;
        this.width = width;
        this.height = height; // height of each pipe (top/bottom)
        this.gapY = gapY; // y position of the gap's top
        this.gapHeight = gapHeight; // vertical gap between pipes
        this.speed = speed;
    }

    update() {
        this.x -= this.speed;
    }

    draw(ctx, showHitbox = false) {
        if (showHitbox) {
            ctx.save();
            // Top pipe (green)
            ctx.strokeStyle = 'green';
            ctx.strokeRect(this.x, 0, this.width, this.gapY);
            // Bottom pipe (green)
            ctx.strokeRect(this.x, this.gapY + this.gapHeight, this.width, ctx.canvas.height - (this.gapY + this.gapHeight));
            // Trigger hitbox (orange)
            ctx.strokeStyle = 'orange';
            ctx.strokeRect(this.x, this.gapY, this.width, this.gapHeight);
            ctx.restore();
        }

        ctx.save();
        ctx.fillStyle = 'green';
        // Top pipe
        ctx.fillRect(this.x, 0, this.width, this.gapY);
        // Bottom pipe
        ctx.fillRect(this.x, this.gapY + this.gapHeight, this.width, ctx.canvas.height - (this.gapY + this.gapHeight));
        ctx.restore();
    }

    getHitboxes(ctx) {
        // Accepts ctx to get canvas height dynamically
        return {
            top: { x: this.x, y: 0, width: this.width, height: this.gapY },
            bottom: { x: this.x, y: this.gapY + this.gapHeight, width: this.width, height: ctx.canvas.height - (this.gapY + this.gapHeight) },
            trigger: { x: this.x, y: this.gapY, width: this.width, height: this.gapHeight }
        };
    }

    static createDynamic(x, width, speed, gapHeight, canvasHeight, gapY = null) {
        // If gapY is not provided, center the gap
        if (gapY === null) {
            gapY = Math.floor((canvasHeight - gapHeight) / 2);
        }
        // height is not used for bottom pipe anymore, so just pass 0
        return new Pipe(x, gapY, width, 0, speed, gapHeight);
    }
}

export default Pipe;
