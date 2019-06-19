import { Container } from 'pixi.js';

export abstract class ResponsiveContainer extends Container {
    protected abstract updatePositions(): void;
    constructor() {
        super();
        this.on('added', () => {
            window.dispatchEvent(new Event('resize'));
        });
        window.addEventListener('resize', () => {
            this.updatePositions();
        });
    }
}