import { Box, Typography } from '@mui/material'
import React from 'react'
import BackPage from '../BackPage/BackPage'

type Props = {}

const Escala = (props: Props) => {
  return (
    <Box padding={'0 2rem'}>
      <BackPage icon={true} />
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'90vh'}>
        <Typography variant='h3'> Manutenção </Typography>
      </Box>
    </Box>
  )
}

export default Escala