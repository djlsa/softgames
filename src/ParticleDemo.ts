import { DemoContainer } from './DemoContainer';
import { Emitter } from 'pixi-particles';
import { Container, ticker, Texture, Sprite } from 'pixi.js';

export class ParticleDemo extends DemoContainer {

    private fireContainer: Container = new Container();
    private emitter: Emitter = new Emitter(this.fireContainer, Texture.fromImage('./assets/fire/fire.png'), {
        "alpha": {
            "start": 0.33,
            "end": 0
        },
        "scale": {
            "start": 0.33,
            "end": 0.66,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ffff00",
            "end": "#ff0000"
        },
        "speed": {
            "start": 0,
            "end": 0,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": -90,
            "max": -80
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 1,
            "max": 1
        },
        "lifetime": {
            "min": 1,
            "max": 1
        },
        "blendMode": "normal",
        "frequency": 0.1,
        "emitterLifetime": -1,
        "maxParticles": 10,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "point"
    });

    updatePositions() {
        this.fireContainer.x = window.innerWidth / 2;
        this.fireContainer.y = window.innerHeight / 2;
    }

    isLoadingComplete(): boolean {
        return true;
    }

    getLoadingTag(): string {
        return 'fire';
    }

    start() {
        this.started = true;
        this.addBackButton();
        this.addChild(this.fireContainer);
        this.fireContainer.pivot.set(0.5);
        const cupcake = Sprite.from('./assets/fire/cupcake.png');
        this.fireContainer.addChildAt(cupcake, 0);
        cupcake.x = -125;
        cupcake.y = -20;
        ticker.shared.add(() => {
            this.emitter.update(ticker.shared.elapsedMS * 0.001);
        });

        this.emitter.emit = true;
    }

    getAssets(): Array<string> {
        return [];
    }
}