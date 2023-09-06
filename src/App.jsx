import { useEffect, useReducer } from "react";
import Section from "./Section";
import Loader from "./Loader";
import Error from "./Error";
import Header from "./Header";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Statebar from "./StateBar";
import FinishPage from "./FinishPage";
import NextButton from "./NextButton";
import Footer from "./Footer";
import Timer from "./Timer";

/*

*/

const initialState = {
  index: 0,
  score: 0,
  answer: null,
  questions: [],
  status: "loading",
  secondsRemaining: null,
  highscore: 0,
  category: 27,
};

const categoryNum = {
  Animal: 27,
  Sports: 21,
  Art: 25,
  History: 23,
};

const SEC_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataFetched":
      return {
        ...state,
        questions: action.payload,
        status: "dataFetched",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "gaming":
      return {
        ...state,
        status: "gaming",
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
      };

    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === currentQuestion.correct_answer
            ? state.score + 1
            : state.score,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "dataFetched",
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    case "pickCategory":
      return {
        ...state,
        category: action.payload,
      };

    case "default":
      throw new Error("something wrong");
  }
}

export default function App() {
  const [
    {
      index,
      score,
      answer,
      questions,
      status,
      secondsRemaining,
      highscore,
      category,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  useEffect(
    function () {
      fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
      )
        .then((res) => res.json())
        .then((data) =>
          dispatch({ type: "dataFetched", payload: data.results })
        )
        .catch((err) => console.error(err.message));
    },
    [category]
  );
  // console.log(questions, category);
  return (
    <div className='app'>
      <Header />
      <Section>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "dataFetched" && (
          <StartScreen
            dispatch={dispatch}
            numQuestions={numQuestions}
            categoryNum={categoryNum}
          />
        )}
        {status === "gaming" && (
          <div>
            <Statebar
              dispatch={dispatch}
              index={index}
              numQuestions={numQuestions}
              score={score}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              question={questions[index]}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
              category={category}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                index={index}
                numQuestions={numQuestions}
                answer={answer}
              />
            </Footer>
          </div>
        )}
        {status === "finish" && (
          <FinishPage
            highscore={highscore}
            numQuestions={numQuestions}
            score={score}
            dispatch={dispatch}
          />
        )}
      </Section>
    </div>
  );
}
