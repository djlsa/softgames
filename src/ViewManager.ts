import { Container } from "pixi.js";
import { DemoContainer } from "./DemoContainer";

export class ViewManager extends Container {
    private static _instance: ViewManager = new ViewManager();
    private stage: Container;
    private viewStack: Array<Container> = [];
    public static setStage(stage: Container) {
        ViewManager._instance.stage = stage;
    }
    public static push(demo: Container | DemoContainer) {
        const viewManager = ViewManager._instance;
        if(viewManager.viewStack.length > 0) {
            viewManager.viewStack[viewManager.viewStack.length - 1].visible = false;
        }
        viewManager.viewStack.push(demo);
        viewManager.stage.addChild(demo);
        demo.visible = true;
        if(!(demo instanceof DemoContainer))
            return;
        const dc = (demo as DemoContainer);
        if(dc.start && !dc.hasStarted())
            dc.start();
    }
    public static pop() {
        const viewManager = ViewManager._instance;
        if(viewManager.viewStack.length > 1) {
            const current = viewManager.viewStack.pop();
            current.visible = false;
            viewManager.stage.removeChild(current);
            viewManager.viewStack[viewManager.viewStack.length - 1].visible = true;
        }
    }

}