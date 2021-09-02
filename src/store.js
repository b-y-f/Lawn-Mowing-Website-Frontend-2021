import { applyMiddleware, combineReducers, createStore } from 'redux'
import noticeReducer from './reducers/noticeReducer'
import thunk from 'redux-thunk'
import userReducer from './reducers/loginReducer'
import { composeWithDevTools } from 'redux-devtools-extension'


const reducer = combineReducers({
  message: noticeReducer,
  user:userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
