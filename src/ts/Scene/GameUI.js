import BaseScene from "./BaseScene";
import { EventManager } from "../Managers/EventManager";
import BaseBitmapText from "../Trebert/Base/BaseBitmapText";
import { Font } from "../Managers/AssetManager";
import { TBUtils } from "../Trebert/TBUtils";

export default class GameUI extends BaseScene {
    /**
     * Unique name of the scene.
     */
    static Name = "GameUI";

    scoreText;
    timerText;

    initGraphics() {
        this.scoreText = new BaseBitmapText(this, 30, 0, { text: "0", font: Font.kenney_pixel, size: 104, align: 0 });
        this.scoreText.setOrigin(0);

        this.timerText = new BaseBitmapText(this, TBUtils.config.world.width - 30, 0, { text: "30", font: Font.kenney_pixel, size: 104, align: 2 });
        this.timerText.setOrigin(1, 0);

        this.rescale();
    }
    initListeners() {
        super.initListeners();

        EventManager.ON_BLUR.addListener(this.onBlur, this);
        EventManager.ON_FOCUS.addListener(this.onFocus, this);
        EventManager.UPDATE_UI.addListener(this.updateUI, this);
    }

    updateUI(type, data) {
        switch (type) {
            case "SCORE":
                this.scoreText.setText(data);
                break;
            case "TIMER":
                this.timerText.setText(data);
                break;
        }
    }

    onBlur() {
        console.log("BLUR");
    }
    onFocus() {
        console.log("FOCUS");
    }

    rescale() {
        this.scoreText.y = TBUtils.config.world.centerY - (TBUtils.config.world.height * .5);
        this.timerText.y = TBUtils.config.world.centerY - (TBUtils.config.world.height * .5);
    }
    destroy() {
        super.destroy();

        EventManager.ON_BLUR.clear(this);
        EventManager.ON_FOCUS.clear(this);
    }
}
