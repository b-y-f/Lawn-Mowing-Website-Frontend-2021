import { React } from 'react'
import { useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'


const Notification =() => {
  const messageObj = useSelector(states => states.message)
  const showMessage = messageObj?.show
  const messageText = messageObj?.text
  const messageType = messageObj?.type
  // console.log('showMessage',showMessage)

  return(
    <Snackbar open={showMessage} autoHideDuration={6000}>
      <Alert severity={messageType} sx={{ width: '100%' }}>
        {messageText}
      </Alert>
    </Snackbar>
  )
}


export default Notification