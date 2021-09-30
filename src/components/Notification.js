import { React } from 'react'
import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

const Notification =() => {
  const messageObj = useSelector(states => states.message)
  const messageText = messageObj?.text
  const messageType = messageObj?.type

  // console.log(messageType,messageText)


  switch (messageType) {
  case 'error':
    return (
      <Alert severity="error">
        <AlertTitle>{messageText}</AlertTitle>
      </Alert>
    )
  case 'warning':
    return (
      <Alert severity="warning">
        <AlertTitle>{messageText}</AlertTitle>
      </Alert>
    )
  case 'info':
    return (
      <Alert severity="info">
        <AlertTitle>{messageText}</AlertTitle>
      </Alert>
    )
  case 'success':
    return(
      <Alert severity="success">
        <AlertTitle>{messageText}</AlertTitle>
      </Alert>
    )
  default:
    return (<></>)

  }
}


export default Notification