import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"

export const Auth = ()  => {
    return (
        <div className = "auth">
            <Login/>
            <Register/>
        </div>
    );
}; 

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // eslint-disable-next-line 
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    //logs the user in, saves the user id, username and token, and sends user to home page
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {username, password});
            if (response.data.message) {
                alert("Incorrect Username or Password")
                setUsername("");
                setPassword("");
            }
            else {
                setCookies("access_token", response.data.token);
                window.localStorage.setItem("userID", response.data.userID);
                window.localStorage.setItem("username", username)
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        };
    }; 
    //inputs all variables to Form, with the corresponding login label and onSubmit
    return ( 
        <Form
            username = {username}
            setUsername = {setUsername}
            password = {password}
            setPassword = {setPassword}
            label = "Login"
            onSubmit = {onSubmit}
        />
    ); 
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //registers the user and clears the fields
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/register", {username, password});
            alert(response.data.message);
            setUsername("");
            setPassword("");
        } catch (err) {
            console.error(err);
        };
    }; 

    //inputs all variables to Form, with the corresponding register label and onSubmit
    return (
        <Form
            username = {username}
            setUsername = {setUsername}
            password = {password}
            setPassword = {setPassword}
            label = "Register"
            onSubmit = {onSubmit}
        />
    );
};

const Form = 
    ({
        username, 
        setUsername, 
        password, 
        setPassword, 
        label, 
        onSubmit
    }) => {
    return (
        <div className = "auth-container">
            <form onSubmit = {onSubmit}>
                <h2>{label}</h2>
                <div className = "form-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type = "text" 
                        id = {label + "username"}
                        value = {username}
                        placeholder = "Username"
                        onChange = {(event) => setUsername(event.target.value)} 
                    />
                </div>
                <div className = "form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type = "password" 
                        id = {label + "password"}
                        value = {password}
                        placeholder = "Password"
                        onChange = {(event) => setPassword(event.target.value)} 
                        />
                </div>
                <button type = "submit">{label}</button>
            </form>
        </div>
    );
};