/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

// UI
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Divider, List, ListItem, Rating, Stack } from '@mui/material'
import Chip from '@mui/material/Chip'
import CancelIcon from '@mui/icons-material/Cancel'
import { red } from '@mui/material/colors'

// functions
import moment from 'moment'
import bookingService from '../services/booking'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from '../reducers/noticeReducer'
import { removeBooking } from '../reducers/bookingReducer'
import FilterAndSortBooking from './FilterAndSortBooking'
import { sortAscByDate, sortDescByDate } from '../helpers/sortHelper'
import { Box } from '@mui/system'


const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))



export default function BookingList(){

  const [filter,setFilter] =useState({
    search:'',
    sort:'desc', //required
    sortBy:'date' //required
  })

  const bookings = useSelector(state => {
    let sortedBookings
    if (filter.sort==='desc'){
      sortedBookings = sortDescByDate(state.bookings)
    }else{
      sortedBookings = sortAscByDate(state.bookings)
    }

    if(filter.search!=='' && filter.search.length>1){
      return sortedBookings.filter(b => b.address.toLowerCase().includes(filter.search))
    }

    return sortedBookings

  })
  console.log(bookings)


  const dispatch = useDispatch()

  const [expanded, setExpanded] = useState(false)


  const handleDelete = async(id) => {
    if (window.confirm('Do you really want to cancel this booking?')) {
      const res = await bookingService.remove(id)
      dispatch(removeBooking(id))
      dispatch(showMessage({ type:'success', text:res.message },5))
      // console.log(res)
    }
  }


  const handleClick = (id) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id]
    })
  }

  // filter and sort
  const handleSearch= (text) => {
    if (text!==''){
      setFilter({ ...filter,search:text })
    }
  }

  const handleSort = ( order, orderBy ) => {
    console.log(order, orderBy)
    setFilter({ ...filter, sort:order,sortBy:orderBy })
  }

  const handleRating = (id,rating) => {
    bookingService.update(id,{ rating }).then((res) => {
      dispatch(showMessage({ type:'success', text:'Your rating has been updated!' },5))
      // console.log('ok',res)
    }).catch(err => {
      console.log(err)
    })
    // console.log(rating,id)
  }

  const handleStatusCondition = (id,status, prevRating) => {
    if (status==='completed'){
      return (
        <Rating
          onChange={(event,newValue) => handleRating(id,newValue)}
          name="half-rating" defaultValue={prevRating} precision={0.5} />
      )
    }
  }

  const handleChip = (status) => {
    console.log(status)
    let color
    switch (status) {
    case 'pending':
      color='primary'
      break
    case 'completed':
      color='secondary'
      break
    case 'approved':
      color='success'
      break
    case 'declined':
      color ='error'
      break
    default:
      break
    }
    return (
      <Chip label={status} color={color} variant="filled"  />
    )
  }

  const handleRenderNote = (bookingNote) => {
    return (
      <>
        <Divider />
        <Typography paragraph >Your Note on Booking:</Typography>
        {bookingNote}
      </>
    )
  }

  const renderNoBookings = () => (
    <>
      <Box
        component="img"
        src="/not-found.svg"
        sx={{ height: 230, width:2/3, mb:2 }}
      />
      <Typography sx={{ mb:2 }} variant="body2" >No booking added...</Typography>
    </>
  )

  return(
    <div>
      <FilterAndSortBooking
        handleSearch={handleSearch}
        handleSort={handleSort} />

      <List>
        <h2>Booking List</h2>
        {bookings.length===0 && renderNoBookings()}

        {bookings.map((booking,i) => (
          <ListItem key={i}>
            <Card sx={{ width:1 }}>
              <CardHeader
                action={
                  <IconButton aria-label="delete" onClick={() => handleDelete(booking.id)}>
                    <CancelIcon sx={{ color: red[600] }} />
                  </IconButton>

                }
                title={moment(booking.bookingDate).format('LL')}
                subheader={moment(booking.bookingDate).format('LT')}
              />

              <CardContent>
                <Typography paragraph>{booking.address} </Typography>
              </CardContent>
              <CardActions>
                <Stack direction="row" spacing={2}>
                  {handleChip(booking.status)}
                  {handleStatusCondition(booking.id,booking.status,booking.rating)}
                </Stack>

                <ExpandMore
                  expand={expanded[i]}
                  onClick={() => handleClick(i) }
                  aria-expanded={expanded[i]}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded[i]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph >Services you picked:</Typography>
                  {booking.serviceItem.map(i => (
                    <div key={i.item}>
                      <Typography variant="overline" paragraph>
                        {i.item}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {i.serviceComment}
                      </Typography>
                    </div>
                  ))}
                  {booking.bookingNote && handleRenderNote(booking.bookingNote)}

                  {booking.worker.length!==0 &&
                    <Typography variant="body2" color="text.secondary" align='right'>
                    Worker: {booking.worker.join(', ')}
                    </Typography>}
                  {booking.adminComment &&
                  <Typography paragraph >Admin comment:{booking.adminComment}</Typography>}
                </CardContent>
              </Collapse>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  )
}