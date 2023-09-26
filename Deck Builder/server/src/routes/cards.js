import express from "express";
import { CardModel } from "../models/Cards.js";

const router = express.Router();

//return all cards
router.get("/", async (req, res) => { 
    try {
        const response = await CardModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    };
});

//makes and saves a card
router.post("/", async (req, res) => { 
    const deck = new CardModel(req.body);
    try {
        const response = await deck.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    };
});

export {router as cardsRouter};