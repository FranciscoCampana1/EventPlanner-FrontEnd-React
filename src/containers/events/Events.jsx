import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataListTable } from "../../components";
import eventService from "../../_services/eventService";
import "./Events.scss";

export default function Events() {
  const authState = useSelector((state) => state.auth);
  const [events, setEvent] = useState([]);

  useEffect(() => {
    getEvents(authState.userToken);
  }, []);

  const getEvents = async (token) => {
    try {
      const response = await eventService.getEvents(token);
      setEvent(response.events);
    } catch (error) {
      console.log(error);
    }
  };

  const newEvent = (events) =>
    events.map((event) => {
      event.id = event.Event.id;
      event.title = event.Event.title;
      event.description = event.Event.description;
      event.date = event.Event.date;
      event.time = event.Event.time;
      event.users = event.Event.Users.map((user) => {
        return user.name + " " + user.surname + ", ";
      });

      return event;
    });
  return (
    <div>
      <div className="contenedor-eventos">
        <DataListTable
          data={newEvent(events)}
          title="Tus Eventos"
          headers={["Título", "Descripción", "Día", "Hora", "Asistirán"]}
          attributes={["title", "description", "date", "time", "users"]}
        />
      </div>
    </div>
  );
}
