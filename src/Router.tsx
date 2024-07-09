import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cifra from './Component/Cifra/Cifra'
import Home from './Home'
import { CifraProvider } from './ContextApi/CifraContext'
import NewCifra from './Component/NewCifra/NewCifra'
import EditCifra from './Component/EditCifra/EditCifra'

type Props = {}

const Router = (props: Props) => {
    return (
        <CifraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/cifras/:id" element={<Cifra />} />
                    <Route path="/NewCifra" element={<NewCifra />} />
                    <Route path="/edit/:id" element={<EditCifra />} />

                </Routes>

            </BrowserRouter>
        </CifraProvider>

    )
}

export default Router