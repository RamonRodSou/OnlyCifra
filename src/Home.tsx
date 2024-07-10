import ListCifra from './Component/ListCifra/ListCifra'
import { Link } from 'react-router-dom'
import { Box, styled } from '@mui/material'
import iconAdd from './assets/icon/icon-add.png'
import Serch from './Component/Serch/Serch'

const HomePage = styled(Box)({
  padding:'1rem' 
})

const New = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height:'10vh'
})

function Home() {
  return (
    <HomePage>
      <Serch/>
      <ListCifra />
      <New>
        <Link to='NewCifra'>
          <img src={iconAdd} alt='Adicionar nova Cifra' />
        </Link>
      </New>
    </HomePage>
  )
}

export default Home
