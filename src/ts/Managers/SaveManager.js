import { TBCloud } from "../Trebert/TBCloud";

export const CLOUD = Object.freeze({
    BOOL_FIRST_PLAY: 'BOOL_FIRST_PLAY',
    IS_MUTED: 'IS_MUTED',
    LOCALIZATION: 'LOCALIZATION'
});

export class SaveManager {
    static saveManagerSingleton;

    static init() {
        if (!SaveManager.saveManagerSingleton) {
            this.saveManagerSingleton = new SaveManager();

            this.saveManagerSingleton.loadData();
        }
        else {
            throw new Error('You can only initialize one manager instance');
        }
    }

    static get Instance() {
        if (!SaveManager.saveManagerSingleton) {
            throw new Error('initialize Instantiator First!');
        }

        return SaveManager.saveManagerSingleton;
    }

    SAVE_DATA_PATH = 'Project_Name';
    BUILD_VERSION = "0.0.1";

    initData() {
        console.log("Initializing Data...");
        TBCloud.setValue(CLOUD.BOOL_FIRST_PLAY, true);
        TBCloud.setValue(CLOUD.IS_MUTED, false);
        TBCloud.setValue(CLOUD.LOCALIZATION, "en");
    }

    saveData() {
        console.log("Saving Data...");
        var data = {
            first_play: TBCloud.getValue(CLOUD.BOOL_FIRST_PLAY),
            is_mute: TBCloud.getValue(CLOUD.IS_MUTED),
            localization: TBCloud.getValue(CLOUD.LOCALIZATION)
        }

        localStorage.setItem(this.SAVE_DATA_PATH, JSON.stringify(data));
    }

    loadData() {
        this.initData();

        console.log("Loading Data...");
        var data = JSON.parse(localStorage.getItem(this.SAVE_DATA_PATH));
        if (data == null) {
            console.log("No data found.");
            this.initData();
            this.saveData();
            data = JSON.parse(localStorage.getItem(this.SAVE_DATA_PATH));
        } else {
            console.log("Loaded Data: " + JSON.stringify(data));
        }

        TBCloud.setValue(CLOUD.BOOL_FIRST_PLAY, data.first_play);
        TBCloud.setValue(CLOUD.IS_MUTED, data.is_mute);
        TBCloud.setValue(CLOUD.LOCALIZATION, data.localization);
    }

    resetData() {
        this.initData();
        this.saveData();
    }
}
