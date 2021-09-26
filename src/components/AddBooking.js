/* eslint-disable no-unused-vars */
import React from 'react'
import { useForm } from 'react-hook-form'
import { usePlacesWidget } from 'react-google-autocomplete'
import bookingService from '../services/booking'


import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { Button, Checkbox, Divider } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import DateAdapter from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

export default function AddBooking() {
  const [defaultDate, setDefaultDate] = React.useState(new Date(Date.now() + ( 3600 * 1000 * 24)))

  const { register,control, handleSubmit, watch, formState: { errors } } = useForm()

  const onSubmit = async data => {
    if(noServiceSelected){
      return alert('Pls check at least one service')
    }
    // console.log(data)

    const bookingData = {
      address:data.address,
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

    const res = await bookingService.create(bookingData)
    console.log('ok!',res)

  }

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    options: {
      types: ['address'],
      fields:['formatted_address'],
      componentRestrictions: { country: 'nz' },
    },
  })

  const handleChange = (newValue) => {
    setDefaultDate(newValue)
  }

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
    name:'gutterCleanning',
    noteName:'noteGutterCleanning'
  }, {
    label:'Trimming & Pruning',
    name:'trimmingPruning',
    noteName:'noteTrimmingPruning'
  }]

  const isCheckBoxSelected = (checkBoxName) => watch(checkBoxName,false)
  // console.log(isCheckBoxSelected)
  const noServiceSelected = watch(ourServices.map(s => s.name), false)
    .every(v => v===false)
  // console.log(notSelectedService)


  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width:1
          },
        }}
      >
        <Paper elevation={1}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
              <DateTimePicker
                label="Date&Time picker"
                value={defaultDate}
                {...register('bookingDate',{ required: true })}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />

              <TextField
                {...register('address', { required: true })}
                inputProps={{ ref: ref }} label="Where to service" variant="outlined" />
              {ourServices.map((service,i) => (
                <Stack key={i} direction="row" spacing={2} alignItems='flex-start'>
                  <FormControlLabel
                    {...register(service.name)}
                    control={<Checkbox />} label={service.label} />
                  {isCheckBoxSelected(service.name) &&
                <TextField
                  {...register(service.noteName)}
                  variant="outlined"
                  label={`Notes for ${service.label}(Optional)`} />}
                </Stack>
              ))}


              <TextField id="note" label="Notes" variant="outlined" />

              <Stack direction="row" spacing={2} justifyContent="center">
                <Button type='submit' variant="contained" color="success">Add</Button>
                <Button variant="contained" color="error">Cancel</Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    </LocalizationProvider>
  )
}
