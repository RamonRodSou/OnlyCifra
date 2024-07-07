import { Box, Button, styled } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const New = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    border:'1px solid #fff',
    borderRadius:'5px',
    padding:'5px 0',
})

const NewCifra = (props: Props) => {
  return (
   
    <New>
        <Link to='cifra'> New </Link>
    </New>
  )
}

export default NewCifra