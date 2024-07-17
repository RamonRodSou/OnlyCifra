import ListCifra from './Component/ListCifra/ListCifra'
import { Link } from 'react-router-dom'
import { Box, styled } from '@mui/material'
import iconAdd from './assets/icon/icon-add.png'
import iconPlayList from './assets/icon/icon-playlist.png'
import iconEscala from './assets/icon/icon-escala.png'
import Serch from './Component/Serch/Serch'

const HomePage = styled(Box)({
  padding:'1rem' 
})

const New = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width:'100%',
  paddingTop:'1rem'
  // height:'10vh',
})

function Home() {
  return (
    <HomePage>
      <Serch/>
      <ListCifra />
      <New>
        <Link to='Escala'>
          <img src={iconEscala} alt='Escala' width={50} height={50}/>
        </Link>
        <Link to='NewCifra'>
          <img src={iconAdd} alt='Adicionar nova Cifra' width={50} height={50}/>
        </Link>
        <Link to='PlayList'>
          <img src={iconPlayList} alt='Playlist' width={50} height={50}/>
        </Link>
      </New>
    </HomePage>
  )
}

export default Home
