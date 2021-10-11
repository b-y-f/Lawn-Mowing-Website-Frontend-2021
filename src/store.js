import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import noticeReducer from './reducers/noticeReducer'
import bookingReducer from './reducers/bookingReducer'


const reducer = combineReducers({
  message: noticeReducer,
  bookings: bookingReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
