import ListCifra from './Component/ListCifra/ListCifra'
import { Link } from 'react-router-dom'
import { Box, styled } from '@mui/material'
import Serch from './Component/Serch/Serch'
import ListAltIcon from '@mui/icons-material/ListAlt';
import Groups2Icon from '@mui/icons-material/Groups2';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

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
        <Groups2Icon sx={{'fontSize':'35px', 'color':'#fff'}}/>
        </Link>
        <Link to='NewCifra'>
          <AddBoxRoundedIcon sx={{'fontSize':'50px', 'color':'#fff'}}/>
        </Link>
        <Link to='PlayList'>
          <ListAltIcon sx={{'fontSize':'35px', 'color':'#fff'}}/>
        </Link>
      </New>
    </HomePage>
  )
}

export default Home
