import 'phaser';

import MenuScene from './Scene/MenuScene';
import Preloader from './Scene/Preloader';
import GameScene from './Scene/GameScene';
import SplashScreen from './Scene/SplashScreen';
import BootScene from './Scene/BootScene';
import GameUI from './Scene/GameUI';
import { TBUtils } from './Trebert/TBUtils';
import { CONSTANTS } from './Trebert/TBConst';
import PostScene from './Scene/PostScene';

const GameConfig = {
    scale: {
        mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 560,
        height: 1212,
        parent: 'content'
    },
    backgroundColor: CONSTANTS.BackgroundHex,
    type: Phaser.AUTO,
    physics: {
        default: 'matter',
        matter: {
            debug: false
        }
    },
    input: {
        keyboard: true
    },
    title: __PKG_NAME__,
    version: __PKG_VERSION__
};


export default class Game extends Phaser.Game {
    constructor(config) {
        super(config);

        this.scene.add(BootScene.Name, BootScene);
        this.scene.add(Preloader.Name, Preloader);
        this.scene.add(SplashScreen.Name, SplashScreen);
        this.scene.add(MenuScene.Name, MenuScene);
        this.scene.add(GameScene.Name, GameScene);
        this.scene.add(GameUI.Name, GameUI);
        this.scene.add(PostScene.Name, PostScene);

        this.scene.start(BootScene.Name);
    }
}

var game = new Game(GameConfig);
TBUtils.config.game = game;
