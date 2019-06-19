import { Sprite, ticker } from "pixi.js";

export interface TweenParameters {
    property: string,
    start: number,
    end: number,
    time: number,
    delay?: number,
    onStart?: () => void
}

export class Tween {
    private ticker: ticker.Ticker = ticker.shared;
    private sprite: Sprite;
    private parameters: TweenParameters;
    private elapsed: number = 0;
    constructor(sprite: Sprite, parameters: TweenParameters) {
        this.sprite = sprite;
        this.parameters = parameters;
    }

    private ease(time: number): number {
        return time < .5 ? 2 * time * time : -1 + (4 - 2 * time) * time
    }

    protected update() {
        this.elapsed += this.ticker.elapsedMS;
        if(this.parameters.delay) {
            if(this.elapsed < this.parameters.delay)
                return;
            this.parameters.delay = undefined;
            this.elapsed = 0;
            if(this.parameters.onStart)
                this.parameters.onStart();
        }
        const time = this.elapsed / this.parameters.time;
        const ease = this.ease(time);
        // @ts-ignore
        this.sprite[this.parameters.property] =  (1 - ease) * this.parameters.start + ease * this.parameters.end;
        if(this.elapsed >= this.parameters.time)
            this.stop();
    }

    start() {
        this.ticker.add(this.update, this);
    }

    stop() {
        this.ticker.remove(this.update, this);
    }
}