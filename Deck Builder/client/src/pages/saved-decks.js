import axios from "axios";
import { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedDecks = ()  => {
    const [decks, setDecks] = useState([]);
    const [text, setText] = useState("Hover over a card to display its name");
    const userID = useGetUserID();

    //gets all saved decks on start
    useEffect(() => {
        const getSavedDecks = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/decks/savedDecks/${userID}`);
                setDecks(response.data.savedDecks);
            } catch (err) {
                console.error(err);
            };
        };
        getSavedDecks();
    }, [userID]);
    
    //displays card's name on hover
    const mouseOver = (event) => {
        setText(event.target.alt);
    };
    const mouseOut = () => {
        setText("Hover over a card to display its name");
    };

    return (
        <div className = "all-decks">
            <h1>Saved Decks</h1>
            <ul>
                {decks.map((deck, index) => ( 
                    <li className = "saved-decks" key = {index}>
                        <h2>{deck.name}</h2>
                        <span>Created by {deck.username}</span>
                        <ul className="deck-display">
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
