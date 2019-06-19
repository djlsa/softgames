import { Container } from "pixi.js";
import { DemoContainer } from "./DemoContainer";

export class ViewManager extends Container {
    private static _instance: ViewManager = new ViewManager();
    private stage: Container;
    private viewStack: Array<Container> = [];
    public static setStage(stage: Container) {
        ViewManager._instance.stage = stage;
    }
    public static push(view: Container | DemoContainer) {
        const viewManager = ViewManager._instance;
        if(viewManager.viewStack.length > 0) {
            viewManager.viewStack[viewManager.viewStack.length - 1].visible = false;
        }
        viewManager.viewStack.push(view);
        viewManager.stage.addChild(view);
        view.visible = true;
        if(!(view instanceof DemoContainer))
            return;
        (view as DemoContainer).start();
    }
    public static pop() {
        const viewManager = ViewManager._instance;
        if(viewManager.viewStack.length > 1) {
            const current = viewManager.viewStack.pop();
            current.visible = false;
            viewManager.stage.removeChild(current);
            viewManager.viewStack[viewManager.viewStack.length - 1].visible = true;
            if(!(current instanceof DemoContainer))
                return;
            (current as DemoContainer).stop();
        }
    }

}