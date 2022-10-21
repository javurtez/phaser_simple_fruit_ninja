import { TBCloud } from "../Trebert/TBCloud";
import { CLOUD } from "./SaveManager";

export default class AudioManager {
    audioManagerSingleton;

    sceneSoundManagerManager;

    currentBGMAudio;

    isMute;

    bgmVolume = .5;
    sfxVolume = .5;

    static init(scene, config) {
        if (!AudioManager.audioManagerSingleton) {
            this.audioManagerSingleton = new AudioManager();

            this.audioManagerSingleton.isMute = TBCloud.getValue(CLOUD.IS_MUTED);
            this.audioManagerSingleton.bgmVolume = config.bgmVolume;
            this.audioManagerSingleton.sfxVolume = config.sfxVolume;

            this.audioManagerSingleton.setMute(this.audioManagerSingleton.isMute);

            this.audioManagerSingleton.sceneSoundManager = scene.sound;
        }
        else {
            throw new Error('You can only initialize one manager instance');
        }
    }

    static get Instance() {
        if (!AudioManager.audioManagerSingleton) {
            throw new Error('initialize Instantiator First!');
        }

        return AudioManager.audioManagerSingleton;
    }

    get IsMuted() {
        return this.isMute;
    }

    setBGMVolume(vol) {
        this.bgmVolume = vol;
    }
    setSFXVolume(vol) {
        this.sfxVolume = vol;
    }

    setMute(isMute, isSave = true) {
        this.isMute = isMute;

        if (this.isMute) {
            this.currentBGMAudio?.pause();
        }
        else if (this.isBGMPause()) {
            this.currentBGMAudio?.resume();
        }

        if (isSave == false) return;
        TBCloud.setValue(CLOUD.IS_MUTED, this.isMute);
    }
    playSFX(key, volumeSfx = -1, completeFunc = undefined, context = undefined) {
        let sfx = this.sceneSoundManager.get(key.path);

        if (!sfx) {
            sfx = this.sceneSoundManager.add(key.path, {
                volume: volumeSfx == -1 ? this.sfxVolume : volumeSfx,
                loop: false
            });
        }

        let sfxContext = context == undefined ? this.sceneSoundManager : context;

        if (!this.isMute) {
            sfx.play();

            if (completeFunc != undefined) {
                sfx.on("complete", completeFunc, sfxContext);
            }
        }
        else {
            if (completeFunc != undefined) {
                setTimeout(function () { completeFunc.call(sfxContext); }, sfx.duration * 1000);
            }
        }
    }
    stopSFX(key) {
        let sound = this.sceneSoundManager.get(key.path);
        if (sound != undefined) {
            this.sceneSoundManager.stopByKey(key.path);
        }
    }

    isBGMPause() {
        if (!this.currentBGMAudio) return false;
        return this.currentBGMAudio.isPaused;
    }
    playBGM(key, volume = -1, replayIfSame = false) {
        let bgm = this.sceneSoundManager.get(key.path);

        if (replayIfSame && bgm != undefined) {
            bgm.pause();
        }

        if (volume != -1) {
            this.setBGMVolume(volume);
        }
        if (!bgm || replayIfSame == true) {
            bgm = this.sceneSoundManager.add(key.path, {
                loop: true,
                volume: volume == -1 ? this.bgmVolume : volume
            });
            if (replayIfSame == false) {
                this.currentBGMAudio?.stop();
            }
            this.currentBGMAudio = bgm;
            bgm.play();
        }
        else {
            if (this.currentBGMAudio != bgm) {
                this.currentBGMAudio.pause();
                bgm.play();
                this.currentBGMAudio = bgm;
            }
        }

        if (this.isMute) {
            bgm.pause();
        }
        else if (this.isBGMPause() && this.isMute == false) {
            bgm.resume();
        }
    }
    pauseBGM() {
        if (!this.currentBGMAudio) return;
        this.currentBGMAudio.pause();
    }
}
