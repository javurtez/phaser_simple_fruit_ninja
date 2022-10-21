export default class BaseBitmapText extends Phaser.GameObjects.BitmapText {
    constructor(scene, x, y, config) {
        super(scene, x, y, config.font.path, config.text, config.size, config.align);

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

    open() {
        this.setActive(true);
        this.setVisible(true);
    }
    close() {
        this.setActive(false);
        this.setVisible(false);
    }
}
