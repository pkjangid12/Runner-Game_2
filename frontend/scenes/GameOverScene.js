export default class GameOverScene extends Phaser.Scene {

    constructor() {
        super("GameOverScene");
    }

    create(data) {

        const nameInput = document.getElementById("playerName");
        const submitBtn = document.getElementById("submitScore");

        nameInput.style.display = "block";
        submitBtn.style.display = "block";

        this.background = this.add.tileSprite(
            0,
            0,
            this.scale.width,
            this.scale.height,
            "background"
        ).setOrigin(0);

        const stone = this.add.image(
            700,
            500,
            "stone"
        );

        stone.setScale(0.5);


        submitBtn.onclick = async () => {

            try {

                const playerName = nameInput.value.trim().slice(0, 15);

                if (!playerName) {
                    alert("Please enter your name");
                    return;
                }

                const response = await fetch(
                    "https://runner-game-2.onrender.com/scores",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: playerName,
                            score: data.score
                        })
                    }
                );

                const result = await response.json();
                // alert("Score Saved!");

                nameInput.style.display = "none";
                submitBtn.style.display = "none";

                nameInput.value = "";

                this.scene.start("LeaderboardScene");

            } catch (err) {
                alert("ERROR: " + err.message);

            }

        };

        this.add.text(
            this.scale.width / 2,
            200,
            "GAME OVER",
            {
                fontSize: "64px",
                color: "#ff0000",
                fontStyle: "bold",
                stroke: "#000",
                strokeThickness: 6,
                shadow: {
                    offsetX: 4,
                    offsetY: 4,
                    color: "#000",
                    blur: 4,
                    fill: true
                }
            }
        ).setOrigin(0.5);

        this.add.text(
            this.scale.width / 2,
            320,
            `Final Score: ${data.score}`,
            {
                fontSize: "40px",
                color: "#000",
                fontStyle: "bold",
                stroke: "#fff",
                strokeThickness: 4,
                shadow: {
                    offsetX: 2,
                    offsetY: 2,
                    color: "#fff",
                    blur: 2,
                    fill: true
                }
            }
        ).setOrigin(0.5);

    }

}