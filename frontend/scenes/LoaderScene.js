export default class LoaderScene extends Phaser.Scene {

    constructor() {
        super("LoaderScene");
    }

    preload() {
        this.load.image(
            "background",
            "assets/background/background.jpg"
        );

        this.load.spritesheet(
            "player",
            "sprites/player-jump.png",
            {
                frameWidth: 256,
                frameHeight: 256
            }
        );

        this.load.image(
            "star",
            "./assets/collectibles/diamond.png"
        );

        this.load.image(
            "bomb",
            "./assets/collectibles/bomb.png"
        );
    }

    create() {
        console.log("this.background", this.background);

        this.background = this.add.tileSprite(
            0,
            0,
            this.scale.width,
            this.scale.height,
            "background"
        ).setOrigin(0);

        this.background.setDepth(-1);

        const panel = this.add.rectangle(
            this.scale.width / 2,
            this.scale.height / 2,
            700,
            500,
            0x000000,
            0.7
        );

        panel.setStrokeStyle(4, 0xffffff);

        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 3
            }),
            frameRate: 8,
            repeat: -1
        });


        const runner = this.add.sprite(
            500,
            155,
            "player",
            0
        );

        runner.setScale(0.8);

        runner.play("run");

        // Slightly pulse the runner
        this.tweens.add({
            targets: runner,
            scale: 1.05,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.add.text(
            this.scale.width / 2,
            150,
            "RUNNER GAME",
            {
                fontSize: "48px",
                color: "#FFD700",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        this.add.text(
            this.scale.width / 1.9,
            260,
            // "💎 Collect Diamonds = +1 Score",
            "Collect Diamonds = +1 Score",
            {
                fontSize: "30px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        const diamond = this.add.image(
            530,
            260,
            "star"
        );

        diamond.setScale(0.05);

        this.tweens.add({
            targets: diamond,
            y: 265,
            duration: 800,
            yoyo: true,
            repeat: -1
        });


        const bomb = this.add.image(
            600,
            315,
            "bomb"
        );

        bomb.setScale(0.03);

        this.tweens.add({
            targets: bomb,
            y: 320,
            duration: 800,
            yoyo: true,
            repeat: -1
        });



        this.add.text(
            this.scale.width / 2,
            320,
            // "💣 Bomb = -1 Score",
            "Bomb = -1 Score",
            {
                fontSize: "30px",
                color: "#ff5555"
            }
        ).setOrigin(0.5);

        this.add.text(
            this.scale.width / 2,
            380,
            "🪨 Hit Stone = Game Over",
            {
                fontSize: "30px",
                color: "#ff5555"
            }
        ).setOrigin(0.5);

        this.add.text(
            this.scale.width / 2,
            440,
            "⬆️ UP ARROW or SPACE = Jump",
            {
                fontSize: "30px",
                color: "#00ff00"
            }
        ).setOrigin(0.5);

        this.add.text(
            this.scale.width / 2,
            510,
            "Best Experience on Desktop / Laptop",
            {
                fontSize: "20px",
                color: "#00ff00"
            }
        ).setOrigin(0.5);




        const startText = this.add.text(
            this.scale.width / 2,
            560,
            "PRESS ENTER TO START",
            {
                fontSize: "36px",
                color: "#ffff00",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        this.tweens.add({
            targets: startText,
            alpha: 0.2,
            duration: 700,
            yoyo: true,
            repeat: -1
        });



        this.input.keyboard.once(
            "keydown-ENTER",
            () => {
                this.scene.start("GameScene");
            }
        );

        this.input.once(
            "pointerdown",
            () => {
                this.scene.start("GameScene");
            }
        );
    }
}