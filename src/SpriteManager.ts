import { Texture, Sprite } from 'pixi.js';

export class SpriteManager {
    private static _instance: SpriteManager = new SpriteManager();
    private sprites: { [name: string] : Sprite; } = {};
    private tags: { [tag: string] : Array<Sprite> } = {};
    public static add(name: string, resource: Texture, tag: string) {
        const instance = SpriteManager._instance;
        if(!instance.sprites[name]) {
            const newSprite: Sprite = new Sprite(resource);
            instance.sprites[name] = newSprite;
            if(!instance.tags[tag])
                instance.tags[tag] = new Array<Sprite>();
            instance.tags[tag].push(newSprite);
        }
    }
    public static get(name: string): Sprite {
        const instance = SpriteManager._instance;
        if(instance.sprites[name])
            return instance.sprites[name];
        return null;
    }
    public static getSpritesByTag(tag: string): Array<Sprite> {
        return SpriteManager._instance.tags[tag] || [];
    }

}