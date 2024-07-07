import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cifra from './Component/Cifra/Cifra'
import Home from './Home'

type Props = {}

const Router = (props: Props) => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cifra" element={<Cifra />} />
            </Routes>

        </BrowserRouter>

    )
}

export default Router