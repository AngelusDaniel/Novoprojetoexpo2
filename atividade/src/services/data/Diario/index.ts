
import { IDiario, ISpecificDiario } from "../../../interfaces/Diario.interface";
import api from "../../api";
import { registerRootComponent } from 'expo';

class DiarioData {
  index() {
    return api.get<IDiario>('/diario')
  }
  update(id: number, data: string) {
    return api.put<IDiario>(`/diario/${id}`, { castracao: data })
  }
  show(id: number) {
    return api.get<ISpecificDiario>(`/diario/${id}`)
  }
  deleteCastracao(id: number) {
    return api.delete(`/castracao/${id}`)
  }
}

export default new DiarioData();