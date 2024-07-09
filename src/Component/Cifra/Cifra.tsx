import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Container, Typography } from '@mui/material';
import { CifraContext } from '../../ContextApi/CifraContext';
import { ICifra } from '../../Interface/ICifra';

const Cifra = () => {
  const { id } = useParams<{ id: string }>();
  const [cifra, setCifra] = useState<ICifra | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cifras/${id}`);
        setCifra(response.data);
      } catch (error) {
        console.error('Error fetching cifra:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!cifra) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box marginBottom="2rem">
        <Typography variant="h4" component="h4" gutterBottom color={'var(--titleMusic-color)'}>
          {cifra.title}
        </Typography>
        <Typography variant="h5" component="h5" gutterBottom color={'var(--tom-color)'}>
          Tom {cifra.tom}
        </Typography>
        <Box width={'100%'} height={'70vh'} margin={'1rem 0'}>
          {cifra.Struct.map((item, index) => (
            <Box key={index} marginBottom="1rem">
              <Typography variant="h4" component="h4" gutterBottom color={'var(--structure-color)'}>
                {item.section.charAt(0).toUpperCase() + item.section.slice(1)}
              </Typography>
              <Typography variant="h5" component="h5" gutterBottom color={'var(--grau-color)'}>
                {item.content.join(' ')}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Cifra;
