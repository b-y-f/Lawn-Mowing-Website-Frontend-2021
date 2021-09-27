import { React } from 'react'
import { useSelector } from 'react-redux'

const Notification =() => {
  const message = useSelector(states => states.message)
  return(
    <>
      {message}
    </>
  )
}

export default Notification