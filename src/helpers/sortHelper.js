export function sortBookingsByDate(bookings){
  return bookings.sort((a,b) => new Date(b.date)-new Date(a.date))
}