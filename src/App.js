import { React, useState } from 'react'
import QuoteForm from './components/QuoteForm'
import quoteService from './services/quote'
import Notification from './components/Notification'


const App =() => {

  const [message, setMessage] = useState('')

  const handleNewQuote = async( quoteObj ) => {
    try {
      await quoteService.create(quoteObj)
        .then(res => res.data)
      setMessage('quote submitted')

      setTimeout(() => {
        setMessage('')
      },3000)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <button>login</button>




      <Notification message={message}/>
      <h2>Quote</h2>
      <QuoteForm handleNewQuote={handleNewQuote}/>
    </div>
  )
}

export default App
