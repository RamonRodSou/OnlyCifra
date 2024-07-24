import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, ListItem, Typography } from '@mui/material'
import { ICifra } from '../../Interface/ICifra'
import BackPage from '../BackPage/BackPage'
import { fireBaseDelete, fireBaseGetById } from '../../api/FireBaseDbCifra'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CifraContext } from '../../ContextApi/CifraContext'
import EditNoteIcon from '@mui/icons-material/EditNote';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  height: '70vh',
  width: '98%',
  margin: 'rem 0',
  overflowY: 'auto',
  overflowX: 'hidden',
  padding: 0
}

const Cifra = () => {
  const { id } = useParams<{ id: string }>()
  const [cifra, setCifra] = useState<ICifra | null>(null)
  const [onOffDescription, setOnOffDescription] = useState<boolean>(false)
  const [descricao, setDescricao] = useState<string>('Abrir descrição')

  const { setSearchTerm, setSelectCifra } = useContext(CifraContext)


  const navigate = useNavigate()

  1
  function handleDescription() {

    setOnOffDescription(!onOffDescription)
    if (onOffDescription == false) {
      setDescricao('Fechar descrição')
    }
    else {
      setDescricao('Abrir descrição')
    }
  }

  const handleRemove = async (id: any) => {
    const password = prompt('Por favor, insira a senha:')
    if (password !== 'servir') {
      alert('Senha incorreta. Tente novamente.')
      return
    } try {
      await fireBaseDelete(id)
      alert('Cifra Removida')
      setSearchTerm('')

      navigate('/')

    } catch (error) {
      console.error('Erro ao remover a cifra:', error)
    }
  }


  const handleEdit = (id: any) => {
    setSelectCifra(id)
    navigate(`/edit/${id}`)
  }


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
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <BackPage icon={true} />
        <Box width={'20%'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} sx={{ margin: '0 -1rem' }}>
          <EditNoteIcon onClick={() => handleEdit(id)} />
          <DeleteForeverIcon onClick={() => handleRemove(id)} sx={{ color: 'red' }} />
        </Box>
      </Box>

      <Box marginBottom=".1rem">
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
        <ListItem component="div" sx={style}>
          {cifra.Struct.map((item, index) => (
            <Box key={index} display={'flex'} flexDirection={'column'} width={'100%'} >
              <Typography margin={'0'} variant="body2" component="p" fontSize={'1.7rem'} gutterBottom color={'var(--structure-color)'}>
                {item.section.charAt(0).toUpperCase() + item.section.slice(1)}
              </Typography>
              <Typography variant="body2" component="p" fontSize={'2rem'} margin={'0'} gutterBottom color={'var(--grau-color)'} width={'98%'}>
                {item.content.map((word, idx) => (
                  <React.Fragment key={idx}>
                    {word === 'P' || word === 'p' ? <br /> : word.charAt(0).toUpperCase() + word.slice(1)}{' '}

                  </React.Fragment>
                ))}
              </Typography>

            </Box>
          ))}
        </ListItem>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Button onClick={handleDescription} style={{ 'color': 'var(--description-color)', 'padding': ' .5rem  0' }}>{descricao}</Button>
      </Box>


      {onOffDescription &&
        <Box>
          <Typography>
            {cifra.description == '' ? 'Não há descrição' : cifra.description}
          </Typography>
        </Box>}
    </Container>
  )
}

export default Cifra
