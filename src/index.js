import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import {  BrowserRouter as Router } from 'react-router-dom'
import DateAdapter from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

ReactDOM.render(

  <Provider store={store}>
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Router>
        <App />
      </Router>
    </LocalizationProvider>

  </Provider>,
  document.getElementById('root')
)
