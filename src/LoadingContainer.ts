import { ResponsiveContainer } from './ResponsiveContainer';
import { Text, ticker } from 'pixi.js';

export abstract class LoadingContainer extends ResponsiveContainer {

    abstract getAssets(): Array<string>;
    abstract getLoadingTag(): string;
    abstract isLoadingComplete(): boolean;

    private loading: Text;

    constructor() {
        super();
        this.loading = new Text('Loading...');
        this.loading.pivot.set(0.5);
        this.addChild(this.loading);
        this.loading.x = 200;
        let elapsed: number = 0;
        ticker.shared.add(() => {
            elapsed += ticker.shared.elapsedMS;
            if(elapsed >= 1000) {
                if(this.isLoadingComplete())
                    this.removeChild(this.loading);
                elapsed = 0;
            }
        })
    }
}