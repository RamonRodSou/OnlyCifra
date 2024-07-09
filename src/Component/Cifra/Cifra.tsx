import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Container, Typography } from '@mui/material'
import { ICifra } from '../../Interface/ICifra'
import BackPage from '../BackPage/BackPage'
import { fireBaseGetById } from '../../api/FireBaseDbCifra'


const Cifra = () => {
  const { id } = useParams<{ id: string }>()
  const [cifra, setCifra] = useState<ICifra | null>(null)


  useEffect(() => {
    if (id) {
      fireBaseGetById(id, setCifra)
    }
  }, [id])

  if (!cifra) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <BackPage icon={true} />
      <Box marginBottom="2rem">
        <Typography variant="body1" component="p" fontSize={'1.5rem'} gutterBottom color={'var(--titleMusic-color)'}>
          {cifra.title}
        </Typography>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="body2" component="p" fontSize={'1.3rem'} gutterBottom color={'var(--tom-color)'}>
            Tom {cifra.tom}
          </Typography>
          <Typography variant="body2" component="p" fontSize={'1.3rem'} gutterBottom color={'var(--singer-color)'}>
            {cifra.singer}
          </Typography>
        </Box>
        <Box width={'100%'} margin={'1rem 0'}>
          {cifra.Struct.map((item, index) => (
            <Box key={index} display={'flex'} flexDirection={'column'} >
              <Typography margin={'0'} variant="body2" component="p" fontSize={'1.7rem'} gutterBottom color={'var(--structure-color)'}>
                {item.section.charAt(0).toUpperCase() + item.section.slice(1)}
              </Typography>
              <Typography variant="body2" component="p" fontSize={'2rem'} gutterBottom color={'var(--grau-color)'} width={'98%'}>
                {item.content.map(word => (
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )).join(' ')}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export default Cifra
