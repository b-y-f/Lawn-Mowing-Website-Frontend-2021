import React from 'react'
import QuoteForm from './components/QuoteForm'
import quoteService from './services/quote'

const App =() => {

  const handleNewQuote = async(newQuote) => {
    try {
      quoteService.setToken('')
      // TODO create a new user when each time guest quote
      // const guest = await clientService.create(newGuest)
      const quote = await quoteService.create(newQuote)
      console.log(quote)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <div>
        You are guest/ welcome xxx
      </div>
      <h2>Quote</h2>
      <QuoteForm handleNewQuote={handleNewQuote}/>
    </div>
  )
}

export default App
