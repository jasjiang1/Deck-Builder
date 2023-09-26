import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { decksRouter } from "./routes/decks.js";
import { cardsRouter } from "./routes/cards.js"; 

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter); 
app.use("/decks", decksRouter); 
app.use("/cards", cardsRouter); 

//use own mongo db link
mongoose.connect(
    "mongodb+srv://jason:jasonpassword@cluster0.ve6yzjz.mongodb.net/decks?retryWrites=true&w=majority", 
); 

app.listen(3001, () => 
    console.log("Server started")
); 