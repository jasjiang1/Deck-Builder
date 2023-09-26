import { Link } from "react-router-dom";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    //resets cookies, removes the user id and username, and returns to the login/register screen
    const logout = () => { 
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        window.localStorage.removeItem("username");
        navigate("/auth");
    };

    //displays certain page links depending on if they are logged in
    return <div className = "navbar"> 
        <Link to = "/">Home</Link> 
        {!cookies.access_token ? 
            (<Link to = "/auth">Login/Register</Link>):         
            (<>
                <Link to = "/create-card">Create Card</Link>
                <Link to = "/create-deck">Create Deck</Link>
                <Link to = "/saved-decks">Saved Decks</Link>
                <button type = "button" className = "logout" onClick = {logout}>Logout</button>
            </>)
        } 
        </div>
}