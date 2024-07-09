export interface IStruct {
    section: string
    content: string[]
  }[]
  
export interface ICifra {
    id: string | number
    title: string
    tom: string
    singer: string
    Struct: IStruct[]
  }
  