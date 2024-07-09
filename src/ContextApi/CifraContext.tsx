import React, { createContext, useState } from "react"
import { ICifra } from "../Interface/ICifra"

interface CifraContextType {
    data: ICifra[]
    setData: React.Dispatch<React.SetStateAction<ICifra[]>>
    
    selectCifra: string | number
    setSelectCifra: React.Dispatch<React.SetStateAction<string | number>>

}

export const CifraContext = createContext<CifraContextType>({
    data: [],
    setData: () => { },
    selectCifra: '' ,
    setSelectCifra: () => { },
})

export const CifraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<ICifra[]>([])
    const [selectCifra, setSelectCifra] = useState<string | number>(0)

    return (
        <CifraContext.Provider value= {{
        data, setData,selectCifra, setSelectCifra
    }
}>
    { children }
    </CifraContext.Provider>
  )
}
