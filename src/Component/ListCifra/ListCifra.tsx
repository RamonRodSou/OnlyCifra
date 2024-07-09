import { Box, Button, Grid, ListItem, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CifraContext } from '../../ContextApi/CifraContext'
import '../../_color.css'

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '85vh',
  width: '100%',
  padding: '1rem',
  overflowY: 'auto',
  overflowX: 'hidden',
}

const titleStyle = {
  fontSize: '1.2rem',
  color: 'var(--titleMusic-color)'
}

const styleLink = {
  width: '60%',
  display: 'flex',
  justifyContent: 'flex-start'
}

const ListCifra = () => {
  const { data, setData, setSelectCifra } = useContext(CifraContext)
  const BASE_URL: string = 'http://localhost:5000/cifras'

  useEffect(() => {
    axios.get(BASE_URL).then((res) => {
      setData(res.data)
    }).catch(error => {
      console.error("There was an error fetching the data:", error)
    })
  }, [setData])

  return (
    <ListItem component="div" sx={style}>
      {data.length > 0 && data.map((item) => (
        <Box key={item.id} display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={'1rem'} width={'100%'}>
          <Link to={`/cifras/${item.id}`} style={{ textDecoration: 'none' }}>
            <Typography sx={titleStyle} variant='caption'>{item.title}</Typography>
          </Link>
          <Grid display={'flex'} alignItems={'center'} justifyContent={'center'} width={'30%'}>
            <Button>Edit</Button>
            <Button>Del</Button>
          </Grid>
        </Box>
      ))}
    </ListItem>
  )
}

export default ListCifra
