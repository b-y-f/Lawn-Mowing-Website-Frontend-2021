import React, { useState } from 'react'


const App =() => {

  const [address,setAddress] =useState('')
  const [checkLawnMowing,setCheckLawnMowing] = useState(false)
  const [name,setName] = useState('')
  const [phone,setPhone]= useState('')
  const [email,setEmail]= useState('')
  const [comment,setComment]= useState('')



  const submitQuote = (event) => {
    event.preventDefault()
    console.log(address,checkLawnMowing,name)
  }




  return (
    <div>
      <div>
        You are guest/ welcome xxx
      </div>
      <h2>Quote</h2>
      <form onSubmit={submitQuote}>

        <div>
          <label>
          lawn mowing
            <input
              name="lawn_mowing"
              type="checkbox"
              checked={checkLawnMowing}
              onChange={() => setCheckLawnMowing(!checkLawnMowing)}
            />
          </label>

          <label>
        Gardening and landscaping
            <input
              name="lawn_mowing"
              type="checkbox"
            />
          </label>

          <label>
        Gutter Clearing
            <input
              name="cutter_clearing"
              type="checkbox"
            />
          </label>

          <label>
        Rubbish Removal
            <input
              name="rubbish_removal"
              type="checkbox"
            />
          </label>
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
    </div>
  )
}

export default App
