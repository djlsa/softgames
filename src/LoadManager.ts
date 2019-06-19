import { loader } from 'pixi.js';
import { SpriteManager } from './SpriteManager';
import { LoadingContainer } from "./LoadingContainer";

export class LoadManager {
    public static add(loadable: LoadingContainer, path: string = './assets/') {
        const assets: Array<string> = loadable.getAssets();
        for(const asset of assets) {
            if(SpriteManager.get(asset) != null)
                continue;
            loader.add(asset, path + loadable.getLoadingTag() + '/' + asset);
        }
        const tag: string = loadable.getLoadingTag();
        loader.onProgress.add((_loader, resource) => {
            if((resource.url as string).indexOf('/' + tag + '/') !== -1)
                SpriteManager.add(resource.name, resource.texture, tag);
        })
    }
    public static start() {
        loader.load();
    }
}