import { Application, Text } from 'pixi.js';
import { ViewManager } from './ViewManager';
import { MainMenu } from './MainMenu';

export class Main {

    private app = new Application({
        autoResize: true,
        backgroundColor: 0xCCCCCC
    });
    private FPS: Text = new Text();

    constructor() {
        window.addEventListener('load', () => {
            document.body.appendChild(this.app.view);
            ViewManager.setStage(this.app.stage);
            ViewManager.push(new MainMenu());
            this.app.stage.addChild(this.FPS);
            this.app.ticker.add(() => {
                this.FPS.text = '' + this.app.ticker.FPS.toFixed(1) + 'fps';
            });
        });

        window.addEventListener('resize', () => {
            this.app.renderer.resize(window.innerWidth, window.innerHeight);
        });

        window.dispatchEvent(new Event('resize'));
    }
}

new Main();