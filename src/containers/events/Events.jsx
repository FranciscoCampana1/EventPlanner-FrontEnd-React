import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataListTable } from "../../components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import eventService from "../../_services/eventService";
import "./Events.scss";


export default function Events() {
  const authState = useSelector((state) => state.auth);
  const [events, setEvent] = useState([]);
  const [idEvent, setIdEvent] = useState();
  const [formValues, setFormValues] = useState({});
  const [optionsButton, setOptionsButton] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const organizador = authState.userInfo.id

  useEffect(() => {
    getEvents(authState.userToken);
  }, [events]);

  const handleEvent = (e) => {
    const { dataId } = e.currentTarget.dataset;
   const id_admin = e.currentTarget.lastChild.innerText
    if (id_admin == organizador) {
      setIdEvent(dataId);
      setOptionsButton(true);
      setIsUpdate(false);
      setIsDelete(false);
    }
  };

  const handleUpdate = () => {
    setIsUpdate(true);
    setIsDelete(false);
    setOptionsButton(false)
  };
  const handleDelete = () => {
    setIsDelete(true);
    setIsUpdate(false);
    setOptionsButton(false)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmitUpdate = (e) => {
      updateEvent(authState.userToken, formValues, idEvent);
    };

  const handleSubmitDelete = (e) => {
    deleteEvent(authState.userToken, idEvent)
    getEvents(authState.userToken)
    };

    
    
  const handleHideForm = () =>{
    setIsUpdate(false)
    setIsDelete(false)
  }

  const getEvents = async (token) => {
    try {
      const response = await eventService.getEvents(token);
      setEvent(response.events);
    } catch (error) {
      console.log(error);
    }
  };

  const updateEvent = async (token, data, event) => {
    try {
      const response = await eventService.updateEvent(token, data, event);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteEvent = async (token, event) => {
    try {
      const response = await eventService.deleteEvent(token, event);
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
      event.id_admin = event.Event.id_admin
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
          headers={["Título", "Descripción", "Día", "Hora", "Asistirán","Organizador"]}
          attributes={["title", "description", "date", "time", "users", "id_admin"]}
          onChange={handleEvent}
        />
        {optionsButton && (
          <>
            <button onClick={handleUpdate}> Modificar evento</button>
            <button onClick={handleDelete}> Eliminar evento</button>
          </>
        )}

        {isUpdate && (
          <>
            <h3>Estas cambiando el evento {idEvent} </h3>
            <Form noValidate onSubmit={handleSubmitUpdate} className="form">
              <Form.Group className="mb-3  rounded p-4 inputForm">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Título "
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                />
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripción del evento (opcional)"
                  name="description"
                  value={formValues.description}
                  onChange={handleChange}
                />
                <Form.Label>Día</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Día"
                  name="date"
                  value={formValues.date}
                  onChange={handleChange}
                />
                <Form.Label>Hora</Form.Label>
                <Form.Group>
                  <Form.Check
                    type={"radio"}
                    name="time"
                    value="12:00:00"
                    onChange={handleChange}
                    label={`12:00`}
                  />
                  <Form.Check
                    type={"radio"}
                    name="time"
                    value="15:00:00"
                    onChange={handleChange}
                    label={`15:00`}
                  />
                  <Form.Check
                    type={"radio"}
                    name="time"
                    value="20:00:00"
                    onChange={handleChange}
                    label={`20:00`}
                  />
                  <Form.Check
                    type={"radio"}
                    name="time"
                    value="22:00:00"
                    onChange={handleChange}
                    label={`22:00`}
                  />
                  <Form.Check
                    type={"radio"}
                    name="time"
                    value="23:59:00"
                    onChange={handleChange}
                    label={`23:59`}
                  />
                </Form.Group>
              </Form.Group>
              <Button variant="warning" type="submit" className="button" >
                Modificar evento
              </Button>
              <Button variant="primary" className="button" onClick={handleHideForm}>
                No modificar
              </Button>
            </Form>
          </>
        )}

        {isDelete && (
          <>
            <h3>Estas por eliminar el evento {idEvent}</h3>
            <button onClick={handleSubmitDelete}> Eliminar evento</button>
            <button onClick={handleHideForm}> Conservar evento</button>
          </>
        )}
      </div>
    </div>
  );
}
