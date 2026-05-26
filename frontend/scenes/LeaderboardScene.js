
export default class LeaderboardScene extends Phaser.Scene {

    constructor() {
        super("LeaderboardScene");
    }

    async create() {

        // Background
        this.add.tileSprite(
            0,
            0,
            this.scale.width,
            this.scale.height,
            "background"
        ).setOrigin(0);

        // Leaderboard Panel
        const panel = this.add.rectangle(
            this.scale.width / 2,
            this.scale.height / 2,
            1100,
            700,
            0x000000,
            0.75
        );

        panel.setStrokeStyle(4, 0xffffff);

        // Fetch leaderboard data
        const response = await fetch(
            "http://localhost:5000/scores"
        );

        const leaderboard = await response.json();

        // Title
        this.add.text(
            this.scale.width / 2,
            60,
            "🏆 LEADERBOARD",
            {
                fontSize: "56px",
                color: "#FFD700",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        // Player Count
        this.add.text(
            this.scale.width / 2,
            120,
            `Top ${leaderboard.length} Players`,
            {
                fontSize: "24px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);


        this.add.text(
            400,
            160,
            "S.NO",
            {
                fontSize: "28px",
                color: "#FFD700",
                fontStyle: "bold"
            }
        );

        this.add.text(
            570,
            160,
            "PLAYER NAME",
            {
                fontSize: "28px",
                color: "#FFD700",
                fontStyle: "bold"
            }
        );

        this.add.text(
            1000,
            160,
            "SCORE",
            {
                fontSize: "28px",
                color: "#FFD700",
                fontStyle: "bold"
            }
        );


        this.add.line(
            this.scale.width / 2,
            200,
            -25,
            0,
            670,
            0,
            0xffffff
        );

        // Leaderboard Rows
        leaderboard.forEach((player, index) => {
            let color = "#ffffff";
            let playerName = player.name;

            const medals = ["🥇", "🥈", "🥉"];

            if (index < 3) {
                playerName = `${medals[index]} ${player.name}`;
            }

            if (index === 0) color = "#FFD700";
            else if (index === 1) color = "#C0C0C0";
            else if (index === 2) color = "#CD7F32";

            const y = 210 + index * 40;

            this.add.text(
                420,
                y,
                `${index + 1}`,
                {
                    fontSize: "26px",
                    color
                }
            );

            this.add.text(
                590,
                y,
                playerName,
                {
                    fontSize: "26px",
                    color
                }
            );

            this.add.text(
                1020,
                y,
                `${player.score}`,
                {
                    fontSize: "26px",
                    color
                }
            );

        });

        // Play Again Button Background
        const playBtnBg = this.add.rectangle(
            this.scale.width / 2,
            650,
            280,
            60,
            0x00aa00,
        );

        playBtnBg.setStrokeStyle(3, 0xffffff);

        // Make Button Interactive
        playBtnBg.setInteractive({
            useHandCursor: true
        });

        // Button Text
        const playAgain = this.add.text(
            this.scale.width / 2,
            650,
            "PLAY AGAIN",
            {
                fontSize: "36px",
                color: "#ffffff",
                fontStyle: "bold",
                align: "center",
                padding: {
                    x: 20,
                    y: 10
                },
            }
        ).setOrigin(0.5);

        playBtnBg.on("pointerover", () => {

            playBtnBg.setFillStyle(0x00ff00);
            playBtnBg.setScale(1.05);
            playAgain.setScale(1.05);

        });

        playBtnBg.on("pointerout", () => {

            playBtnBg.setFillStyle(0x00aa00);
            playBtnBg.setScale(1);
            playAgain.setScale(1);

        });

        // Restart Game
        playBtnBg.on("pointerdown", () => {
            this.scene.start("GameScene");
        });

    }

}