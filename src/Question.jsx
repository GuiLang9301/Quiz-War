import React from "react";
import { useEffect, useState } from "react";
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function Question({ dispatch, answer, question }) {
  const [shuffledOptionArray, setShuffledOptionArray] = useState([]);

  useEffect(() => {
    const optionArray = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];
    const shuffledArray = shuffleArray([...optionArray]);
    setShuffledOptionArray(shuffledArray);
  }, [question]);

  const optionElements = shuffledOptionArray.map((option) => {
    const style = question.correct_answer === option ? "correct" : "wrong";
    const answered = answer === option ? "answer" : "";
    return (
      <button
        className={`btn btn-option ${answer !== null ? style : ""} ${answered}`}
        onClick={() => dispatch({ type: "newAnswer", payload: option })}
        disabled={answer !== null}
        key={option}
      >
        {option}
      </button>
    );
  });

  return (
    <div>
      <h3>{question.question}</h3>
      <div className='options'>{optionElements}</div>

      <div>
        {/* <div>{question.category}</div>
        <div>{question.difficulty}</div> */}
      </div>
    </div>
  );
}

export default Question;
