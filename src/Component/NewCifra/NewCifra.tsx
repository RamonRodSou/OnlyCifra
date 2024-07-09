import React, { useState } from 'react'
import axios from 'axios'
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material'
import { IStruct } from '../../Interface/ICifra'
import icon from '../../assets/icon/icon-del.png'
import BackPage from '../BackPage/BackPage'

const styleForm = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'var(--backGound-color)',
  padding: '1.5rem',
  borderRadius: '10px'

}

const styleIconDel = {
  position: 'relative',
  right: '-.8em',
  top: '.5rem',
  cursor: 'pointer',
  height: '30px'
}

const RegistrarCifra = () => {
  const [title, setTitle] = useState<string>('')
  const [tom, setTom] = useState<string>('')
  const [struct, setStruct] = useState<IStruct[]>([{ section: '', content: [''] }])

  const handleStructChange = (index: number, key: keyof IStruct, value: string) => {
    const newStruct = [...struct]
    if (key === 'content') {
      newStruct[index][key] = value.split(' ')
    } else {
      newStruct[index][key] = value
    }
    setStruct(newStruct)
  }

  const addSection = () => {
    setStruct([...struct, { section: '', content: [''] }])
  }

  const removeSection = (index: number) => {
    setStruct(struct.filter((_, i) => i !== index));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/cifras', {
        title,
        tom,
        Struct: struct
      })
      setTitle('')
      setTom('')
      setStruct([{ section: '', content: [' '] }])
    } catch (error) {
      console.error('Error registering cifra:', error)
    }
  }

  return (
    <Container sx={styleForm}>
      <Typography variant="h4" component="h1" gutterBottom color={'var(--titleNewCifra-color)'}>
        Nova Cifra
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box marginBottom="1rem">
          <TextField
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box marginBottom="1rem">
          <TextField
            label="Tom"
            value={tom}
            onChange={(e) => setTom(e.target.value)}
            fullWidth
            required
          />
        </Box>
        {struct.map((item, index) => (
          <Box key={index} display="flex" flexDirection={'column-reverse'} alignItems="flex-end" marginBottom=".5rem">
            <Box key={index} marginBottom=".2rem">
              <TextField
                label="Estrutura"
                value={item.section}
                onChange={(e) => handleStructChange(index, 'section', e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Cifra"
                value={item.content.join(' ')}
                onChange={(e) => handleStructChange(index, 'content', e.target.value)}
                fullWidth
                required
              />
            </Box>
            <IconButton onClick={() => removeSection(index)} color="secondary" sx={styleIconDel}>
              <img src={icon} alt='Botao Deletar Estrutura' />
            </IconButton>
          </Box>
        ))}
        <Button onClick={addSection} variant="contained" color="warning">
          Add Estrutura
        </Button>
        <Box marginTop="2rem" display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Button type="submit" variant="contained" color="info">
            Salvar
          </Button>
          <Button type="submit" variant="contained" color="error">
            <BackPage children='Cancelar' />

          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default RegistrarCifra
