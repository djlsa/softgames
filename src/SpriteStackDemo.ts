import { ResizeContainer } from './ResizeContainer';
import { LoadManager } from './LoadManager';
import { Sprite, Container, Point } from 'pixi.js';
import { SpriteManager } from './SpriteManager';
import { Tween } from './Tween';

export class SpriteStackDemo extends ResizeContainer {

    private static CARD_WIDTH = 188;
    private static CARD_HEIGHT = 138;

    private cardStack: Container = new Container();
    private cards: Array<Sprite> = [];

    updatePositions() {
        this.cardStack.x = window.innerWidth / 2;
        this.cardStack.y = window.innerHeight / 2;
    }

    private load() {
        this.alreadyLoaded = true;
        LoadManager.add(this.assets, () => {
            for(const i in this.assets) {
                const card: Sprite = SpriteManager.get(this.assets[i]);
                this.cards.push(card);
            }
            const missing = 144 - this.cards.length;
            const random = Math.floor(Math.random() * (this.cards.length - missing));
            const slice = this.cards.slice(random, random + missing);
            for(const i in slice) {
                this.cards.push(new Sprite(slice[i].texture));
            }
            for(let i = this.cards.length - 1; i > 0; i--) {
                const current = this.cards[i];
                const random = Math.floor(Math.random() * (i + 1));
                this.cards[i] = this.cards[random];
                this.cards[random] = current;
            }
            this.addChild(this.cardStack);
            this.updatePositions();
            for(let i = this.cards.length - 1; i > 0; i--) {
                const card = this.cards[i];
                card.width = SpriteStackDemo.CARD_WIDTH;
                card.x = card.width * -1;
                card.height = SpriteStackDemo.CARD_HEIGHT;
                card.pivot = new Point(card.width / 2, card.width / 2);
                card.rotation = (-15 + Math.floor(Math.random() * 30)) * (Math.PI / 180);
                //card.y = y++;
                this.cardStack.addChild(card);
                new Tween(card, {
                    property: 'x',
                    start: card.x,
                    end: SpriteStackDemo.CARD_WIDTH * 1,
                    time: 2000,
                    delay: 1000 * i,
                    onStart: () => {
                        this.cardStack.removeChild(card);
                        this.cardStack.addChild(card);
                    }
                }).start();
                new Tween(card, {
                    property: 'rotation',
                    start: card.rotation,
                    end: (-15 + Math.floor(Math.random() * 30)) * (Math.PI / 180),
                    time: 2000,
                    delay: 1000 * i
                }).start();
            }
        }, './assets/sprites/');
    }

    constructor() {
        super();
        this.on('added', () => {
            if(!this.alreadyLoaded)
                this.load();
        });
    }

    private assets: Array<string> = [
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
        'zap.jpg', 
    ];
}