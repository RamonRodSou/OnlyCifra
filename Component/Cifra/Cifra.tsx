import { Box, Container, Grid, Typography } from '@mui/material'
import '../../_color.css'

import React from 'react'

type Props = {}

const tamanhoLetras = {
  fontSize: '1.7rem',
  
}

const Cifra = (props: Props) => {
  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h4" gutterBottom color={'var(--titleMusic-color)'}>A Terra Clama</Typography>
        <Typography variant="h5" component="h5" gutterBottom color={'var(--tom-color)'}>Tom C</Typography>
      </Box>

      <Box width={'100%'} height={'70vh'} margin={'1rem 0'}>
      <Box>
        <Grid display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'center'}>
          <Typography sx={tamanhoLetras} variant="body1" component="p" gutterBottom color={'var(--structure-color)'}>Verso</Typography>
          <Box>
            <Typography sx={tamanhoLetras} variant="body2" component="p" gutterBottom color={'var( --grau-color)'}>
            | C | G |
            </Typography>
          </Box>
        </Grid>
      </Box>

      <Box>
        <Grid display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'center'}>
          <Typography sx={tamanhoLetras} variant="body1" component="p" gutterBottom color={'var(--structure-color)'}>Refrao</Typography>
          <Box>
            <Typography sx={tamanhoLetras} variant="body2" component="p" gutterBottom color={'var( --grau-color)'}>
            | C | G | Am | F |
            </Typography>
          </Box>
        </Grid>
      </Box>

      <Box>
        <Grid display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'center'}>
          <Typography sx={tamanhoLetras} variant="body1" component="p" gutterBottom color={'var(--structure-color)'}>Ponte</Typography>
          <Box>
            <Typography sx={tamanhoLetras} variant="body2" component="p" gutterBottom color={'var( --grau-color)'}>
            | F | G | Am | Em |
            </Typography>
          </Box>
        </Grid>
      </Box>
      </Box>



    </Container>
  )
}

export default Cifra
