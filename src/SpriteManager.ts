import { Texture, Sprite } from 'pixi.js';

export class SpriteManager {
    private static instance: SpriteManager = new SpriteManager();
    private sprites: { [name: string] : Sprite; } = {};
    public static getInstance(): SpriteManager {
        return this.instance;
    }
    public static add(name: string, resource: Texture) {
        const instance = SpriteManager.instance;
        if(!instance.sprites[name])
            instance.sprites[name] = new Sprite(resource);
    }
    public static get(name: string): Sprite {
        const instance = SpriteManager.instance;
        if(instance.sprites[name])
            return instance.sprites[name];
        return null;
    }

}