import { JSON, Texture } from "../Managers/AssetManager";
import { EventManager } from "../Managers/EventManager";
import JSONManager from "../Managers/JSONManager";
import FruitPhysics from "../Prefab/FruitPhysics";
import BaseSprite from "../Trebert/Base/BaseSprite";
import { TBCloud } from "../Trebert/TBCloud";
import { TBUtils } from "../Trebert/TBUtils";
import BaseScene from "./BaseScene";
import GameUI from "./GameUI";
import PostScene from "./PostScene";

export default class GameScene extends BaseScene {
    /**
     * Unique name of the scene.
     */
    static Name = "MainGame";

    fruits;

    init() {
        super.init();
    }
    create() {
        super.create();

        this.scene.launch(GameUI.Name);
    }

    initProperty() {
        this.fruits = [];
        this.index = Phaser.Math.Between(0, 5);

        this.isHoldingMouse = false;
        this.isDraggingMouse = false;

        TBCloud.setValue("SCORE", 0);
        TBCloud.setValue("TIMER", 30);
    }
    initGraphics() {
        this.bg = new BaseSprite(this, TBUtils.config.world.centerX, TBUtils.config.world.centerY, Texture.game_bg);
        this.bg.setOrigin(0.5);

        let game_fruit_blue = new FruitPhysics(this, this.matter.world, TBUtils.config.world.centerX, 0, "game_fruit_blue");
        this.fruits.push(game_fruit_blue);

        let game_fruit_green = new FruitPhysics(this, this.matter.world, TBUtils.config.world.centerX, 0, "game_fruit_green");
        this.fruits.push(game_fruit_green);

        let game_fruit_orange = new FruitPhysics(this, this.matter.world, TBUtils.config.world.centerX, 0, "game_fruit_orange");
        this.fruits.push(game_fruit_orange);

        let game_fruit_purple = new FruitPhysics(this, this.matter.world, TBUtils.config.world.centerX, 0, "game_fruit_purple");
        this.fruits.push(game_fruit_purple);

        let game_fruit_red = new FruitPhysics(this, this.matter.world, TBUtils.config.world.centerX, 0, "game_fruit_red");
        this.fruits.push(game_fruit_red);

        let game_fruit_yellow = new FruitPhysics(this, this.matter.world, TBUtils.config.world.centerX, 0, "game_fruit_yellow");
        this.fruits.push(game_fruit_yellow);

        this.rescale(this.scale.baseSize);
    }
    initListeners() {
        super.initListeners();

        this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
            // console.log("POINTER_DOWN");
            this.isHoldingMouse = true;
        });
        this.input.on(Phaser.Input.Events.POINTER_DOWN_OUTSIDE, () => {
            console.log("POINTER_DOWN_OUTSIDE");
            this.isHoldingMouse = true;
        });
        this.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer) => {
            if (!this.isHoldingMouse) return;

            this.isDraggingMouse = true;

            for (let i = 0; i < this.fruits.length; i++) {
                let fruit = this.fruits[i];

                if (!fruit.visible) continue;

                let additionalRadius = 0;
                let positionLeft = fruit.x - (fruit.body.circleRadius) - additionalRadius;
                let positionRight = fruit.x + (fruit.body.circleRadius) + additionalRadius;
                let positionTop = fruit.y - (fruit.body.circleRadius) - additionalRadius;
                let positionBottom = fruit.y + (fruit.body.circleRadius) + additionalRadius;

                if (positionLeft < pointer.x && positionRight > pointer.x &&
                    positionTop < pointer.y && positionBottom > pointer.y) {
                    fruit.sliced();
                    let score = JSONManager.Instance.getJSON(JSON.score)[fruit.textureName];
                    TBCloud.modifyValue("SCORE", score);
                    EventManager.UPDATE_UI.emit("SCORE", TBCloud.getValue("SCORE"));
                }
            }
        });
        this.input.on(Phaser.Input.Events.POINTER_UP_OUTSIDE, () => {
            console.log("POINTER_UP_OUTSIDE");
            this.isHoldingMouse = false;
            this.isDraggingMouse = false;
        });
        this.input.on(Phaser.Input.Events.POINTER_UP, () => {
            // console.log("POINTER_UP");
            this.isHoldingMouse = false;
            this.isDraggingMouse = false;
        });

        // Fruit instantiator
        this.time.addEvent({
            delay: 1400,
            callback: () => {
                let randomIndex = this.index;
                let fruit = this.fruits[randomIndex];
                fruit.alive();

                let positionX = Phaser.Math.Between(50, TBUtils.config.world.width - 50);
                let positionY = TBUtils.config.world.centerY + (TBUtils.config.world.height * 0.5) + 10;

                let forceX = Phaser.Math.FloatBetween(0, .24);
                forceX = positionX < TBUtils.config.world.centerX ? forceX : -forceX;
                let forceY = Phaser.Math.FloatBetween(.8, 1);
                fruit.setPosition(positionX, positionY);
                fruit.applyForce({ x: forceX, y: -forceY });

                this.index = (this.index + 1) % this.fruits.length;
            },
            repeat: -1
        });

        // Game timer which starts at 30
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                TBCloud.modifyValue("TIMER", -1);
                let timeLeft = TBCloud.getValue("TIMER");
                EventManager.UPDATE_UI.emit("TIMER", timeLeft);

                if (timeLeft <= 0) {
                    this.scene.pause();
                    this.scene.setVisible(false, GameUI.Name);
                    this.scene.launch(PostScene.Name);
                }
            },
            repeat: 29 //repeat count is 29 since the first event is not included which totals to 30 repeats
        });
    }

    update() {
        let pointer = this.input.mousePointer;
        
        // Resets fruit objects position or attributes
        for (let i = 0; i < this.fruits.length; i++) {
            let fruit = this.fruits[i];
            if (fruit.y > TBUtils.config.world.centerY + (TBUtils.config.world.height * 0.5) + 10 && fruit.isStatic == false) {
                fruit.dead();
            }
            if (fruit.fruitLeft.y > TBUtils.config.world.centerY + (TBUtils.config.world.height * 0.5) + 10) {
                fruit.fruitHide(fruit.fruitLeft);
            }
            if (fruit.fruitRight.y > TBUtils.config.world.centerY + (TBUtils.config.world.height * 0.5) + 10) {
                fruit.fruitHide(fruit.fruitRight);
            }

            // if (!this.isDraggingMouse) continue;
            // if (!fruit.visible) continue;

            // let positionLeft = fruit.x - (fruit.body.circleRadius / 2);
            // let positionRight = fruit.x + (fruit.body.circleRadius / 2);
            // let positionTop = fruit.y - (fruit.body.circleRadius / 2);
            // let positionBottom = fruit.y + (fruit.body.circleRadius / 2);

            // if (positionLeft < pointer.x && positionRight > pointer.x &&
            //     positionTop < pointer.y && positionBottom > pointer.y) {
            //     fruit.sliced();
            //     let score = JSONManager.Instance.getJSON(JSON.score)[fruit.textureName];
            //     TBCloud.modifyValue("SCORE", score);
            //     EventManager.UPDATE_UI.emit("SCORE", TBCloud.getValue("SCORE"));
            // }
        }
    }

    // Scaling of the background image depending on the aspect ratio of the device
    rescale(scale) {
        if (scale != undefined) {
            let minAspectRatio = TBCloud.getValue("ASPECTRATIO");
            let actualRatio = (this.scale.parentSize.height / this.scale.parentSize.width);
            let clampedRatio = actualRatio < minAspectRatio ? minAspectRatio : actualRatio;
            this.bg.setScale(clampedRatio * .9);
        }
    }
    destroy() {
        // Stop the scene that is parallel to this scene
        this.scene.stop(GameUI.Name);

        super.destroy();

        // Clears the events
        EventManager.ON_PAUSE.clear();
        EventManager.ON_UNPAUSE.clear();

        EventManager.CHANGE_LANGUAGE.clear();
        EventManager.UPDATE_UI.clear();
    }
}
