import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    name:{type:String, required: true},
    imageUrl: {type:String, required:true}
});

export const CardModel = mongoose.model("cards", CardSchema);