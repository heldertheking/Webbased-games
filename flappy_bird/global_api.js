// global_api.js
class GlobalAPI {
    constructor() {
        this.showHitbox = sessionStorage.getItem('showHitbox') === 'true' || false;
    }

    enableHitbox() {
        this.showHitbox = true;
        sessionStorage.setItem('showHitbox', this.showHitbox);
        return `Hitbox was enabled. Current state: ${this.isHitboxEnabled()}`;
    }

    disableHitbox() {
        this.showHitbox = false;
        sessionStorage.setItem('showHitbox', this.showHitbox);
        return `Hitbox was disabled. Current state: ${this.isHitboxEnabled()}`;
    }

    toggleHitbox() {
        this.showHitbox = !this.showHitbox;
        sessionStorage.setItem('showHitbox', this.showHitbox);
        return `Hitbox was toggled. Current state: ${this.isHitboxEnabled()}`;
    }

    isHitboxEnabled() {
        return sessionStorage.getItem('showHitbox') === 'true';
    }
}

window.game = new GlobalAPI();

export default window.game;

