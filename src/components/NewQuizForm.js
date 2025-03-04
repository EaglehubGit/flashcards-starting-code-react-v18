import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addQuiz } from '../features/quizzes/quizzesSlice';
import { selectTopics } from '../features/topics/topicsSlice';
import { v4 as uuidv4 } from 'uuid';
import { addCard } from '../features/cards/cardsSlice';



export default function NewQuizForm() {
  const topics = useSelector(selectTopics);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state to hold the form values
  const [quizName, setQuizName] = useState('');
  // Set default topic to the first available topic if any exist
  const defaultTopicId = Object.keys(topics)[0] || '';
  const [topicId, setTopicId] = useState(defaultTopicId);

  // Local state for cards. Each card is an object with front and back values.
  const [cards, setCards] = useState([
    { front: '', back: '' }
    // You can add more card objects as needed.
  ]);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an array to collect the ids for the cards
    const cardIds = [];    

    // For each card in local state, generate an id, dispatch addCard, and collect its id
    cards.forEach((card) => {
      const cardId = uuidv4();
      cardIds.push(cardId);
      dispatch(addCard({ id: cardId, front: card.front, back: card.back }));
    });
  

    // Generate an id for the new quiz and dispatch addQuiz with the collected cardIds
    const quizId = uuidv4();
    dispatch(addQuiz({ id: quizId, name: quizName, topicId, cardIds }));


    // After creating the quiz (and cards), navigate to the quizzes page
    navigate('/quizzes');    

    // Dispatch the addQuiz action with the new quiz data
    //dispatch(addQuiz({ id, name: quizName, topicId, cardIds: [] }));
    // After dispatching, redirect the user to the /quizzes page
    //navigate('/quizzes');
  };

  return (
    <form onSubmit={handleSubmit} className="new-quiz-form">
      <h2>Create a New Quiz</h2>
      <div>
        <label htmlFor="quizName">Quiz Name:</label>
        <input
          id="quizName"
          type="text"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="topic">Select Topic:</label>
        <select
          id="topic"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
          required
        >
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>
      <div className="cards">
        <h3>Cards</h3>
        {cards.map((card, index) => (
          <div key={index}>

          <button onClick={() => setCards([...cards, { front: '', back: '' }])}>Add Card</button>


            <label htmlFor={`cardFront${index}`}>Front:</label>
            <input
              id={`cardFront${index}`}
              type="text"
              value={card.front}
              onChange={(e) => {
                const newCards = [...cards];
                newCards[index].front = e.target.value;
                setCards(newCards);
              }}
              required
            />
            <label htmlFor={`cardBack${index}`}>Back:</label>
            <input
              id={`cardBack${index}`}
              type="text"
              value={card.back}
              onChange={(e) => {
                const newCards = [...cards];
                newCards[index].back = e.target.value;
                setCards(newCards);
              }}
              required
            />
          </div>
        ))}
        {/* Optionally, add a button to add additional cards */}
      </div>
      <button type="submit">Add Quiz</button>
    </form>
  );
}