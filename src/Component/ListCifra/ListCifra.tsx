import React, { useContext, useEffect } from 'react'
import { Box, Grid, ListItem, styled, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { CifraContext } from '../../ContextApi/CifraContext'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import '../../_color.css'
import { fireBaseAddFavorite, fireBaseGet, fireBaseRemoveFavorite } from '../../api/FireBaseDbCifra'
import { ICifra } from '../../Interface/ICifra'

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
  height: '73vh',
  width: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: 0
}

const titleStyle = {
  fontSize: '1rem',
  color: 'var(--titleMusic-color)',
  cursor: 'pointer',
}

const singerStyle = {
  fontSize: '.8rem',
  color: 'var(--singer-color)',
  margin: '-10px 0'
}

const ListCifra = () => {
  const { data, setData, searchTerm, list, setList } = useContext(CifraContext)

  useEffect(() => {
    fireBaseGet(setData)
  }, [setData])

  const handleFavoriteToggle = async (cifra: ICifra) => {
    if (list.some((item) => item.id === cifra.id)) {
      await fireBaseRemoveFavorite(cifra.id)
      setList(list.filter((item) => item.id !== cifra.id))
    } else {
      await fireBaseAddFavorite(cifra)
      setList([...list, cifra])
    }
  }

  const filteredCifras = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <ListItem component="div" sx={style}>
      {filteredCifras.length > 0 ? (
        filteredCifras.map((item) => (
          <Box key={item.id} display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={'.5rem'} width={'100%'}>
            <LinkCifra to={`/cifras/${item.id}`}>
              <Typography sx={titleStyle} variant='caption'>{item.title}</Typography>
              <Typography sx={singerStyle} variant='caption'>{item.singer}</Typography>
            </LinkCifra>
            <Grid display={'flex'} alignItems={'center'} justifyContent={'flex-end'} width={'30%'} padding={'0 .5rem'}>
              {list.some((favItem) => favItem.id === item.id) ? (
                
                <FavoriteIcon style={{ color: '#f44336', cursor: 'pointer' }} onClick={() => handleFavoriteToggle(item)} />
              ) : (
                <FavoriteBorderIcon style={{ cursor: 'pointer' }} onClick={() => handleFavoriteToggle(item)} />
              )}
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
