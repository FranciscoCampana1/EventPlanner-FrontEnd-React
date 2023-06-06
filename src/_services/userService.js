import axios from "axios";
import { global } from "../_global/global";

const userService = {};

userService.getAllUsers = async (token, page = 1) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return (await axios.get(global.BASE_URL + `/api/users/get-all?page=${page}`, config))
    .data;
};

userService.getMyContacts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.get(global.BASE_URL + `/api/users/get-my-contacts` ,config))
    .data;
};

userService.getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.get(global.BASE_URL + `/api/users/get-profile` ,config))
    .data;
};


userService.addContact = async (token, data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
  const body = {
    phone: data.phone
  }
    return (await axios.post(global.BASE_URL + `/api/users/create-contact`,body, config))
      .data;
  };

  
  

export default userService;
