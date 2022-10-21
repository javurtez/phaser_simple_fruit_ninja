import LayerManager from "../Managers/LayerManager";
import { LAYER_KEYS } from "../Trebert/TBConst";

export default class BaseScene extends Phaser.Scene {

    layerManager;

    get layer() {
        return this.layerManager;
    }

    init(data = undefined) {
        this.initProperty();
        this.initListeners();

        this.layerManager = new LayerManager(this);
        this.layerManager.addLayer(LAYER_KEYS.LAYER_BACKGROUND);
        this.layerManager.addLayer(LAYER_KEYS.LAYER_FOREGROUND, true);
        this.layerManager.addLayer(LAYER_KEYS.LAYER_PLAYER);
        this.layerManager.addLayer(LAYER_KEYS.LAYER_UI);
    }

    preload() {

    }

    create() {
        this.initGraphics();
    }

    initProperty() {

    }
    initGraphics() {

    }
    initListeners() {
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.destroy, this);
        this.scale.on(Phaser.Scale.Events.RESIZE, this.rescale, this);
    }

    inTransition(duration = 350) {
        this.cameras.main.fadeIn(duration);
    }

    outTransition(duration = 350) {
        this.cameras.main.fadeOut(duration);
        return duration;
    }

    rescale() {

    }
    destroy() {
        this.scale.off(Phaser.Scale.Events.RESIZE, this.rescale, this);

        this.layerManager?.destroy();
        this.layerManager = undefined;
    }
}
