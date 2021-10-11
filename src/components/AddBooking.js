/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePlacesWidget } from 'react-google-autocomplete'
import { useDispatch } from 'react-redux'


import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Box from '@mui/material/Box'
import { Button, Checkbox } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import DateAdapter from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { createBooking } from '../reducers/bookingReducer'
import { showMessage } from '../reducers/noticeReducer'

export default function AddBooking({ handleHideAddBookingButton }) {
  const dispatch = useDispatch()
  const [dateTime, setDateTime] = useState(new Date(Date.now() + ( 3600 * 1000 * 24)))

  const { register,setValue,reset, handleSubmit, watch } = useForm()

  // console.log(watch())

  const handleDateChange = (date) => {
    setValue('bookingDate',date.format())
    setDateTime(date.format())
  }

  // console.log(dateTime)

  const onSubmit = async data => {
    if(noServiceSelected){
      return dispatch(showMessage({ type:'warning', text:'Please check at least one service!' },5))
      // return alert('Pls check at least one service')
    }
    const bookingData = {
      address:data.address,
      bookingNote:data.bookingNote,
      bookingDate:data.bookingDate,
      serviceItem: ourServices.map(s => {
        const serviceName = s.name
        const noteName = s.noteName
        // console.log(data[serviceName])
        if(data[serviceName]){
          return {
            item:s.name,
            serviceComment:data[noteName]
          }
        }
      }).filter(i => i!==undefined)
    }
    // console.log(bookingData)

    // const res = await bookingService.create(bookingData)
    dispatch(createBooking(bookingData))

    dispatch(showMessage({ type:'success', text:'Create new booking OK!!' },5))
    reset()
    // resetSelections()
  }

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    options: {
      types: ['address'],
      fields:['formatted_address'],
      componentRestrictions: { country: 'nz' },
    },
  })

  const ourServices = [{
    label:'Lawn Mowing',
    name:'lawnMowing',
    noteName:'noteLawnMowing'
  },{
    label:'Garbage Collect',
    name:'garbageCollect',
    noteName:'noteGarbageCollect'
  }, {
    label:'Gardening',
    name:'gardening',
    noteName:'noteGardening'
  },{
    label:'Landscaping',
    name:'landscaping',
    noteName:'noteLandscaping'
  }, {
    label:'Gutter Clean',
    name:'gutterCleansing',
    noteName:'noteGutterCleansing'
  }, {
    label:'Trimming & Pruning',
    name:'trimmingPruning',
    noteName:'noteTrimmingPruning'
  }]

  const isCheckBoxSelected = (checkBoxName) => watch(checkBoxName,false)
  // console.log(isCheckBoxSelected('lawnMowing'))
  const noServiceSelected = !watch(ourServices.map(s => s.name)).includes(undefined)? watch(ourServices.map(s => s.name), false)
    .every(v => v===false):true
  console.log('noServiceSelected',noServiceSelected)

  // console.log('Form states',watch())

  const handleCancelButton = () => {
    reset()
    handleHideAddBookingButton()
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 2,
            width:1,
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Date&Time picker"
              value={dateTime}
              {...register('bookingDate',{ required: true })}
              onChange={handleDateChange}
            />

            <TextField
              {...register('address', { required: true })}
              inputProps={{ ref: ref }} label="Where to service" variant="outlined" />
            {ourServices.map((service,i) => (
              <Stack key={i} direction="row" spacing={2} alignItems='flex-start'>
                <FormControlLabel
                  checked={isCheckBoxSelected(service.name) || false}
                  {...register(service.name)}
                  label={service.label}
                  control={<Checkbox />}  />
                {isCheckBoxSelected(service.name) &&
                <TextField
                  {...register(service.noteName)}
                  variant="outlined"
                  label={`Notes for ${service.label}(Optional)`} />}
              </Stack>
            ))}

            <TextField {...register('bookingNote')}
              id="bookingNote" variant="outlined" />

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button type='submit' variant="contained" color="success">Add</Button>
              <Button variant="contained" color="error" onClick={handleCancelButton}>Cancel</Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </LocalizationProvider>
  )
}
