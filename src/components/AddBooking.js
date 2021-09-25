/* eslint-disable no-unused-vars */
import React from 'react'
import { useForm } from 'react-hook-form'
import { usePlacesWidget } from 'react-google-autocomplete'


import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { Button, Checkbox, Divider } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'


export default function MaterialUIPickers() {
  const [value, setValue] = React.useState(new Date(Date.now() + ( 3600 * 1000 * 24)))

  const { register,control, handleSubmit, watch, formState: { errors } } = useForm()

  const onSubmit = data => console.log(data)

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => console.log(place),
    options: {
      types: ['address'],
      fields:['formatted_address'],
      componentRestrictions: { country: 'nz' },
    },
  })

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const ourServices = [{
    label:'Lawn Mowing',
    name:'lawnMowing'
  },{
    label:'Garbage Collect',
    name:'garbageCollect'
  }, {
    label:'Gardening',
    name:'gardening'
  },{
    label:'Landscaping',
    name:'landscaping'
  }, {
    label:'Gutter Clean',
    name:'gutterCleanning'
  }, {
    label:'Trimming & Pruning',
    name:'trimmingPruning'
  }]

  const isCheckBoxSelected = (checkBoxName) => watch(checkBoxName,false)
  console.log(isCheckBoxSelected)

  return (

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
              value={value}
              {...register('bookingDate')}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />

            <TextField
              {...register('address')}
              inputProps={{ ref: ref }} label="Where to service" variant="outlined" />
            {ourServices.map((service,i) => (
              <Stack key={i} direction="row" spacing={2} alignItems='flex-start'>
                <FormControlLabel {...register(service.name)} control={<Checkbox />} label={service.label} />
                {isCheckBoxSelected(service.name) && <TextField variant="outlined" label={`Notes for ${service.label}(Optional)`} />}
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


  )
}
