// Useful if sprite doesn't need transform like scale or rotation.
// They consist of a texture, or frame from a texture, a position and an alpha value. You cannot scale or rotate them.
// If you have a need to blast a large volume of frames around the screen then Blitter objects are well worth investigating.
// This uses a batched drawing method for speed during rendering.
export default class BaseBlitter extends Phaser.GameObjects.Blitter {
    constructor(scene, x, y, config) {
        super(scene, x, y, config.path);

        scene.add.existing(this);
    }

    createBob(x, y, config) {
        return super.create(x, y, config.frame)
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
