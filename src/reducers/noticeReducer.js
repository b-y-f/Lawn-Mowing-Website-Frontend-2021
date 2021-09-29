const noticeReducer = ( state = null, action ) => {
  switch ( action.type ) {
  case 'SET_MESSAGE':
    return action.message
  default:
    return state
  }
}

let timer
export const showMessage = ( message, duration ) => {

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