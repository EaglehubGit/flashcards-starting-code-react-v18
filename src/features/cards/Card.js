import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCardById } from './cardsSlice';

export default function Card({ id }) {
  // Retrieve the card details for the given cardId from state
  const card = useSelector(state => selectCardById(state, id));
  const [isFlipped, setIsFlipped] = useState(false);



return (
  <li>
    <button className="card" onClick={() => setIsFlipped(!isFlipped)}>
      {isFlipped ? card.back : card.front}
    </button>
  </li>
);
}
