import axios from "axios";
import { registerRootComponent } from 'expo';

const api = axios.create({
  baseURL: "https://projeto03web.herokuapp.com/api",
  headers: {
    'Content-Type': 'application/json',
  }
})

export default api;