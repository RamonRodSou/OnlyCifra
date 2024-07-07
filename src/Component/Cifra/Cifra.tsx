import { Box, Container, Grid, Typography } from '@mui/material'
import '../../_color.css'
import React from 'react'
import StructureCifra from '../StructureCifra/StructureCifra'

type Props = {}


const cifraData = [
  {
    id: 1,
    title: "A Terra Clama",
    tom: "C",
    cifra: {
      verso: ["| F | G | Am | Em |"],
      refrao: ["| F | G | Am | Em |"],
      ponte:  ["| F | G | Am | Em |"]
    }
  },

]

const tamanhoLetras = {
  fontSize: '1.7rem',

}

const Cifra: React.FC<Props> = () => {

  const [cifra, setCifra] = React.useState(cifraData)

  return (
    <Container>
      {cifra.map((item) => (
        <Box key={item.id} marginBottom="2rem">
          <Typography variant="h4" component="h4" gutterBottom color={'var(--titleMusic-color)'}>
            {item.title}
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom color={'var(--tom-color)'}>
            Tom {item.tom}
          </Typography>

          <Box width={'100%'} height={'70vh'} margin={'1rem 0'}>
            {Object.keys(item.cifra).map((section) => (
              <Box key={section} marginBottom="1rem">
                <Grid display={'flex'} flexDirection={'column'} alignItems={'flex-start'} justifyContent={'center'}>
                  <Typography sx={tamanhoLetras} variant="body1" component="p" gutterBottom color={'var(--structure-color)'}>
                    {section.charAt(0).toUpperCase() + section.slice(1)} 
                  </Typography>
                  <Box>
                    <Typography sx={tamanhoLetras} variant="body2" component="p" gutterBottom color={'var(--grau-color)'}>
                     {item.cifra[section as keyof typeof item.cifra]}
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Container>
  )
}

export default Cifra
