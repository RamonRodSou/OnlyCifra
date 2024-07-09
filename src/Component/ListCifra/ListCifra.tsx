import { Box, Button, Grid, IconButton, ListItem, Typography } from '@mui/material'
import '../../_color.css'
import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { CifraContext } from '../../ContextApi/CifraContext'
import iconEdit from '../../assets/icon/icon-edit.png'
import iconRemove from '../../assets/icon/icon-remove.png'

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
  color: 'var(--titleMusic-color)',
  cursor: 'pointer'
}
const ListCifra = () => {
  const { data, setData, setSelectCifra } = useContext(CifraContext)
  const navigate = useNavigate()
  const BASE_URL: string = 'http://localhost:5000/cifras'


  const handleEdit = (id: string | number) => {
    setSelectCifra(id)
    navigate(`/edit/${id}`)
  }

  const handleRemove = async (id: string | number) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`)
      setData(prevData => prevData.filter(item => item.id !== id))
    } catch (error) {
      console.error("There was an error removing the item:", error)
    }
  }

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
          <Grid display={'flex'} alignItems={'center'} justifyContent={'flex-end'} width={'30%'} gap={'.5rem'}>
            <IconButton onClick={() => handleEdit(item.id)}>
              <img src={iconEdit} alt='Editar cifra' />
            </IconButton>
            <IconButton onClick={() => handleRemove(item.id)} >
              <img src={iconRemove} alt='Remover cifra' />
            </IconButton>

          </Grid>
        </Box>
      ))}
    </ListItem>
  )
}

export default ListCifra
