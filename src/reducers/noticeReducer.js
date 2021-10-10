const noticeReducer = ( state = null, action ) => {
  switch ( action.type ) {
  case 'SET_MESSAGE':
    return action.message
  default:
    return state
  }
}


export const showMessage = ( message, duration ) => {
  let timer
  return dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      message:{
        show:true,
        type:message.type,
        text:message.text
      }
    })

    setTimeout(() => {
      dispatch({
        type:'SET_MESSAGE',
        message:{
          show:false,
          type:message.type,
          text:message.text
        }
      })
    },duration*1000)
    clearTimeout(timer)
  }
}

export default noticeReducer