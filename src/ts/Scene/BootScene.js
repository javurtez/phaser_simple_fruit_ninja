import AudioManager from "../Managers/AudioManager";
import { EventManager } from "../Managers/EventManager";
import JSONManager from "../Managers/JSONManager";
import LocalizationManager from "../Managers/LocalizationManager";
import { CLOUD, SaveManager } from "../Managers/SaveManager";
import SceneManager from "../Managers/SceneManager";
import { TBCloud } from "../Trebert/TBCloud";
import { TBSize } from "../Trebert/TBSize";
import { TBUtils } from "../Trebert/TBUtils";
import SplashScreen from "./SplashScreen";

export default class BootScene extends Phaser.Scene {
    /**
     * Unique name of the scene.
     */
    static Name = "BootScene";

    minAspectRatio;

    preload() {
    }
    create() {
        this.minAspectRatio = 746 / 560; // min aspect ratio is min width over standard height
        this.scale.displaySize = new TBSize(this.scale.displaySize.width, this.scale.displaySize.height, this.scale.displaySize.aspectMode, undefined, this.minAspectRatio);

        TBCloud.setValue("ASPECTRATIO", this.minAspectRatio);

        TBUtils.config.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        };

        SaveManager.init();
        AudioManager.init(this, { bgmVolume: .3, sfxVolume: 1 });
        JSONManager.init(this);
        LocalizationManager.init();
        SceneManager.init();

        this.scale.on(Phaser.Scale.Events.RESIZE, this.rescale, this);
        this.scale.refresh();
        this.game.events.addListener(Phaser.Core.Events.BLUR, this.onBlur, this);
        this.game.events.addListener(Phaser.Core.Events.FOCUS, this.onFocus, this);

        this.nextScene();
    }

    onBlur() {
        AudioManager.Instance.setMute(true, false);
        EventManager.ON_BLUR.emit();
    }
    onFocus() {
        if (TBCloud.getValue(CLOUD.IS_MUTED) == false) {
            AudioManager.Instance.setMute(false, false);
        }
        EventManager.ON_FOCUS.emit();
    }

    nextScene() {
        this.scene.start(SplashScreen.Name);
    }

    destroy() {
        this.scale.off(Phaser.Scale.Events.RESIZE, this.rescale, this);
        this.game.events.removeListener(Phaser.Core.Events.BLUR, this.onBlur);
        this.game.events.removeListener(Phaser.Core.Events.FOCUS, this.onFocus);
    }
    rescale(scale) {
        if (TBUtils.config.world == undefined) return;
        let actualRatio = 0;
        let clampedRatio = 0;
        let isPortrait = undefined;
        switch (this.scale.scaleMode) {
            case Phaser.Scale.FIT:
            case Phaser.Scale.NONE:
                break;
            case Phaser.Scale.WIDTH_CONTROLS_HEIGHT:
                isPortrait = true;
                break;
            case Phaser.Scale.HEIGHT_CONTROLS_WIDTH:
                isPortrait = false;
                break;
            case Phaser.Scale.ENVELOP:
            case Phaser.Scale.RESIZE:
                isPortrait = this.scale.height > this.scale.width;
                break;
        }
        if (isPortrait == undefined) return;

        if (isPortrait == false) {
            actualRatio = (this.scale.parentSize.width / this.scale.parentSize.height);
            clampedRatio = actualRatio < this.minAspectRatio ? this.minAspectRatio : actualRatio;
            TBUtils.config.world.width = this.scale.baseSize.height * clampedRatio;
        }
        else if (isPortrait == true) {
            actualRatio = (this.scale.parentSize.height / this.scale.parentSize.width);
            clampedRatio = actualRatio < this.minAspectRatio ? this.minAspectRatio : actualRatio;
            TBUtils.config.world.height = this.scale.baseSize.width * clampedRatio;

            console.log(TBUtils.config.world.height);
        }
    }
}
