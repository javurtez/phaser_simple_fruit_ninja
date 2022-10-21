import BaseScene from "./BaseScene";
import { EventManager } from "../Managers/EventManager";
import BaseBitmapText from "../Trebert/Base/BaseBitmapText";
import { Font, Texture } from "../Managers/AssetManager";
import { TBUtils } from "../Trebert/TBUtils";
import BaseImage from "../Trebert/Base/BaseImage";
import { TBCloud } from "../Trebert/TBCloud";
import SlotWithText from "../Trebert/UI/SlotWithText";
import GameScene from "./GameScene";

export default class PostScene extends BaseScene {
    /**
     * Unique name of the scene.
     */
    static Name = "PostScene";

    scoreText;

    initGraphics() {
        let bg = new BaseImage(this, TBUtils.config.world.centerX, TBUtils.config.world.centerY, Texture.board);
        bg.setOrigin(0.5);
        bg.setScale(1);

        this.scoreText = new BaseBitmapText(this, TBUtils.config.world.centerX, bg.y - 80, { text: "SCORE:\n" + TBCloud.getValue("SCORE"), font: Font.kenney_pixel, size: 84, align: 1 });
        this.scoreText.setTint(0x000000);
        this.scoreText.setOrigin(0.5);

        let retryButton = new SlotWithText(this, TBUtils.config.world.centerX, bg.y + 80, {
            texture: Texture.button,
            text: "RETRY",
            font: Font.kenney_pixel,
            color: 0x000000,
            size: 84,
            align: 1
        });
        retryButton.baseSlot.setScale(2);
        retryButton.pointerUp = this.onRetry.bind(this);
    }

    onRetry() {
        this.scene.get(GameScene.Name).scene.restart();
        this.scene.stop();
    }
}
