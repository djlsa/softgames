import { Texture, Sprite } from 'pixi.js';

export class SpriteManager {
    private static instance: SpriteManager = new SpriteManager();
    private sprites: { [name: string] : Sprite; } = {};
    private tags: { [tag: string] : Array<string> } = {};
    public static getInstance(): SpriteManager {
        return this.instance;
    }
    public static add(name: string, resource: Texture, tag: string) {
        const instance = SpriteManager.instance;
        if(!instance.sprites[name]) {
            const newSprite: Sprite = new Sprite(resource);
            instance.sprites[name] = newSprite;
            if(!instance.tags[tag])
                instance.tags[tag] = new Array<string>();
            instance.tags[tag].push(name);
        }
    }
    public static get(name: string): Sprite {
        const instance = SpriteManager.instance;
        if(instance.sprites[name])
            return instance.sprites[name];
        return null;
    }
    public static getSpritesByTag(tag: string): Array<string> {
        let keys: Array<string> = [];
        for(const i in SpriteManager.instance.tags[tag])
            keys.push(SpriteManager.instance.tags[tag][i]);
        return keys;
    }

}