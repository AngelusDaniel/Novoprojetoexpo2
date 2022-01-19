import { ImageSourcePropType } from "react-native";
import { DiarioProps } from "./Diario.interface";
import { ButtonProps } from "./Button.interface"

export interface TextoParamProps extends DiarioProps {
  textos: {
    id: number
    nome: string
    data: string
  }
}

export interface ITextoParam {
  id: number
  nome: string
  data: string
}

export interface TextoParam {
  id?: number
  diario_id?: number
  nome?: string
  data?: string
}

export interface TextoProps extends ButtonProps {
  buttonEdit: (item: ITextoParam) => void
  buttonRemove: (item: ITextoParam) => void
  textos?: {
    id: number
    nome: string
    data: string
  }[]
}

export interface TextoPropsDiario {
  title: string
  image: ImageSourcePropType

  nome: string
  data: string
}
