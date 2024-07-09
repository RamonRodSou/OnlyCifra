import React, { useState } from 'react'
import firebase from '../../service/fireBaseConecction'
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material'
import { IStruct } from '../../Interface/ICifra'
import icon from '../../assets/icon/icon-del.png'
import BackPage from '../BackPage/BackPage'
import { useNavigate } from 'react-router-dom'

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

const NewCifra = () => {
  const [title, setTitle] = useState<string>('')
  const [tom, setTom] = useState<string>('')
  const [singer, setSinger] = useState<string>('')
  const [struct, setStruct] = useState<IStruct[]>([{ section: '', content: [''] }])
  const navigate = useNavigate()

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
    e.preventDefault();
  
    const password = prompt('Por favor, insira a senha:');
    if (password !== 'servir') {
      alert('Senha incorreta. Tente novamente.');
      return;
    }
  
    try {
      const createdAt = new Date().toISOString();
  
      await firebase.firestore().collection('cifras').add({
        title,
        tom,
        singer,
        Struct: struct,
        createdAt: createdAt,
      });
  
      setTitle('');
      setTom('');
      setSinger('');
      setStruct([{ section: '', content: [''] }]);
      alert('Cifra registrada com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar cifra:', error);
      alert('Erro ao registrar a cifra. Verifique o console para mais detalhes.');
    }
  };
  
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
        <Box marginBottom="1rem">
          <TextField
            label="Quem Canta?"
            value={singer}
            onChange={(e) => setSinger(e.target.value)}
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
          <BackPage icon={false} children='Salvar' />
          </Button>
          <Button variant="contained" color="error" onClick={() => navigate('/')}>
            Cancelar
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default NewCifra
