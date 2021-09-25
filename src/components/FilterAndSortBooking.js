import {  MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system'

import React, { useState } from 'react'

const orders = [
  {
    value: 'Date',
    label: 'Date',
  },
  {
    value: 'Worker Name',
    label: 'Worker Name',
  },
  {
    value: 'Address',
    label: 'Address',
  },
]

export default function FilterAndSortBooking (){

  const [order, setOrder] = useState('Date')

  const handleChange = (event) => {
    setOrder(event.target.value)
  }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: 4/5 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Search" variant="outlined" />

      <TextField
        id="outlined-select-currency"
        select
        label="Order by"
        value={order}
        onChange={handleChange}
      >
        {orders.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>


      <TextField
        id="outlined-select-currency"
        select
        label="Order ways"
        value={order}
        onChange={handleChange}
      >
        {orders.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>



  )
}
