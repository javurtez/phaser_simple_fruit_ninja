import { Audio, Font, JSON, Texture } from "../Managers/AssetManager";

export class TBAsset {
    static loadedAssets = [false, false];

    static loadAssets(scene, isInitial, isStartLoad = false, completeFunc = undefined, progressFunc = undefined) {
        scene.load.path = "assets/";

        if (this.loadedAssets[isInitial ? 0 : 1]) {
            completeFunc();
            return;
        }
        
        for (var fileAsset in Texture) {
            let asset = Texture[fileAsset]; //get actual data
            if (this.canLoadAsset(isInitial, asset)) {
                if (asset.frame == undefined) {
                    scene.load.image(asset.path, asset.path)
                }
                else {
                    scene.load.atlas(asset.path, asset.path + ".png", asset.path + ".json");
                }
            }
        }
        for (var fileAsset in Audio) {
            let asset = Audio[fileAsset]; //get actual data
            if (this.canLoadAsset(isInitial, asset)) {
                scene.load.audio(asset.path, [asset.path + ".mp3", asset.path + ".ogg"])
            }
        }
        for (var fileAsset in Font) {
            let asset = Font[fileAsset]; //get actual data
            if (this.canLoadAsset(isInitial, asset)) {
                scene.load.bitmapFont(asset.path, asset.path + ".png", asset.path + ".fnt")
            }
        }
        for (var fileAsset in JSON) {
            let asset = JSON[fileAsset]; //get actual data
            if (this.canLoadAsset(isInitial, asset)) {
                scene.load.json(asset.path, asset.path)
            }
        }

        if (isStartLoad) {
            scene.load.start();
        }
        if (progressFunc != undefined) {
            scene.load.on("progress", progressFunc, scene);
        }
        if (completeFunc != undefined) {
            this.loadedAssets[isInitial ? 0 : 1] = true;
            scene.load.on("complete", completeFunc, scene);
        }
    }

    static canLoadAsset(isInitial, asset) {
        return (isInitial == true && asset.path.includes("Initial")) || (isInitial == false && asset.path.includes("Gameplay"));
    }
}
