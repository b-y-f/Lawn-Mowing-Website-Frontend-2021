/* eslint-disable no-unused-vars */
import {   MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system'

import React, { useState } from 'react'

const orderBy = [
  {
    value: 'date',
    label: 'Date',
  },
  {
    value: 'name',
    label: 'Worker Name',
  },
  {
    value: 'address',
    label: 'Address',
  },
]

const orderDirection = [
  {
    value: 'asc',
    label: 'Ascending',
  },
  {
    value: 'desc',
    label: 'Descending',
  },
]

export default function FilterAndSortBooking ({ handleSearch,handleSort }){

  const [ order,setOrder ] = useState('desc')
  const [ sortBy, setSortBy ] = useState('date')

  // console.log(order,sortBy)

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: 4/5 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Search address" variant="outlined"
        onChange={(evt) => handleSearch(evt.target.value)} />


      <TextField
        id="outlined-select-currency"
        select
        label="Order by"
        value={sortBy}
        onChange={(evt) => {
          setSortBy(evt.target.value)
          handleSort(order,evt.target.value)

        } }
      >
        {orderBy.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="outlined-select-currency"
        select
        label="Order"
        value={order}
        onChange={(evt) => {
          setOrder(evt.target.value)
          handleSort(evt.target.value,sortBy)

        }}
      >
        {orderDirection.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

    </Box>



  )
}
