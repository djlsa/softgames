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
    // @ts-ignore
    private lerp(start: number, end: number, time: number): number {
        return (1 - time) * start + time * end; // https://en.wikipedia.org/wiki/Linear_interpolation
    }
    public start() {
        const update = () => {
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
            // @ts-ignore
            this.sprite[this.parameters.property] = this.lerp(this.parameters.start, this.parameters.end, time);
            if(this.elapsed >= this.parameters.time)
                this.ticker.remove(update);
        };
        this.ticker.add(update);
    }
}