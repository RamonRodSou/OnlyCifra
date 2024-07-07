import { Box, Button, colors, Container, Grid, ListItem, Typography } from '@mui/material'
import React from 'react'

type Props = {}
 
const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '85vh',
  width: '100%',
  padding:'1rem',
  overflowY: 'auto',
  overflowX: 'hidden',

}

const titleStyle = {
  fontSize: '1.2rem',
  color:'var(--titleMusic-color)'
}

const ListCifra = (props: Props) => {
  return (
    <ListItem  component="div" sx={style}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={'1rem'} width={'100%'}>
        <Grid width={'60%'} display={'flex'} justifyContent={'flex-start'}>
          <Typography sx={titleStyle} variant='caption'>A Terra Clama</Typography>
        </Grid>
        <Grid display={'flex'} alignItems={'center'} justifyContent={'center'} width={'30%'}>
          <Button>Edit</Button>
          <Button>Del</Button>
        </Grid>
      </Box>

      

    </ListItem>
  )
}

export default ListCifra