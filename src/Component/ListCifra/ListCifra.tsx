import React, { useContext, useEffect, useState } from 'react'
import { Box, Grid, IconButton, ListItem, styled, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CifraContext } from '../../ContextApi/CifraContext'
import iconEdit from '../../assets/icon/icon-edit.png'
import iconRemove from '../../assets/icon/icon-remove.png'

import '../../_color.css'

const LinkCifra = styled(Link)({
  textDecoration: 'none',
  display:'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
})

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '85vh',
  width: '100%',
  padding: '1rem',
  overflowY: 'auto',
  overflowX: 'hidden',
}

const titleStyle = {
  fontSize: '1.2rem',
  color: 'var(--titleMusic-color)',
  cursor: 'pointer',
}

const singerStyle = {
  fontSize: '.8rem',
  color: 'var(--singer-color)',
  margin:'-10px 0'
}


const ListCifra = () => {
  const { data, setData, setSelectCifra } = useContext(CifraContext)
  const navigate = useNavigate()
  const BASE_URL: string = 'http://localhost:5000/cifras'
  const [searchTerm, setSearchTerm] = useState('')

  const handleEdit = (id: string | number) => {
    setSelectCifra(id)
    navigate(`/edit/${id}`)
  }

  const handleRemove = async (id: string | number) => {
    const confirmRemoval = window.confirm("Você tem certeza que quer excluir esta cifra?");
  
    if (!confirmRemoval) {
      return;
    }
  
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setData(prevData => prevData.filter(item => item.id !== id));
    } catch (error) {
      console.error("There was an error removing the item:", error);
    }
  }

  useEffect(() => {
    axios.get(BASE_URL).then((res) => {
      setData(res.data)
    }).catch(error => {
      console.error("There was an error fetching the data:", error)
    })
  }, [setData])

  const filteredCifras = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <ListItem component="div" sx={style}>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Pesquisar a Cifra'
        style={{
          marginBottom: '1rem',
          width: '100%',
          height: '2rem',
          fontSize: '1rem',
          padding: '0.5rem',
          color: 'var(--searchParagraohy-color)',
          backgroundColor: 'var(--backGoundSeach-color)',
          borderRadius: '10px',
        }}
      />

      {filteredCifras.length > 0 ? (
        filteredCifras.map((item) => (
          <Box key={item.id} display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={'1rem'} width={'100%'}>
            <LinkCifra to={`/cifras/${item.id}`}>
              <Typography sx={titleStyle} variant='caption'>{item.title}</Typography>
              <Typography sx={singerStyle} variant='caption'>{item.singer}</Typography>
            </LinkCifra>
            <Grid display={'flex'} alignItems={'center'} justifyContent={'flex-end'} width={'30%'} gap={'.5rem'}>
              <IconButton onClick={() => handleEdit(item.id)}>
                <img src={iconEdit} alt='Editar cifra' />
              </IconButton>
              <IconButton onClick={() => handleRemove(item.id)} >
                <img src={iconRemove} alt='Remover cifra' />
              </IconButton>
            </Grid>
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">
          Nenhuma cifra encontrada.
        </Typography>
      )}
    </ListItem>
  )
}

export default ListCifra
