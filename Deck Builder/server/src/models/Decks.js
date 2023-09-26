import mongoose from "mongoose";

const DeckSchema = new mongoose.Schema({
    name: {type: String, required: true},
    cards: [{type: String, required: true}],
    cardNames: [{type:String, required: true}],
    notes: {type: String, required: true},
    userOwner: {type: mongoose.Schema.Types.ObjectId,ref: "users",required: true},
    username: {type:String, required:true},
});

export const DeckModel = mongoose.model("decks", DeckSchema);