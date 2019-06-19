import { Sprite, Container } from 'pixi.js';
import { SpriteManager } from './SpriteManager';
import { Tween } from './Tween';
import { Util } from './Util';
import { DemoContainer } from './DemoContainer';

export class SpriteStackDemo extends DemoContainer {

    private static CARD_COUNT = 1;
    private static CARD_WIDTH = 188;
    private static CARD_HEIGHT = 138;
    private static CARD_INTERVAL = 1000;
    private static CARD_DURATION = 2000;

    private cardStack: Container = new Container();
    private cards: Array<Sprite> = [];
    private tweens: Array<Tween> = [];

    updatePositions() {
        this.cardStack.x = window.innerWidth / 2;
        this.cardStack.y = window.innerHeight / 2;
    }

    isLoadingComplete(): boolean {
        return SpriteManager.getSpritesByTag(this.getLoadingTag()).length == this.getAssets().length;
    }

    getLoadingTag(): string {
        return 'cards';
    }

    stop() {
        this.cards = [];
        this.removeChildren();
        this.cardStack.removeChildren();
        for(const i in this.tweens) {
            i;
            this.tweens.pop().stop();
        }
    }

    start() {
        this.started = true;
        this.addBackButton();

        for(const card of SpriteManager.getSpritesByTag(this.getLoadingTag())) {
            this.cards.push(new Sprite(card.texture)); // can't reuse because of bug with
        }
        const missing = SpriteStackDemo.CARD_COUNT - this.cards.length;
        const random = Util.random(0, this.cards.length - 1 - missing);
        const slice = this.cards.slice(random, random + missing);
        for(const card of slice) {
            this.cards.push(new Sprite(card.texture));
        }
        Util.arrayShuffle(this.cards);

        this.addChild(this.cardStack);
        this.updatePositions();

        for(let i = this.cards.length - 1; i > 0; i--) {
            const card = this.cards[i];

            card.width = SpriteStackDemo.CARD_WIDTH;
            card.x = card.width * -1;
            card.height = SpriteStackDemo.CARD_HEIGHT;
            card.anchor.set(0.5);
            card.rotation = Util.random(-15, 15) * (Math.PI / 180);

            this.cardStack.addChild(card);

            const posTween = new Tween(card, {
                property: 'x',
                start: card.x,
                end: SpriteStackDemo.CARD_WIDTH,
                time: SpriteStackDemo.CARD_DURATION,
                delay: SpriteStackDemo.CARD_INTERVAL * i,
                onStart: () => {
                    this.cardStack.removeChild(card);
                    this.cardStack.addChild(card);
                }
            });
            posTween.start();
            this.tweens.push(posTween);

            const rotTween = new Tween(card, {
                property: 'rotation',
                start: card.rotation,
                end: Util.random(-15, 15) * (Math.PI / 180),
                time: SpriteStackDemo.CARD_DURATION,
                delay: SpriteStackDemo.CARD_INTERVAL * i
            });
            rotTween.start();
            this.tweens.push(rotTween);
        }
    }

    getAssets(): Array<string> {
        return [
            '_1.jpg',
            '_extra2.jpg',
            '_extra3.jpg',
            'aggregate.jpg',
            'all_for_one.jpg',
            'amplify.jpg',
            'ascenders_bane.jpg',
            'auto_shields.jpg',
            'ball_lightning.jpg',
            'barrage.jpg',
            'beam_cell.jpg',
            'biased_cognition.jpg',
            'blizzard.jpg',
            'boot_sequence.jpg',
            'buffer.jpg',
            'bullseye.jpg',
            'burn.jpg',
            'capacitor.jpg',
            'chaos.jpg',
            'charge_battery.jpg',
            'chill.jpg',
            'claw.jpg',
            'clumsy.jpg',
            'cold_snap.jpg',
            'consume.jpg',
            'coolheaded.jpg',
            'core_surge.jpg',
            'creative_ai.jpg',
            'darkness.jpg',
            'dazed.jpg',
            'decay.jpg',
            'defend.jpg',
            'defend_1.jpg',
            'defragment.jpg',
            'doom_and_gloom.jpg',
            'double_energy.jpg',
            'doubt.jpg',
            'dualcast.jpg',
            'echo_form.jpg',
            'electrodynamics.jpg',
            'equilibrium.jpg',
            'fission.jpg',
            'force_field.jpg',
            'ftl.jpg',
            'fusion.jpg',
            'genetic_algorithm.jpg',
            'glacier.jpg',
            'go_for_the_eyes.jpg',
            'heatsinks.jpg',
            'hello_world.jpg',
            'hologram.jpg',
            'hyperbeam.jpg',
            'injury.jpg',
            'leap.jpg',
            'lock_on.jpg',
            'loop.jpg',
            'machine_learning.jpg',
            'melter.jpg',
            'meteor_strike.jpg',
            'multi_cast.jpg',
            'necronomicurse.jpg',
            'normality.jpg',
            'overclock.jpg',
            'pain.jpg',
            'parasite.jpg',
            'rainbow.jpg',
            'reboot.jpg',
            'rebound.jpg',
            'recursion.jpg',
            'recycle.jpg',
            'regret.jpg',
            'reinforced_body.jpg',
            'reprogram.jpg',
            'rip_and_tear.jpg',
            'scrape.jpg',
            'seek.jpg',
            'self_repair.jpg',
            'skim.jpg',
            'slimed.jpg',
            'stack.jpg',
            'static_discharge.jpg',
            'steam_barrier.jpg',
            'storm.jpg',
            'streamline.jpg',
            'strike.jpg',
            'sunder.jpg',
            'sweeping_beam.jpg',
            'tempest.jpg',
            'thunder_strike.jpg',
            'turbo.jpg',
            'undo.jpg',
            'void.jpg',
            'white_noise.jpg',
            'wound.jpg',
            'writhe.jpg',
            'zap.jpg'
        ];
    }
}