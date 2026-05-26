export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    preload() {

        this.load.image(
            "background",
            "./assets/background/background.jpg"
        );

        // this.load.image(
        //     "player",
        //     "./assets/player/player.png"
        // );

        this.load.image(
            "star",
            "./assets/collectibles/diamond.png"
        );

        this.load.image(
            "bomb",
            "./assets/collectibles/bomb.png"
        );

        this.load.image(
            "stone",
            "./assets/obstacles/stone.png"
        );


        this.load.audio("jump", "audio/jump.mp3");

        this.load.audio("coin", "audio/coin.mp3");

        this.load.audio("hit", "audio/hit.mp3");

        this.load.audio("gameOver", "audio/gameOver.mp3");


        this.load.spritesheet(
            "player",
            "sprites/player-jump.png",
            {
                frameWidth: 256,
                frameHeight: 256
            }
        );

    }

    create() {
        this.score = 0;
        this.gameSpeed = 4;
        this.timeLeft = 20;

        const width = this.scale.width;
        const height = this.scale.height;

        // all game sounds

        this.jumpSound = this.sound.add("jump");
        this.coinSound = this.sound.add("coin");
        this.hitSound = this.sound.add("hit");
        this.gameOverSound = this.sound.add("gameOver");

        this.background = this.add.tileSprite(
            0,
            0,
            this.scale.width,
            this.scale.height,
            "background"
        ).setOrigin(0);

        this.background.setDepth(-1);

        this.scoreText = this.add.text(
            20,
            20,
            `Score: ${this.score}`,
            {
                fontSize: "32px",
                color: "#fff"
            }
        );

        this.timerText = this.add.text(
            this.scale.width - 200,
            20,
            `Time: ${this.timeLeft}`,
            {
                fontSize: "32px",
                color: "#fff"
            }
        );


        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {

                this.timeLeft--;

                this.timerText.setText(
                    `Time: ${this.timeLeft}`
                );

                if (this.timeLeft <= 0) {

                    this.timerEvent.remove();
                    this.scene.start(
                        "GameOverScene",
                        {
                            score: this.score
                        }
                    );
                }

            },
            loop: true

        });


        // Ground
        this.ground = this.add.rectangle(
            width / 2,
            height - 50,
            width,
            100,
            0x1b5e20
        );

        this.physics.add.existing(this.ground, true);

        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 3
            }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("player", {
                start: 4,
                end: 19
            }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player", {
                start: 20,
                end: 24
            }),
            frameRate: 6,
            repeat: -1
        });

        this.player = this.physics.add.sprite(
            200,
            470,
            "player",
        );

        this.player.setScale(1);

        this.player.play("run");

        this.physics.add.existing(this.player);

        this.player.body.setSize(
            90,
            130
        );

        this.player.body.setOffset(
            80,
            80
        );

        this.player.body.setCollideWorldBounds(true);

        this.physics.add.collider(
            this.player,
            this.ground
        );

        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = [];

        for (let i = 0; i < 2; i++) {
            const star = this.add.image(
                1200 + i * 250,
                250,
                "star"
            );

            star.setScale(0.05);

            this.physics.add.existing(star, true);

            this.stars.push(star);
        }

        this.physics.add.overlap(
            this.player,
            this.stars,
            this.collectStar,
            null,
            this
        );

        this.bombs = [];

        const bomb = this.add.image(
            this.scale.width + 700,
            Phaser.Math.Between(200, 450),
            "bomb"
        );

        bomb.setScale(0.03);

        this.physics.add.existing(bomb, true);

        this.bombs.push(bomb);

        this.physics.add.overlap(
            this.player,
            this.bombs,
            this.collectBomb,
            null,
            this
        );

        this.stones = [];

        for (let i = 0; i < 3; i++) {
            const stone = this.add.image(
                1400 + i * 600,
                this.ground.y - 70,
                "stone"
            );

            stone.setScale(0.07);

            this.physics.add.existing(stone, true);

            this.stones.push(stone);
        }

        this.physics.add.collider(
            this.player,
            this.stones,
            this.gameOver,
            null,
            this
        );

        // Create mobile jump button
        this.jumpBtn = this.add.circle(
            this.scale.width - 100,
            this.scale.height - 100,
            50,
            0xffffff,
            0.4
        );
        this.jumpBtn.setScrollFactor(0);
        this.jumpBtn.setInteractive();

        this.jumpText = this.add.text(
            this.scale.width - 100,
            this.scale.height - 100,
            "JUMP",
            {
                fontSize: "20px",
                color: "#000"
            }
        ).setOrigin(0.5);

        this.jumpBtn.on("pointerdown", () => {

            if (this.player.body.blocked.down) {

                this.player.setVelocityY(-650);
                this.player.play("jump", true);
                this.jumpSound.play();

            }

        });


        const isMobile = this.sys.game.device.os.android ||
            this.sys.game.device.os.iOS;

        if (!isMobile) {
            this.jumpBtn.setVisible(false);
            this.jumpText.setVisible(false);
        }


    }

    update() {

        this.background.tilePositionX += 0.3;

        if (
            (Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
                Phaser.Input.Keyboard.JustDown(this.cursors.space)) &&
            this.player.body.blocked.down
        ) {
            this.player.setVelocityY(-750);

            this.player.play("jump", true);

            this.jumpSound.play();
        }


        if (this.player.body.touching.down) {

            if (
                this.player.anims.currentAnim?.key !== "run"
            ) {
                this.player.play("run", true);
            }

        } else {

            if (
                this.player.anims.currentAnim?.key !== "jump"
            ) {
                this.player.play("jump", true);
            }

        }

        this.stars.forEach(star => {
            if (!star.body) return;
            star.x -= this.gameSpeed;

            if (star.x < -100) {

                star.x =
                    this.scale.width +
                    Phaser.Math.Between(200, 800);

                star.y =
                    Phaser.Math.Between(250, 450);

            }

            star.body.updateFromGameObject();
        });

        this.bombs.forEach(bomb => {
            bomb.x -= this.gameSpeed;

            if (bomb.x < -100) {

                bomb.x =
                    this.scale.width +
                    Phaser.Math.Between(300, 900);

                bomb.y =
                    Phaser.Math.Between(200, 450);

            }
            bomb.body.updateFromGameObject();
        });

        this.stones.forEach(stone => {
            stone.x -= this.gameSpeed;

            if (stone.x < -100) {

                stone.x =
                    this.scale.width +
                    Phaser.Math.Between(300, 1000);

            }
            stone.body.updateFromGameObject();
        });


    }

    updateScore(value) {
        this.score += value;
        if (this.score < 0) {
            this.score = 0;
        }

        this.scoreText.setText(
            `Score: ${this.score}`
        );
    }

    collectStar(player, star) {
        this.updateScore(1);

        star.x =
            this.scale.width +
            Phaser.Math.Between(200, 800);

        star.body.updateFromGameObject();
        this.coinSound.play();

    }

    collectBomb(player, bomb) {
        this.updateScore(-1);
        bomb.x = this.scale.width + 300;
        bomb.body.updateFromGameObject();
        this.hitSound.play();

    }

    gameOver() {

        this.physics.pause();

        this.timerEvent.remove();


        this.scene.start(
            "GameOverScene",
            {
                score: this.score
            }
        );
        this.gameOverSound.play();

    }
}