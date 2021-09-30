/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Divider, List, ListItem } from '@mui/material'
import Chip from '@mui/material/Chip'
import moment from 'moment'
import bookingService from '../services/booking'
import CancelIcon from '@mui/icons-material/Cancel'
import { red } from '@mui/material/colors'
import { useDispatch } from 'react-redux'
import { showMessage } from '../reducers/noticeReducer'
import { removeBooking } from '../reducers/bookingReducer'


const ExpandMore = styled((props) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))



export default function BookingList({ bookings }){

  const dispatch = useDispatch()

  const [expanded, setExpanded] = useState(false)


  const handleDelete = async(id) => {
    if (window.confirm('Do you really want to cancel this booking?')) {
      const res = await bookingService.remove(id)
      dispatch(removeBooking(id))
      dispatch(showMessage({ type:'success', text:'zzzz' },5))
      // console.log(res)
    }
  }


  const handleClick = (id) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id]
    })
  }
  return(
    <div>
      <List>
        <h2>Booking List</h2>
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
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <Chip label={booking.status} color="primary" variant="outlined"  />

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
                      <Typography variant="body2" paragraph>
                        {i.item}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {i.serviceComment}
                      </Typography>
                      <Divider />
                    </div>
                  ))}

                  {booking.worker &&
                    <Typography variant="body2" color="text.secondary" align='right'>
                    Worker: {booking.worker}
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