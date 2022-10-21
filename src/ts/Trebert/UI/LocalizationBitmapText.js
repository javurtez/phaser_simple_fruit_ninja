import { Font } from "../../Managers/AssetManager";
import { EventManager } from "../../Managers/EventManager";
import LocalizationManager from "../../Managers/LocalizationManager";
import BaseBitmapText from "../Base/BaseBitmapText";

export default class LocalizationBitmapText extends BaseBitmapText {

    localKey;

    constructor(scene, x, y, config) {
        let locale = LocalizationManager.Instance.getLocalizedTextObject(config.key);

        super(scene, x, y, { font: Font[locale.font], text: locale.text, size: locale.size, align: locale.align, key: config.key });
        this.setTint(locale.color);
    }

    initProperty(config) {
        this.localKey = config.key;
    }
    initListeners() {
        EventManager.CHANGE_LANGUAGE.addListener(() => {
            let locale = LocalizationManager.Instance.getLocalizedTextObject(this.localKey);

            this.align = locale.align;
            this.setFont(Font[locale.font]);
            this.setFontSize(locale.size);
            this.setText(locale.text);
            this.setTint(locale.color);

            if (this.input?.enabled) {
                this.removeInteractive();
                this.scene.time.delayedCall(10, () => {
                    this.setInteractive();
                });
            }
        }, this);
    }
}
