import React, { useState } from 'react'
import guestService from '../services/guest'


const QuoteForm = ({ handleNewQuote }) => {

  const [islLawnMowing,setIslLawnMowing] = useState(false)
  const [isGardening,setIsGardening] = useState(false)
  const [isRubbishRemove,setIsRubbishRemove] = useState(false)
  const [address,setAddress] =useState('')
  const [name,setName] = useState('')
  const [phone,setPhone]= useState('')
  const [email,setEmail]= useState('')
  const [comment,setComment]= useState('')

  const submitQuote = async(event) => {
    event.preventDefault()

    const resGuest = await guestService.create({
      address,
      name,
      phone,
      email,
    }).then(res => res.data)

    // TODO default unit 0 user could change like squres 100, rubish 2(bag)
    const serviceSelected = [
      islLawnMowing && 'Lawn mowing',
      isGardening && 'Gardening',
      isRubbishRemove && 'Rubbish Removal',
    ]
      .filter(Boolean)
      .map(i => ({ item:i  }))

    handleNewQuote({
      serviceItem:serviceSelected,
      comment,
      guestId:resGuest.id
    })
    setName('')
    setAddress('')
    setPhone('')
    setEmail('')
    setComment('')
  }
  return(
    <>
      <form onSubmit={submitQuote}>

        <div>
          <p>choice service</p>
          <ul>
            <li>
              <label>lawn mowing
                <input
                  name="lawn_mowing"
                  type="checkbox"
                  checked={islLawnMowing}
                  onChange={() => setIslLawnMowing(!islLawnMowing)}
                />
              </label>
            </li>

            <li>
              <label>Gardening and landscaping
                <input
                  name="gardening"
                  type="checkbox"
                  checked={isGardening}
                  onChange={() => setIsGardening(!isGardening)}
                />
              </label>
            </li>

            <li>
              <label>Rubbish Removal
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

        <div>Service at
          <input
            value={address}
            onChange={({ target }) => setAddress(target.value)}
          />
        </div>


        <div>name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>

        <div>phone
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>email
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>comment
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