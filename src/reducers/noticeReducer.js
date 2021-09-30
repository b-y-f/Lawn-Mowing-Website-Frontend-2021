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
      message
    })

    setTimeout(() => {
      dispatch({
        type:'SET_MESSAGE',
        message:null
      })
    },duration*1000)
    clearTimeout(timer)
  }
}

export default noticeReducer