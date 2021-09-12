import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import noticeReducer from './reducers/noticeReducer'
import userReducer from './reducers/loginReducer'
import bookingReducer from './reducers/bookingReducer'
import adminReducer from './reducers/adminReducer'


const reducer = combineReducers({
  message: noticeReducer,
  user:userReducer,
  bookings: bookingReducer,
  admin: adminReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
