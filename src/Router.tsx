import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cifra from './Component/Cifra/Cifra'
import Home from './Home'
import { CifraProvider } from './ContextApi/CifraContext'
import NewCifra from './Component/NewCifra/NewCifra'
import EditCifra from './Component/EditCifra/EditCifra'
import Escala from './Component/Escala/Escala'
import PlayList from './Component/PlayList/PlayList'

const Router = () => {
    return (
        <CifraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/cifras/:id" element={<Cifra />} />
                    <Route path="/NewCifra" element={<NewCifra />} />
                    <Route path="/edit/:id" element={<EditCifra />} />
                    <Route path="/PlayList" element={<PlayList />} />
                    <Route path="/Escala" element={<Escala />} />
                </Routes>

            </BrowserRouter>
        </CifraProvider>

    )
}

export default Router