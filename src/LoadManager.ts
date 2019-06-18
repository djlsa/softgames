import { loader } from 'pixi.js';
import { SpriteManager } from './SpriteManager';

export class LoadManager {
    private static instance: LoadManager = new LoadManager();
    public static getInstance(): LoadManager {
        return this.instance;
    }
    public static add(assets: Array<string>, callback?: () => void, path: string = './assets/') {
        for(let i in assets) {
            if(SpriteManager.get(assets[i]) != null)
                continue;
            loader.add(assets[i], path + assets[i]);
        }
        loader.load((_loader, resources) => {
            for(let i in resources) {
                SpriteManager.add(i, resources[i].texture);
            }
            if(callback)
                callback();
        });
    }
}