export function sortDescByDate(bookings){
  // console.log('sort',bookings)
  return bookings.sort((a,b) => new Date(b.bookingDate)-new Date(a.bookingDate) )
}

export function sortAscByDate(bookings){
  return bookings.sort((a,b) => new Date(a.bookingDate)- new Date(b.bookingDate) )
}