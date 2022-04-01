import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer, postAnswer } from './../state/action-creators'

function Quiz(props) {
  const { quiz, selectedAnswer, fetchQuiz, selectAnswer, postAnswer } = props

  useEffect(() => {
    if ( quiz === null) fetchQuiz()
  }, [])

  // const submitHandler = () => {

  // }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={ selectedAnswer === quiz.answers[0].answer_id ? 'answer selected' : 'answer' }>
                {quiz.answers[0].text}
                <button onClick={() => selectAnswer(quiz.answers[0].answer_id)}>
                  { selectedAnswer === quiz.answers[0].answer_id ? 'SELECTED' : 'Select' }
                </button>
              </div>

              <div className={ selectedAnswer === quiz.answers[1].answer_id ? 'answer selected' : 'answer' }>
                {quiz.answers[1].text}
                <button onClick={() => selectAnswer(quiz.answers[1].answer_id)}>
                { selectedAnswer === quiz.answers[1].answer_id ? 'SELECTED' : 'Select' }
                </button>
              </div>
            </div>

            <button onClick={() => postAnswer({ quiz_id: quiz.quiz_id, answer_id: selectedAnswer })} id="submitAnswerBtn" disabled={!selectedAnswer}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  return state
}
 
export default connect(mapStateToProps, { fetchQuiz, selectAnswer, postAnswer })(Quiz)