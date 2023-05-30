import axios from "axios";
import { global } from "../_global/global";

const authService = {};

//Login de usuarios
authService.login = async (credentials) => {
  const body = {
    email: credentials.email,
    password: credentials.password,
  };

  return (await axios.post(global.BASE_URL + "/api/auth/login", body)).data;
};

//registro de usuarios
authService.registerUser = async (data) => {

  const body = {
    name: data.name,
    surname: data.surname,
    email: data.email,
    phone: data.phone,
    password: data.password,
  };


  return (await axios.post(global.BASE_URL + `/api/auth/register/`, body))
    .data;
}


export default authService