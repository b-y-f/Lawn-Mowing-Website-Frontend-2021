import bookingService from '../services/booking'

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