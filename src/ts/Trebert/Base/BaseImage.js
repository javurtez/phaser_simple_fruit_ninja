export default class BaseImage extends Phaser.GameObjects.Image {
    constructor(scene, x, y, config) {
        super(scene, x, y,
            config.texture != undefined ? config.texture.path : config.path,
            config.texture != undefined ? config.texture.frame : config.frame);

        scene.add.existing(this);
    }

    setImage(texture) {
        this.setTexture(texture.path, texture.frame);
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
