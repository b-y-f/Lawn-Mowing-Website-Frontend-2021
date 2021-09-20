import React from 'react'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardContent'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'



export default function AdminDashboard({ bookings }){
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

  return(
    <>
      {bookings.map(q => (

        <Card key={q.id} className="" style={{ margin: 20 }}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h3">
                {new Date(q.date).toLocaleDateString('nz',options)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <ul>
                  {q.serviceItem.map(i => (
                    <li key={i._id}>{i.item}</li>
                  ))}
                </ul>
            comments: {q.comment}
            address: {q.address}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
        Approve
            </Button>
            <Button size="small" color="secondary">
        Decline
            </Button>
          </CardActions>
        </Card>
      ))}



    </>
  )
}

{/* <div key={q.id}>
<h4>Date : {q.date}</h4>
<h4>Service items</h4>
<ul>
  {q.serviceItem.map(i => (
    <li key={i._id}>{i.item}</li>
  ))}
</ul>
<div>comments: {q.comment}</div>
<div>address: {q.address}</div>
</div> */}