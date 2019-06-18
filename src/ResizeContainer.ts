import { Container } from 'pixi.js';
import { Button } from './Button';
import { ViewManager } from './ViewManager';

export abstract class ResizeContainer extends Container {
    protected abstract updatePositions(): void;
    protected alreadyAdded: boolean = false;
    protected alreadyLoaded: boolean = false;
    constructor(hasBackButton: boolean = true) {
        super();
        const backButton = new Button('< Back');
        if(hasBackButton) {
            backButton.y = 50
            backButton.onClick(() => {
                ViewManager.pop();
            });
        }
        this.on('added', () => {
            window.dispatchEvent(new Event('resize'));
            if(this.alreadyAdded)
                return;
            this.alreadyAdded = true;
            if(hasBackButton)
                this.addChild(backButton);
        });
        window.addEventListener('resize', () => {
            this.updatePositions();
        });
    }
}