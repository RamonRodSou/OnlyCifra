import { Box, Container, Grid, Typography } from '@mui/material'
import StructureCifra from '../StructureCifra/StructureCifra'
import '../../_color.css'

import React from 'react'

type Props = {}

const [cifras, setCifras] = React.useState ([])

const Cifra = (props: Props) => {
  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h4" gutterBottom color={'var(--titleMusic-color)'}>A Terra Clama2</Typography>
        <Typography variant="h5" component="h5" gutterBottom color={'var(--tom-color)'}>Tom C</Typography>
      </Box>

      <Box width={'100%'} height={'70vh'} margin={'1rem 0'}>


      </Box>



    </Container>
  )
}

export default Cifra
