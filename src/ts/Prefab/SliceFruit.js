export default class SliceFruit extends Phaser.Physics.Matter.Sprite {

    constructor(scene, world, x, y, config) {
        super(world, x, y,
            config.texture != undefined ? config.texture.path : config.path,
            config.texture != undefined ? config.texture.frame : config.frame);

        if (config.pixelize == true) {
            this.texture.setFilter(Phaser.Textures.NEAREST);
        }

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
    }
}
