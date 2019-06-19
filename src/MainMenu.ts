import { SpriteStackDemo } from './SpriteStackDemo';
import { ViewManager } from './ViewManager';
import { TextDemo } from './TextDemo';
import { Button } from './Button';
import { LoadManager } from './LoadManager';
import { ResponsiveContainer } from './ResponsiveContainer';
import { DemoContainer } from './DemoContainer';
import { ParticleDemo } from './ParticleDemo';

export class MainMenu extends ResponsiveContainer {

    private demos: { [text: string] : DemoContainer; } = {
        'Sprites': new SpriteStackDemo(),
        'Text': new TextDemo(),
        'Particles': new ParticleDemo()
    }

    private buttons: Array<Button> = [];

    private createMenuEntry(text: string, demo: DemoContainer): Button {
        const button = new Button(text);
        button.onClick(() => {
            ViewManager.push(demo);
        });
        return button;
    }

    private start() {
        for(const demo in this.demos) {
            LoadManager.add(this.demos[demo]);
            let button = this.createMenuEntry(demo, this.demos[demo]);
            this.addChild(button);
            this.buttons.push(button);
        }
        LoadManager.start();
        this.updatePositions();
    }

    updatePositions() {
        for(let i = 0; i < this.buttons.length; i++) {
            const button = this.buttons[i];
            button.x = window.innerWidth / 2 - button.width / 2;
            button.y = window.innerHeight / 2 + ((this.buttons.length / 2 * -1) * button.height + i * button.height * 1.5);
        }
    }

    constructor() {
        super();
        this.start();
    }
}