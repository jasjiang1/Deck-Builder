import axios from "axios";
import { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const Home = ()  => {
    const [decks, setDecks] = useState([]);
    const [savedDecks, setSavedDecks] = useState([]);
    const [cookies] = useCookies(["access_token"]);
    const [text, setText] = useState("Hover over a card to display its name");
    const userID = useGetUserID();

    //gets all decks and saved decks (if logged in)
    useEffect(() => {
        const getDecks = async () => {
            try {
                const response = await axios.get("http://localhost:3001/decks");
                setDecks(response.data);
            } catch (err) {
                console.error(err);
            };
        };
        const getSavedDecks = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/decks/savedDecks/ids/${userID}`);
                setSavedDecks(response.data.savedDecks);
            } catch (err) {
                console.error(err);
            };
        };
        getDecks();
        if (cookies.access_token) getSavedDecks();
    }, [userID, cookies.access_token]);

    //displays card's name on hover
    const mouseOver = (event) => {
        setText(event.target.alt);
    };
    const mouseOut = () => {
        setText("Hover over a card to display its name");
    };

    //saves deck to user
    const saveDeck = async(deckID) => {
        try {
            const response = await axios.put("http://localhost:3001/decks", {deckID, userID}, 
            {headers: {authorization: cookies.access_token}});
            setSavedDecks(response.data.savedDecks);
        } catch (err) {
            console.error(err);
        };
    };

    //allows a visual if the user has saved the deck
    const isDeckSaved = (id) => savedDecks.includes(id);

    return (
        <div className = "all-decks">
            <h1>Decks</h1>
            <ul>
                {decks.map((deck, index) => (
                    <li key = {index}>
                        <h2>{deck.name}</h2>
                        <span>Created by {deck.username}</span>
                        {userID ? 
                            <button type = "button" onClick = {() => saveDeck(deck._id)} disabled = {isDeckSaved(deck._id)}> 
                                {isDeckSaved(deck._id) ? "Saved": "Save"}
                            </button>
                        :null}
                        
                        <ul className = "deck-display">
                            {deck.cards.map((card, index) => (
                                <li className = "image-li" key = {index}>
                                    <img 
                                        src = {card}
                                        alt = {deck.cardNames[index]} 
                                        key = {index}
                                        onMouseOver = {mouseOver}
                                        onMouseOut = {mouseOut}
                                    />
                                </li>
                            ))}
                        </ul>
                        <p>{deck.notes}</p>
                    </li>
                ))}
            </ul>

            <span className = "bottom-text">Card: {text}</span>
        </div>
    );
};
