export default class BaseSprite extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, config) {
        super(scene, x, y,
            config.texture != undefined ? config.texture.path : config.path,
            config.texture != undefined ? config.texture.frame : config.frame);

        if (config.pixelize == true) {
            this.texture.setFilter(Phaser.Textures.NEAREST);
        }
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

    }

    setImage(texture) {
        this.setTexture(texture.path, texture.frame);
    }

    alive() {
        this.setActive(true);
        this.setVisible(true);
    }
    dead() {
        this.setActive(false);
        this.setVisible(false);
    }
}
