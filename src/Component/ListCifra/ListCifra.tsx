import { useContext, useEffect, useState } from 'react'
import { Box, Grid, IconButton, ListItem, styled, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { CifraContext } from '../../ContextApi/CifraContext'
import iconEdit from '../../assets/icon/icon-edit.png'
import iconRemove from '../../assets/icon/icon-remove.png'

import '../../_color.css'
import { fireBaseDelete, fireBaseGet } from '../../api/FireBaseDbCifra'

const LinkCifra = styled(Link)({
  textDecoration: 'none',
  display: 'flex',
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
  margin: '-10px 0'
}

const ListCifra = () => {
  const { data, setData, setSelectCifra } = useContext(CifraContext)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleEdit = (id: string) => {
    setSelectCifra(id)
    navigate(`/edit/${id}`)
  }

  const handleRemove = async (id:any) => {
    const password = prompt('Por favor, insira a senha:');
    if (password !== 'servir') {
      alert('Senha incorreta. Tente novamente.');
      return;
    }

    try {
      await fireBaseDelete(id)
      window.location.reload()
    } catch (error) {
      console.error('Erro ao remover a cifra:', error);
    }
  }

  useEffect(() => {
    fireBaseGet(setData)
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
