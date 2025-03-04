import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams, Navigate } from "react-router-dom";
import ROUTES from "../../app/routes";
// import selectors
import { selectTopics } from './topicsSlice';
import { selectQuizzes } from '../quizzes/quizzesSlice';

//export default function Topic() {
  //const topics = {};  // replace with selector
  //const quizzes = {}; // replace with selector
  //const { topicId } = useParams();
  //const topic = topics[topicId];

  export default function Topic() {
    // Extract the topicId parameter from the URL
    const { topicId } = useParams();
    // Retrieve topics and quizzes from the Redux state
    const topics = useSelector(selectTopics);
    const quizzes = useSelector(selectQuizzes);
  
    const topic = topics[topicId];


  if(!topic) {
    return <Navigate to={ROUTES.topicsRoute()} replace/>
  }
  
  const quizzesForTopic = topic.quizIds.map((quizId) => quizzes[quizId]);

  //if (!topic) {
  //  return <div>Topic not found.</div>;
  //}

  // Get the quizzes that are associated with this topic
  //const topicQuizzes = topic.quizIds.map((quizId) => quizzes[quizId]).filter(Boolean);




  return (
    <section>
      <img src={topic.icon} alt="" className="topic-icon" />
      <h1>{topic.name}</h1>
      <ul className="quizzes-list">
        {quizzesForTopic.map((quiz) => (
          <li className="quiz" key={quiz.id}>
            <Link to={ROUTES.quizRoute(quiz.id)}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/quizzes/new" className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
