import express from "express";
import { DeckModel } from "../models/Decks.js"; 
import { UserModel } from "../models/Users.js"; 
import { verifyToken } from "./user.js"; 

const router = express.Router();

//gets and returns all decks
router.get("/", async (req, res) => { 
    try {
        const response = await DeckModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    };
});

//makes and saves a new deck
router.post("/", verifyToken, async (req, res) => { 
    const deck = new DeckModel(req.body);
    try {
        const response = await deck.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    };
});

//takes a deck and saves it into the user's savedDecks array
router.put("/", verifyToken, async (req, res) => { 
    const deck = await DeckModel.findById(req.body.deckID);
    const user = await UserModel.findById(req.body.userID);
    try {
        user.savedDecks.push(deck);
        await user.save();
        res.status(201).json({savedDecks: user.savedDecks});
    } catch (err) {
        res.status(500).json(err);
    };
});

//returns the user's saved decks (can return null/undefined)
router.get("/savedDecks/ids/:userID", async (req, res) => { 
    try{
        const user = await UserModel.findById(req.params.userID);
        res.json({savedDecks: user?.savedDecks});
    } catch (err) {
        res.json(err);
    };
});

//return the user's saved decks (including empty arrays)
router.get("/savedDecks/:userID", async (req, res) => { 
    try{
        const user = await UserModel.findById(req.params.userID);
        const savedDecks = await DeckModel.find({
            _id: { $in: user.savedDecks}
        });
        res.json({savedDecks});
    } catch (err) {
        res.json(err);
    };
});

export {router as decksRouter};