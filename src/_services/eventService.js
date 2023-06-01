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


  eventService.updateEvent = async (token, data, event) => {
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
  
    return (await axios.put(global.BASE_URL + `/api/event/update-event/${event}`, body, config))
      .data;
  }


  eventService.deleteEvent = async (token, event) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }

    return (await axios.delete(global.BASE_URL + `/api/event/delete-event/${event}`, config))
      .data;
  }


  eventService.deleteInvitation = async (token, event) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
  
    return (await axios.post(global.BASE_URL + `/api/event/delete-invitation/${event}`, config))
      .data;
  }

  
  


export default eventService;
