
import { ImageSourcePropType } from 'react-native'

export interface DiarioProps {
  id: number
  nome: string
  imagem: string
}

export interface IDiario {
  status: string,
  message: string,
  data: {
    id: number,
    nome: string,
    imagem: string,
    textos: {
      id: number,
      nome: string,
      data: string
    }[]
  }[]
}

export interface ISpecificDiario {
  status: string,
  message: string,
  data: {
    id: number,
    nome: string,
    imagem: string,
    textos: {
      id: number,
      nome: string,
      data: string
    }[]
  }
}

export interface IInterfaceDiario {
  id: number,
  nome: string,
  imagem: string,
  textos?: {
    id: number,
    nome: string,
    data: string
  }[]
}

export interface ICadastraDiarioParam {
  nome?: string
  escrita?: string
  imagem?: {
    uri?: string
    base64?: string
  }
}