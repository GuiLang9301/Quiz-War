function StartScreen({ dispatch, numQuestions, categoryNum }) {
  return (
    <div className='start'>
      <h2>Welcome to the Quiz War!</h2>
      <h3>{numQuestions} trivia questions to test your knowledge</h3>

      <select
        className='select'
        onChange={(e) =>
          dispatch({ type: "pickCategory", payload: parseInt(e.target.value) })
        }
      >
        {/* <option value={-1}> Select...</option> */}
        <option value={categoryNum.Animal}>Animal</option>
        <option value={categoryNum.Sports}>Sports</option>
        <option value={categoryNum.History}>History</option>
        <option value={categoryNum.Art}>Art</option>
      </select>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: "gaming" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
