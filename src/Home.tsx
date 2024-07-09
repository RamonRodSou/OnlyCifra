import './Home.css'
import ListCifra from './Component/ListCifra/ListCifra'
import { Link } from 'react-router-dom'
import { Box, styled } from '@mui/material'
import iconAdd from './assets/icon/icon-add.png'
const New = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

function Home() {

  return (
    <>
      <ListCifra />
      <New>
        <Link to='NewCifra'>
          <img src={iconAdd} alt='Adicionar nova Cifra' />
        </Link>
      </New>
    </>
  )
}

export default Home
