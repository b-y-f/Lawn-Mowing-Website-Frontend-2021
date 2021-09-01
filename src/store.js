import { applyMiddleware, combineReducers, createStore } from 'redux'
import noticeReducer from './reducers/noticeReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  message: noticeReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
