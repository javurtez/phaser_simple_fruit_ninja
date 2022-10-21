export default class BaseTileSprite extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y, width, height, config) {
        super(scene, x, y, width, height, 
            config.texture != undefined ? config.texture.path : config.path, 
            config.texture != undefined ? config.texture.frame : config.frame);

        if (config.pixelize == true) {
            this.texture.setFilter(Phaser.Textures.NEAREST);
        }
        scene.add.existing(this);
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
