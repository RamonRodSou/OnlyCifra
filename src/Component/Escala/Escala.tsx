import { Box, Typography } from '@mui/material'
import BackPage from '../BackPage/BackPage'

// type Props = {}

const Escala = () => {
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