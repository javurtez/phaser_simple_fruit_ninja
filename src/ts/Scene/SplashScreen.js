import BaseScene from "./BaseScene";
import Preloader from "./Preloader";

export default class SplashScreen extends BaseScene {
    /**
     * Unique name of the scene.
     */
    static Name = "SplashScreen";

    init() {
        super.init();
    }
    create() {
        super.create();

        this.nextScene();
    }

    nextScene() {
        this.scene.start(Preloader.Name);
    }

    rescale() {
        super.rescale();
    }
    destroy() {
        super.destroy();
    }
}
