const express = require("express");
const router = express.Router();

const Score = require("../models/Score");


router.post("/", async (req, res) => {

    try {

        const { name, score } = req.body;

        const newScore = new Score({
            name,
            score
        });

        await newScore.save();

        res.status(201).json({
            message: "Score Saved"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

});

router.get("/", async (req, res) => {

    try {

        // const scores = await Score.find()
        //     .sort({ score: -1 });

        // res.json(scores);

        const scores = await Score.find()
            .sort({ score: -1 })
            .limit(10);

        res.json(scores);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;