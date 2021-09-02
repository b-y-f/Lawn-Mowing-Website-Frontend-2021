import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBooking } from '../reducers/bookingReducer'

const QuoteForm = () => {

  const dispatch = useDispatch()

  const [islLawnMowing, setIslLawnMowing] = useState(false)
  const [isGardening, setIsGardening] = useState(false)
  const [isRubbishRemove, setIsRubbishRemove] = useState(false)
  const [comment, setComment] = useState('')
  const [address, setAddress] = useState('')

  const submitQuote = async (event) => {
    event.preventDefault()

    const serviceSelected = [
      islLawnMowing && 'Lawn mowing',
      isGardening && 'Gardening',
      isRubbishRemove && 'Rubbish Removal',
    ]
      .filter(Boolean)
      .map((i) => ({ item: i }))

    const booking ={
      serviceItem: serviceSelected,
      comment,
      address,
    }

    dispatch( createBooking(booking) )

    setComment('')
    setAddress('')
  }

  return (
    <>
      <h2>New Quote</h2>
      <form onSubmit={submitQuote}>
        <div>
          <p>choice service</p>
          <ul>
            <li>
              <label>
                lawn mowing
                <input
                  name="lawn_mowing"
                  type="checkbox"
                  checked={islLawnMowing}
                  onChange={() => setIslLawnMowing(!islLawnMowing)}
                />
              </label>
            </li>

            <li>
              <label>
                Gardening and landscaping
                <input
                  name="gardening"
                  type="checkbox"
                  checked={isGardening}
                  onChange={() => setIsGardening(!isGardening)}
                />
              </label>
            </li>

            <li>
              <label>
                Rubbish Removal
                <input
                  name="rubbish_removal"
                  type="checkbox"
                  checked={isRubbishRemove}
                  onChange={() => setIsRubbishRemove(!isRubbishRemove)}
                />
              </label>
            </li>
          </ul>
        </div>

        <div>
          Service at
          <input
            value={address}
            onChange={({ target }) => setAddress(target.value)}
          />
        </div>

        <div>
          comment
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default QuoteForm