import React from 'react'

export default function QuoteList({ bookings }){
  return(
    <div>
      <h2>Booking history</h2>
      {bookings.map(q => (
        <div key={q.id}>
          <h4>Date : {q.date}</h4>
          <h4>Service items</h4>
          <ul>
            {q.serviceItem.map(i => (
              <li key={i._id}>{i.item}</li>
            ))}
          </ul>
          <div>comments: {q.comment}</div>
          <div>address: {q.address}</div>
        </div>
      ))}
    </div>
  )
}