import axios from "axios";
import { useState, useEffect } from "react";

export const CreateCard = ()  => {
    const [cardList, setCardList] = useState([]);
    const [text, setText] = useState("Hover over a card to display its name");
    const [card, setCard] = useState({
        name: "",
        imageUrl: "",
    });

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

    //changes variable to input
    const handleChange = (event) => {
        const {name, value} = event.target;
        setCard({...card, [name]:value});
    };

    //displays card's name on hover
    const mouseOver = (event) => {
        setText(event.target.alt);
    };
    const mouseOut = () => {
        setText("Hover over a card to display its name");
    };

    //checks if the url is an image
    const isImage = (url) => {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }
    
    //makes a new card, and resets inputs
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            if (card.name === "" || !isImage(card.imageUrl)) {
                alert("Missing or invalid inputs");
            }
            else {
                await axios.post("http://localhost:3001/cards", card);
                alert("Card created");
            }
            card.name = "";
            card.imageUrl = "";
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <div>
            <div className = "left-input">
                <h2>Create Card</h2>
                <form onSubmit = {onSubmit}>
                    <label htmlFor = "name">Name:</label>
                    <input type = "text" id = "name" name = "name" onChange={handleChange} value = {card.name}/>
                    <label htmlFor = "imageUrl">Image URL:</label>
                    <input type = "text" id = "imageUrl" name = "imageUrl" onChange={handleChange} value = {card.imageUrl}/>
                    <button type = "submit" >Create Card</button>
                </form>
            </div>

            <ul className = "right-list">
                {cardList.map((card, index) => (
                    <li className = "image-li" key = {index}>
                        <img 
                            src = {card.imageUrl} 
                            alt = {card.name} 
                            key = {index}
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

            
/*

*/