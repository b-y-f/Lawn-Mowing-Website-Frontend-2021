import bookingService from '../services/booking'

const bookingReducer = (state=[],action) => {
  switch (action.type) {
  case 'INIT_BOOKINGS':
    return action.bookings
  case 'NEW_BOOKING':
    return state.concat(action.newBooking)
  case 'REMOVE_BOOKING':
    return state.filter(b => b.id!==action.removeBookingId)
  default:
    return state
  }
}

export function initBooking(bookings){
  return{
    type:'INIT_BOOKINGS',
    bookings
  }
}

export function removeBooking(removeBookingId){
  return async dispatch => {
    const res = await bookingService.remove(removeBookingId)
    console.log(res)

    dispatch({
      type:'REMOVE_BOOKING',
      removeBookingId
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