import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { CifraContext } from '../../ContextApi/CifraContext'
import { ICifra, IStruct } from '../../Interface/ICifra'
import { fireBaseUpdate, fireBaseGetById } from '../../api/FireBaseDbCifra'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

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
  height: '30px',
}

const EditCifra = () => {
  const { id } = useParams<{ id: string }>()
  const { setData } = useContext(CifraContext)
  const [cifra, setCifra] = useState<ICifra | null>(null)
  const [title, setTitle] = useState<string>('')
  const [tom, setTom] = useState<string>('')
  const [singer, setSinger] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [struct, setStruct] = useState<IStruct[]>([{ section: '', content: [''] }])

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      try {
        await fireBaseGetById(id, (cifraData: ICifra | null) => {
          if (cifraData) {
            setCifra(cifraData)
            setTitle(cifraData.title || '')
            setTom(cifraData.tom || '')
            setSinger(cifraData.singer || '')
            setDescription(cifraData.description || '')
            setStruct(cifraData.Struct || [{ section: '', content: [''] }])
          }
        })
      } catch (error) {
        console.error('Erro ao buscar cifra:', error)
      }
    }

    fetchData()
  }, [id])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!id || !cifra) return

    try {
      const updatedCifra: ICifra = {
        ...cifra,
        title: title || '',
        tom: tom || '',
        singer: singer || '',
        description: description || '',
        Struct: struct || [{ section: '', content: [''] }]
      }

      await fireBaseUpdate(id, updatedCifra)
      setData(prevData =>
        prevData.map(item => (item.id === id ? { ...updatedCifra } : item))
      )
      window.history.back()
    } catch (error) {
      console.error('Erro ao atualizar cifra:', error)
      alert('Erro ao atualizar a cifra. Verifique o console para mais detalhes.')
    }
  }

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
    setStruct([...struct, { section: '', content: [] }])
  }

  const removeSection = (index: number) => {
    const updatedStruct = [...struct]
    updatedStruct.splice(index, 1)
    setStruct(updatedStruct)
  }

  return (
    <Container sx={styleForm}>
      <Typography variant="h4" component="h1" gutterBottom color={'var(--titleNewCifra-color)'}>
        Editar Cifra
      </Typography>
      <form onSubmit={handleSave}>
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
            <HighlightOffRoundedIcon onClick={() => removeSection(index)} color="secondary" sx={styleIconDel}/>
          </Box>
        ))}
        <Button onClick={addSection} variant="contained" color="warning">
          Add Estrutura
        </Button>
        <Box marginTop="1rem" >
          <TextField
            label="Descrição"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </Box>
        <Box marginTop="2rem" display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Button type="submit" variant="contained" color="info">
            Salvar
          </Button>
          <Button variant="contained" color="error" onClick={() =>  window.history.back()}>
            Cancelar
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default EditCifra
