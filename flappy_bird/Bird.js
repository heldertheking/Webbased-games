// Bird.js
class Bird {
    constructor(x, y, size, image = null) {
        this.x = x;
        this.y = y;
        this.size = size; // Bird is always a square
        this.velocity = 0;
        this.gravity = 0.5;
        this.image = image;
        this.hitboxScale = 0.6; // Hitbox is 80% of the image size
    }

    jump() {
        this.velocity = -8;
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
    }

    draw(ctx, showHitbox = false) {
        if (this.image) {
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        }
        if (showHitbox) {
            ctx.save();
            ctx.strokeStyle = 'red';
            const hbSize = this.size * this.hitboxScale;
            const offset = (this.size - hbSize) / 2;
            ctx.strokeRect(this.x + offset, this.y + offset, hbSize, hbSize);
            ctx.restore();
        }
    }

    getHitbox() {
        const hbSize = this.size * this.hitboxScale;
        const offset = (this.size - hbSize) / 2;
        return { x: this.x + offset, y: this.y + offset, width: hbSize, height: hbSize };
    }
}

// Class responsible for loading and preparing images
class ImageLoader {
    constructor() {
        this.cache = {};
    }

    load(src, onLoad = null) {
        if (this.cache[src]) {
            // If already loaded and complete, call onLoad immediately
            if (onLoad && this.cache[src].complete && this.cache[src].naturalWidth !== 0) {
                onLoad(this.cache[src]);
            }
            return this.cache[src];
        }
        const img = new Image();
        img.src = src;
        if (onLoad) {
            img.onload = () => onLoad(img);
        }
        this.cache[src] = img;
        return img;
    }
}

export { Bird, ImageLoader };
