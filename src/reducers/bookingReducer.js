import bookingService from '../services/booking'
import clientService from '../services/user'

const bookingReducer = (state=[],action) => {
  switch (action.type) {
  case 'INIT_BOOKINGS':
    return action.initBookings
  case 'NEW_BOOKING':
    return state.concat(action.newBooking)
  case 'CLEAR_BOOKINGS':
    return []
  default:
    return state
  }
}

export function clearBookings(){
  return{
    type:'CLEAR_BOOKINGS'
  }
}

export function initBookingAll(){

  return async dispatch => {
    const initBookings = await bookingService.getAll()
    dispatch({
      type:'INIT_BOOKINGS',
      initBookings
    })
  }
}

export function initBookingById(clientId){
  return async dispatch => {
    // console.log(clientId)
    const initBookings = await clientService.getBookingsById(clientId)
    dispatch({
      type:'INIT_BOOKINGS',
      initBookings
    })
  }
}

export function createBooking(booking){
  return async dispatch => {
    const newBooking = await bookingService.create(booking)
    dispatch({
      type:'NEW_BOOKING',
      newBooking
    })
  }
}

export default bookingReducer