import { Text, Container } from 'pixi.js';
import { ResizeContainer } from './ResizeContainer';
import { SpriteStackDemo } from './SpriteStackDemo';
import { ViewManager } from './ViewManager';
import { TextDemo } from './TextDemo';

export class MainMenu extends ResizeContainer {

    private demos: { [text: string] : Container; } = {
        'Sprites': new SpriteStackDemo(),
        'Text': new TextDemo(),
        'Particles': new Container()
    }

    private buttons: Array<Text> = [];

    private createMenuEntry(text: string, container: Container): Text {
        const button = new Text(text, new PIXI.TextStyle({
            "dropShadow": true,
            "dropShadowAlpha": 0.5,
            "dropShadowAngle": 0.5,
            "dropShadowBlur": 5,
            "padding": 5,
            "stroke": "red",
            "strokeThickness": 1
        }));
        button.interactive = true;
        button.buttonMode = true;
        button.on('pointerup', () => {
            ViewManager.push(container);
        });
        return button;
    }

    private createMenu() {
        for(let i in this.demos) {
            let button = this.createMenuEntry(i, this.demos[i] );
            this.addChild(button);
            this.buttons.push(button);
        }
    }

    updatePositions() {
        for(let i = 0; i < this.buttons.length; i++) {
            const button = this.buttons[i];
            button.x = window.innerWidth / 2 - button.width / 2;
            button.y = window.innerHeight / 2 + ((this.buttons.length / 2 * -1) * button.height + i * button.height * 1.5);
        }
    }

    private demoContainer: Container = new Container();

    constructor() {
        super(false);
        this.createMenu();
        this.addChild(this.demoContainer);
        this.updatePositions();
        this.demoContainer;
    }
}