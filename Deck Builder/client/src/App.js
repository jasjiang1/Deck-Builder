import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreateDeck } from "./pages/create-deck";
import { SavedDecks } from "./pages/saved-decks";
import { CreateCard } from './pages/create-cards';
import { Navbar } from "./components/navbar" 

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/create-card" element = {<CreateCard/>}/>
          <Route path = "/auth" element = {<Auth/>}/>
          <Route path = "/create-deck" element = {<CreateDeck/>}/>
          <Route path = "/saved-decks" element = {<SavedDecks/>}/>
        </Routes>
      </Router>
    </div>
  );
} 

export default App;
