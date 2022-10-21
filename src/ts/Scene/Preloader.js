import SceneManager from "../Managers/SceneManager";
import { TBAsset } from "../Trebert/TBAsset";
import BaseScene from "./BaseScene";
import MenuScene from "./MenuScene";

export default class Preloader extends BaseScene {
    /**
     * Unique name of the scene.
     */
    static Name = "Preloader";

    preload() {
        TBAsset.loadAssets(this, true, false, this.nextScene);
    }

    nextScene() {
        SceneManager.Instance.transitionToScene(this, MenuScene.Name);
    }

    rescale() {
        super.rescale();
    }
    destroy() {
        super.destroy();
    }
}
