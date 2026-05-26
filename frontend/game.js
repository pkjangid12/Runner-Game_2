import GameScene from "./scenes/GameScene.js";
import GameOverScene from "./scenes/GameOverScene.js";
import LeaderboardScene from "./scenes/LeaderboardScene.js";
import LoaderScene from "./scenes/LoaderScene.js";

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    backgroundColor: "#000000",
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 1000
            },
            debug: false
        }
    },
    scene: [
        LoaderScene,
        GameScene,
        GameOverScene,
        LeaderboardScene
    ]
};

new Phaser.Game(config);