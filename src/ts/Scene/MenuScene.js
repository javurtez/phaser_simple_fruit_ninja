import AnimationManager from "../Managers/AnimationManager";
import { Font, Texture } from "../Managers/AssetManager";
import { TBAsset } from "../Trebert/TBAsset";
import { TBUtils } from "../Trebert/TBUtils";
import BaseBitmapText from "../Trebert/Base/BaseBitmapText";
import BaseSlot from "../Trebert/Base/BaseSlot";
import BaseScene from "./BaseScene";
import GameScene from "./GameScene";
import SceneManager from "../Managers/SceneManager";
import BaseSprite from "../Trebert/Base/BaseSprite";
import { TBCloud } from "../Trebert/TBCloud";

export default class MenuScene extends BaseScene {
    /**
     * Unique name of the scene.
     */
    static Name = "MainMenu";

    title;
    playButton;
    hello;

    init() {
        super.init();
    }
    create() {
        super.create();
    }

    initGraphics() {
        this.bg = new BaseSprite(this, TBUtils.config.world.centerX, TBUtils.config.world.centerY, Texture.game_bg);
        this.bg.setOrigin(0.5);

        this.title = new BaseBitmapText(this, TBUtils.config.world.centerX, 100, { font: Font.kenney_pixel, size: 124, align: 1 });
        this.title.setOrigin(0.5);
        this.title.setText("Simple\nFruit Ninja");

        this.playButton = new BaseSlot(this, TBUtils.config.world.centerX, TBUtils.config.world.centerY, { texture: Texture.button_play });
        this.playButton.setOrigin(0.5);
        this.playButton.pointerUp = this.onPlay.bind(this);

        this.rescale(this.scale.baseSize);
    }

    onPlay() {
        this.title.setVisible(false);
        this.playButton.setVisible(false);

        let progressText = new BaseBitmapText(this, TBUtils.config.world.centerX, TBUtils.config.world.centerY, { font: Font.kenney_pixel, align: 1 });
        progressText.setOrigin(0.5);
        TBAsset.loadAssets(this, false, true,
            () => {
                AnimationManager.init(this);
                SceneManager.Instance.transitionToScene(this, GameScene.Name);
            },
            (value) => {
                let percent = Phaser.Math.RoundTo(value * 100, 0).toString();
                progressText.setText(`LOADING...\n${percent}%`);
            });
    }

    // Scaling of the background image depending on the aspect ratio of the device
    rescale(scale) {
        if (scale != undefined) {
            let minAspectRatio = TBCloud.getValue("ASPECTRATIO");
            let actualRatio = (this.scale.parentSize.height / this.scale.parentSize.width);
            let clampedRatio = actualRatio < minAspectRatio ? minAspectRatio : actualRatio;
            this.bg.setScale(clampedRatio * .9);
        }
        this.title.y = TBUtils.config.world.centerY - (TBUtils.config.world.height * .5) + 100;
    }
}
