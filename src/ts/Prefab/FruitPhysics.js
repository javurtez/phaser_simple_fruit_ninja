import { Audio, Texture } from "../Managers/AssetManager";
import AudioManager from "../Managers/AudioManager";
import BaseSprite from "../Trebert/Base/BaseSprite";
import SliceFruit from "./SliceFruit";

export default class FruitPhysics extends Phaser.Physics.Matter.Sprite {
    config;
    textureName;
    constructor(scene, world, x, y, name) {
        let config = Texture[name];
        super(world, x, y,
            config.texture != undefined ? config.texture.path : config.path,
            config.texture != undefined ? config.texture.frame : config.frame);

        if (config.pixelize == true) {
            this.texture.setFilter(Phaser.Textures.NEAREST);
        }

        this.textureName = name;
        this.config = config;

        this.setCircle(60);
        this.setSensor(true);
        this.setStatic(true);
        this.setVisible(false);

        scene.add.existing(this);

        this.initProperty(config);
        this.initListeners();
        this.initGraphics();
    }

    initProperty(config) {

    }
    initListeners() {

    }
    initGraphics() {
        this.fruitLeft = new SliceFruit(this.scene, this.scene.matter.world, this.x - 10, this.y, Texture[this.textureName + "_l"]);
        this.fruitRight = new SliceFruit(this.scene, this.scene.matter.world, this.x + 10, this.y, Texture[this.textureName + "_r"]);

        this.spark = new BaseSprite(this.scene, 0, 0, Texture[this.textureName + "_s"]);
        this.spark.setVisible(false);
    }

    sliced() {
        AudioManager.Instance.playSFX(Audio.sword_unsheathing);

        this.dead();

        this.spark.setPosition(this.x, this.y);
        this.spark.setVisible(true);

        this.scene.time.delayedCall(300, () => {
            this.spark.setVisible(false);
        })

        this.fruitShow(this.fruitLeft, this.x - 40);
        this.fruitShow(this.fruitRight, this.x + 40);

        this.fruitLeft.applyForce({ x: -.05, y: -Phaser.Math.FloatBetween(0, 0.12) });
        this.fruitRight.applyForce({ x: .05, y: -Phaser.Math.FloatBetween(0, 0.12) });
    }
    fruitShow(object, x) {
        object.angle = Phaser.Math.Between(0, 90);

        object.setStatic(false);
        object.setVisible(true);
        object.setVelocity(0);

        object.setPosition(x, this.y);
    }
    fruitHide(object) {
        object.y = 0;
        object.setVisible(false);
        object.setStatic(true);
        object.setVelocity(0);
    }

    alive() {
        this.spark.setVisible(false);

        this.setActive(true);
        this.setVisible(true);

        this.setStatic(false);
        this.setVelocity(0);
    }
    dead() {
        this.setActive(false);
        this.setVisible(false);

        this.setStatic(true);
        this.setVelocity(0);
    }
}
