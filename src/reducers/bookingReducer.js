import bookingService from '../services/booking'
import clientService from '../services/client'

const bookingReducer = (state=[],action) => {
  switch (action.type) {
  case 'INIT_BOOKINGS':
    return action.initBookings
  case 'NEW_BOOKING':
    return state.concat(action.newBooking)
  default:
    return state
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