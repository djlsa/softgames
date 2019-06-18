import { loader } from 'pixi.js';
import { SpriteManager } from './SpriteManager';

export class LoadManager {
    private static instance: LoadManager = new LoadManager();
    public static getInstance(): LoadManager {
        return this.instance;
    }
    public static add(assets: Array<string>, callback?: () => void, path: string = './assets/', tag: string = '') {
        for(let i in assets) {
            if(SpriteManager.get(assets[i]) != null)
                continue;
            loader.add(assets[i], path + assets[i]);
        }
        loader.onProgress.add((_loader, resource) => {
            SpriteManager.add(resource.name, resource.texture, tag);
        })
        loader.load((_loader, resources) => {
            for(let i in resources) {
                SpriteManager.add(i, resources[i].texture, tag);
            }
            if(callback)
                callback();
        });
    }
}