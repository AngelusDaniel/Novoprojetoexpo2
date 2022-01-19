import { IResponse } from "../../../interfaces/Response.interface";
import { TextoParam } from "../../../interfaces/Texto.interface";
import api from "../../api";
import { registerRootComponent } from 'expo';

class TextoData {
  store(data: TextoParam) {
    return api.post<IResponse>('/texto', data)
  }
  update(id: number, data: TextoParam) {
    return api.put<IResponse>(`/texto/${id}`, data)
  }
  destroy(id: number) {
    return api.delete<IResponse>(`/texto/${id}`)
  }
}

export default new TextoData();