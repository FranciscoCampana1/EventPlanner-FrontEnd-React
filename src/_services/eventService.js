import axios from "axios";
import { global } from "../_global/global";

const eventService = {};

eventService.getEvents = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return (await axios.get(global.BASE_URL + `/api/event/get-events`, config))
      .data;
  };



  eventService.createEvent = async (token, data) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const body = {
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
    };
  
  
    return (await axios.post(global.BASE_URL + `/api/event/create`, body, config))
      .data;
  }
  


export default eventService;
