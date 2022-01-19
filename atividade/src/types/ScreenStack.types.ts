import { StackNavigationProp } from "@react-navigation/stack"
import { ImageSourcePropType } from "react-native"
import { DiarioProps } from "../interfaces/Diario.interface"
import { registerRootComponent } from 'expo';

// Login Stack
export type LoginStackParamList = {
  Login: undefined
  Cadastrar: undefined
  HomeStack: undefined
}
type LoginScreenNavigationProp = StackNavigationProp<LoginStackParamList>
export type LoginTypes = {
  navigation: LoginScreenNavigationProp
}

// Diario Stack
export type DiarioStackParamList = {
  Home: undefined
  Diario: { id: number }
  Castra: {
    nome?: string
    data?: string
  }
  Texto: {
    id?: number
    nome?: string
    textos?: {
      nome: string
      data: string
    }
  }
  CadastraDiario: {
    nome?: string
    escricao?: string
  }
}
type DiarioScreenNavigationProp = StackNavigationProp<DiarioStackParamList>
export type DiarioTypes = {
  navigation: DiarioScreenNavigationProp
}