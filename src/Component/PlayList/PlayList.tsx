import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Typography, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { CifraContext } from '../../ContextApi/CifraContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BackPage from '../BackPage/BackPage';
import { fireBaseGetById, fireBaseGetFavorites } from '../../api/FireBaseDbCifra';
import { ICifra } from '../../Interface/ICifra';

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
};

const titleStyle = {
  fontSize: '1rem',
  color: 'var(--titleMusic-color)',
  cursor: 'pointer',
};

const singerStyle = {
  fontSize: '.8rem',
  color: 'var(--singer-color)',
  margin: '-10px 0'
};

const PlayList = () => {
  const { list, setList } = useContext(CifraContext)

  useEffect(() => {
    fireBaseGetFavorites(setList);
  }, [setList])

  return (
    <Container>
      <BackPage icon={true} />
      <Typography variant="h5" gutterBottom>
        PlayList
      </Typography>

      <ListItem component="div" sx={style}>
        {list.length > 0 ? (
          list.map((item) => (
            <Link to={`/cifras/${item.id}`} style={{ textDecoration: 'none', width: '100%', margin: '.7rem' }}>
              <Box width={'100%'} display={'flex'} justifyItems={'space-between'} alignItems={'center'}>
                <Box key={item.id} display={'flex'} flexDirection={'column'} alignItems={'start'} justifyContent={'space-between'} width={'100%'}>
                  <Typography sx={titleStyle} variant='caption'>{item.title}</Typography>
                  <Typography sx={singerStyle} variant='caption'>{item.singer}</Typography>
                </Box>
                <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} width={'30%'} padding={'0 .5rem'}>
                  <FavoriteIcon style={{ color: '#f44336' }} />
                </Box>  
              </Box>

            </Link>

          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            Nenhuma cifra adicionada aos favoritos.
          </Typography>
        )}
      </ListItem>
    </Container>
  );
};

export default PlayList;
