import axios from "axios";
import { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useGetUsername } from "../hooks/useGetUsername";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const CreateDeck = ()  => {
    const [cardList, setCardList] = useState([]);
    const [cookies] = useCookies(["access_token"]);
    const [text, setText] = useState("Hover over a card to display its name");
    const userID = useGetUserID();
    const username = useGetUsername();
    const [deck, setDeck] = useState({
        name: "",
        cards: [],
        cardNames: [],
        notes: "",
        userOwner: userID,
        username: username
    });
    const navigate = useNavigate();

    //gets all cards on start up
    useEffect(() => {
        const getCardList = async () => {
            try {
                const response = await axios.get("http://localhost:3001/cards")
                setCardList(response.data);
            } catch (err) {
                console.error(err);
            };
        };
        getCardList();
    });

    //adds the card to the deck
    const imageClick = (event) => {
        const image = event.target.src;
        const cardname = event.target.alt;
        deck.cards.push(image);
        deck.cardNames.push(cardname);
    };

    //changes variable to input
    const handleChange = (event) => {
        const {name, value} = event.target;
        setDeck({...deck, [name]:value});
    };

    //displays card's name on hover
    const mouseOver = (event) => {
        setText(event.target.alt);
    };
    const mouseOut = () => {
        setText("Hover over a card to display its name");
    };

    //removes the clicked card
    const removeCard = (event, index) => {
        for (let i = deck.cards.length; i >= 0; i--) {
            if (i === index) {
                deck.cards.splice(i, 1);
                deck.cardNames.splice(i,1);
            }
        }
        mouseOut();
    };

    //creates the deck and sends to home screen
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            if (deck.name === "" || deck.cards.length === 0 ||deck.notes === "") {
                alert("Missing or invalid inputs");
            }
            else {
                await axios.post("http://localhost:3001/decks", deck, 
                {headers: {authorization: cookies.access_token}});
                alert("Deck created");
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <div>
            <div className = "left-input">
                <h2>Create Deck</h2>
                <form onSubmit = {onSubmit}>
                    <label htmlFor = "name"> Name </label>
                    <input type = "text" id = "name" name = "name" onChange={handleChange} value = {deck.name}/>
                    <label htmlFor = "cards"> Cards </label>
                    <label htmlFor = "card-help">Click a card to add to deck, and click again to remove it</label>
                    <ul className = "create-deck-added-cards">
                        {deck.cards.map((card, index) => (
                            <li className = "image-li" key = {index}>
                                <img    
                                    src = {card} 
                                    alt = {deck.cardNames[index]} 
                                    key = {index}
                                    onClick = {() => removeCard(this, index)}
                                    onMouseOver = {mouseOver}
                                    onMouseOut = {mouseOut}
                                />
                            </li>
                        ))}
                    </ul>
                    <label htmlFor = "notes">Notes</label>
                    <textarea id = "notes" name = "notes" onChange={handleChange} value = {deck.notes}></textarea>
                    <button type = "submit" >Create Deck</button>
                </form>
            </div>

            <ul className = "right-list">
                {cardList.map((card, index) => ( 
                    <li className = "image-li" key = {index}>
                        <img 
                            src = {card.imageUrl} 
                            alt = {card.name} 
                            key = {index}
                            onClick = {imageClick}
                            onMouseOver = {mouseOver}
                            onMouseOut = {mouseOut}
                        />
                    </li>
                ))}
            </ul> 

            <span>Card: {text}</span>
        </div>
    );
};