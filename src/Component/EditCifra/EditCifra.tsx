import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Box, Button, Container, IconButton, TextField } from '@mui/material'
import { CifraContext } from '../../ContextApi/CifraContext'
import { ICifra, IStruct } from '../../Interface/ICifra'
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

const EditCifra = () => {
    const { id } = useParams<{ id: string }>()
    const { data, setData } = useContext(CifraContext)
    const [cifra, setCifra] = useState<ICifra | null>(null)
    const [title, setTitle] = useState('')
    const [tom, setTom] = useState('')
    const [singer, setSinger] = useState<string>('')
    const [struct, setStruct] = useState<IStruct[]>([{ section: '', content: [''] }])
    const navigate = useNavigate()
    const BASE_URL: string = 'http://localhost:5000/cifras'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<ICifra>(`${BASE_URL}/${id}`)
                setCifra(response.data)
                setTitle(response.data.title)
                setTom(response.data.tom)
                setSinger(response.data.singer)
                setStruct(response.data.Struct)
            } catch (error) {
                console.error("There was an error fetching the cifra:", error)
            }
        }

        if (id) {
            fetchData()
        }
    }, [id])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!cifra) return

        try {
            await axios.put(`${BASE_URL}/${id}`, {
                ...cifra,
                title,
                tom,
                singer,
                Struct: struct,
            })
            setData(prevData => prevData.map(item => item.id === Number(id) ? cifra! : item))
            navigate('/')
        } catch (error) {
            console.error("There was an error updating the cifra:", error)
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
                    <Button variant="contained" color="error">
                        <BackPage children='Cancelar' />
                    </Button>
                </Box>
            </form>
        </Container>
    )
}

export default EditCifra
