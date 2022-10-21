import { Audio } from "../../Managers/AssetManager";
import AudioManager from "../../Managers/AudioManager";

export default class BaseSlot extends Phaser.GameObjects.Image {

    pointerDown;
    pointerUp;
    pointerOver;
    pointerOut;

    buttonScale = { x: 1, y: 1 };

    constructor(scene, x, y, config) {
        super(scene, x, y,
            config.texture != undefined ? config.texture.path : config.path,
            config.texture != undefined ? config.texture.frame : config.frame);

        let durationTween = config.duration == undefined ? 50 : config.duration;;

        this.setInteractive();
        this.on(Phaser.Input.Events.POINTER_DOWN, () => {
            if (this.pointerDown) {
                this.pointerDown();
                this.setTint(0xFFFFFF);
            }
        }, this);
        this.on(Phaser.Input.Events.POINTER_UP, () => {
            if (this.pointerUp) {
                this.pointerUp();
            }
            AudioManager.Instance.playSFX(Audio.click, config.volume);
        }, this);
        this.on(Phaser.Input.Events.POINTER_OVER, () => {
            if (this.pointerOver) {
                this.pointerOver();
            }
            if (config.willScale != undefined && config.willScale == false) return;
            this.scene.tweens.add({
                targets: this,
                scaleX: this.buttonScale.x * 1.1,
                scaleY: this.buttonScale.y * 1.1,
                duration: durationTween
            });
            this.setTint(0xB1B4B8);
        }, this);
        this.on(Phaser.Input.Events.POINTER_OUT, () => {
            if (this.pointerOut) {
                this.pointerOut();
            }
            if (config.willScale != undefined && config.willScale == false) return;
            this.scene.tweens.add({
                targets: this,
                scaleX: this.buttonScale.x,
                scaleY: this.buttonScale.y,
                duration: durationTween
            });
            this.setTint(0xFFFFFF);
        }, this);

        scene.add.existing(this);
    }

    setImage(texture) {
        this.setTexture(texture.path, texture.frame);
    }

    setScale(x, y = undefined) {
        this.buttonScale.x = x;
        this.buttonScale.y = y == undefined ? x : y;
        return super.setScale(x, y);
    }

    open() {
        this.setActive(true);
        this.setVisible(true);
    }
    close() {
        this.setActive(false);
        this.setVisible(false);
    }
}
