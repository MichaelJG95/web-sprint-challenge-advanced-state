import axios from 'axios'
import { 
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_INFO_MESSAGE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types"
// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { 
  return { type: MOVE_CLOCKWISE }
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE }
 }

export function selectAnswer(id) {
  return { type: SET_SELECTED_ANSWER, payload: id }
 }

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message}
 }

export function setQuiz(data) {
  return { type: SET_QUIZ_INTO_STATE, payload: data}
 }

export function inputChange( name, value ) {
  return { type: INPUT_CHANGE, payload: { name, value } } 
 }

export function resetForm() {
  return { type: RESET_FORM }
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch(setQuiz(null))
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        console.log(res)
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export function postAnswer(data) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post('http://localhost:9000/api/quiz/answer', data)
    .then(res => {
      dispatch(setQuiz(null))
      dispatch(setMessage(res.data.message))
      dispatch(selectAnswer(null))
      dispatch(fetchQuiz())
    })
    .catch(err => {
      console.log(err)
    })
  }
}
export function postQuiz(newQuiz) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post('http://localhost:9000/api/quiz/new', newQuiz)
      .then(res => {
        console.log('from post')
        console.log(res)
        dispatch(setMessage(`Congrats: "${newQuiz.question_text}" is a great question!`))
        dispatch(resetForm())
      })
      .catch(err => {
        console.log(err)
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
