import React, { useState } from 'react'

const QuoteForm = ({ handleNewQuote }) => {

  const [islLawnMowing,setIslLawnMowing] = useState(false)
  const [isGardening,setIsGardening] = useState(false)
  const [isRubbishRemove,setIsRubbishRemove] = useState(false)
  const [address,setAddress] =useState('')
  const [name,setName] = useState('')
  const [phone,setPhone]= useState('')
  const [email,setEmail]= useState('')
  const [comment,setComment]= useState('')

  const submitQuote = (event) => {
    event.preventDefault()

    // TODO default unit 1 user could change like squres 100, rubish 2(bag)
    const serviceSelected = [
      islLawnMowing && 'Lawn mowing',
      isGardening && 'Gardening',
      isRubbishRemove && 'Rubbish Removal',
    ]
      .filter(Boolean)
      .map(i => ({ item:i,unit:1 }))

    handleNewQuote({
      address,
      name,
      phone,
      email,
      comment,
      serviceItem:serviceSelected,
      clientId: '6115431aa4014d0b84f6d288'
    })
    // TODO set all empty after submit
    setName('')
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


        <div>
  name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>

        <div>
  phone
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
  email
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
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