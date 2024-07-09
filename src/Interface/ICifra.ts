export interface IStruct {
    section: string
    content: string[]
  }[]
  
export interface ICifra {
    id: string
    title: string
    tom: string
    singer: string
    Struct: IStruct[]
    createdAt: string
  }
  