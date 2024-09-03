import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [deckId, setDeckId] = useState();
  const [cards, setCards] = useState([]);

  // Async function to handle initial API call
  const initialApiCall = async () => {
    try {
      const response = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/"
      );
      setDeckId(response.data.deck_id);
    } catch (error) {
      alert("Error fetching deck:");
    }
  };

  useEffect(() => {
    initialApiCall();
  }, []);

  // Async function to handle drawing a card

  const drawCard = async () => {
    try {
      const response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/`
      );
      const data = await response.json();
      if (data.cards.length > 0) {
        data.cards[0].translate = Math.floor(Math.random() * 10) * 20;

        setCards((prevCards) => [...prevCards, data.cards[0]]);
      }
    } catch (error) {
      console.error("Error drawing card:", error);
    }
  };

  console.log(cards);

  return (
    <div className="App">
      <h1>Deck of Cards</h1>
      <button onClick={drawCard}>Draw a new card</button>
      <div className="card-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className="card"
            style={{
              transform: `rotate(${card.translate}deg) `,
            }}
          >
            <img src={card.image} alt="card" className="card-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
