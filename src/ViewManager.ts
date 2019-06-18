import { Container } from 'pixi.js';

export class ViewManager extends Container {
    private static instance: ViewManager = new ViewManager();
    private stage: Container;
    private viewStack: Array<Container> = [];
    public static getInstance(): ViewManager {
        return this.instance;
    }
    public static setStage(stage: Container) {
        ViewManager.instance.stage = stage;
    }
    public static push(container: Container) {
        const viewManager = ViewManager.instance;
        if(viewManager.viewStack.length > 0) {
            viewManager.viewStack[viewManager.viewStack.length - 1].visible = false;
        }
        viewManager.viewStack.push(container);
        viewManager.stage.addChild(container);
        container.visible = true;
    }
    public static pop() {
        const viewManager = ViewManager.instance;
        if(viewManager.viewStack.length > 1) {
            const current = viewManager.viewStack.pop();
            current.visible = false;
            viewManager.stage.removeChild(current);
            viewManager.viewStack[viewManager.viewStack.length - 1].visible = true;
        }
    }

}