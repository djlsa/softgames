import { LoadingContainer } from "./LoadingContainer";
import { Button } from './Button';
import { ViewManager } from './ViewManager';

export abstract class DemoContainer extends LoadingContainer {

    protected started: boolean = false;

    abstract start(): void;
    abstract stop(): void;
    public hasStarted(): boolean {
        return this.started;
    }
    protected addBackButton() {
        const backButton = new Button('< Back');
        backButton.y = 50
        this.addChild(backButton);
        backButton.onClick(() => {
            ViewManager.pop();
        });
    }
}