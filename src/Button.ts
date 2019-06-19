import { Container, Text } from "pixi.js";

export class Button extends Container {
    private text: string;
    private label: Text;
    constructor(text: string) {
        super();
        this.text = text;
        this.label = new Text(this.text);
        this.addChild(this.label);
        this.interactive = true;
        this.buttonMode = true;
    }
    public onClick(handler: () => void) {
        this.on('pointerup', () => {
            handler();
        });
    }
}