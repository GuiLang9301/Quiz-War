function StateBar({ index, numQuestions, score, answer }) {
  return (
    <header className='progress'>
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        Score <strong>{score}</strong> / {numQuestions}
      </p>
    </header>

    // <div>
    //   <div>Question {`${currentNum}/${numQuestions}`}</div>
    //   <div>Score {`${score}/${totalScore}`}</div>
    // </div>
  );
}

export default StateBar;
