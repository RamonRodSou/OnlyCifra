import React, { createContext, useState } from "react"
import { ICifra } from "../Interface/ICifra"

interface CifraContextType {
    data: ICifra[]
    setData: React.Dispatch<React.SetStateAction<ICifra[]>>

    list: ICifra[]
    setList: React.Dispatch<React.SetStateAction<ICifra[]>>

    selectCifra: string | number
    setSelectCifra: React.Dispatch<React.SetStateAction<string | number>>

    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>

}

export const CifraContext = createContext<CifraContextType>({
    data: [],
    setData: () => { },
    list: [],
    setList: () => { },

    selectCifra: '',
    setSelectCifra: () => { },
    searchTerm: '',
    setSearchTerm: () => { },


})

export const CifraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<ICifra[]>([])
    const [list, setList] = useState<ICifra[]>([])

    const [selectCifra, setSelectCifra] = useState<string | number>(0)
    const [searchTerm, setSearchTerm] = useState<string>('')
    return (
        <CifraContext.Provider value={{
            data, setData, list, setList, selectCifra, setSelectCifra, searchTerm, setSearchTerm
        }
        }>
            {children}
        </CifraContext.Provider>
    )
}
