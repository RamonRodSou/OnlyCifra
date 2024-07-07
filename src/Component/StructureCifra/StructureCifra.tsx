import React from 'react'
import { Box, Grid, Typography } from '@mui/material';

type Props = {
    struture: string,
    cifras: string
}

const tamanhoLetras = {
    fontSize: '1.7rem',
  }
  
const StructureCifra = (props: Props) => {
  return (
    
    <Box>
      <Grid display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'center'}>
        <Typography sx={tamanhoLetras} variant="body1" component="p" gutterBottom color={'var(--structure-color)'}>{props.struture}</Typography>
        <Box>
          <Typography sx={tamanhoLetras} variant="body2" component="p" gutterBottom color={'var( --grau-color)'}>
            {props.cifras}
          </Typography>
        </Box>
      </Grid>
    </Box>


  )
}

export default StructureCifra