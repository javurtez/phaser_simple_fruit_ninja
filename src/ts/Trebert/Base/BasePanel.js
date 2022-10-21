export default class BasePanel extends Phaser.GameObjects.Container {

    constructor(scene, x, y, config) {
        super(scene, x, y);

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
