import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { DataListTable } from "../../components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import eventService from "../../_services/eventService";
import userService from "../../_services/userService";
import "./Events.scss";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const authState = useSelector((state) => state.auth);
  const [events, setEvent] = useState([]);
  const [viewEvents, setViewEvents] = useState(true);
  const [idEvent, setIdEvent] = useState();
  const [formValues, setFormValues] = useState({});
  const [optionsButton, setOptionsButton] = useState(false);
  const [isDeleteInvitation, setIsDeleteInvitation] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [users, setUsers] = useState([]);
  const [idUser, setIdUser] = useState();
  const [isAddGuest, setIsAddGuest] = useState(false);
  const [clickContact, setClickContact] = useState(false);
  const organizador = authState.userInfo.id;
  const navigate = useNavigate()

  useEffect(() => {
    getEvents(authState.userToken);
  }, [events]);

  //handle, capta el evento si es admin puede modificar el evento si es invitado puede eliminar invitación

  const handleEvent = (e) => {
    const { dataId } = e.currentTarget.dataset;
    const id_admin = e.currentTarget.lastChild.innerText;
    if (id_admin == organizador) {
      setIdEvent(dataId);
      setOptionsButton(true);
      setIsUpdate(false);
      setIsDelete(false);
      setIsDeleteInvitation(false)
    } else {
      setIdEvent(dataId)
      setIsDeleteInvitation(true)
      setOptionsButton(false);

    }
  };
  const handleContact = (e) => {
    const { dataId } = e.currentTarget.dataset;
    setIdUser(dataId);
    setClickContact(true);
  };

  const handlePushContact = (e) => {
    addGuest(authState.userToken, idUser, idEvent);
    setViewEvents(true)
    setIsAddGuest(false)
    setClickContact(false)
  };

  const handleUpdate = () => {
    setIsUpdate(true);
    setIsDelete(false);
    setIsAddGuest(false);
    setOptionsButton(false);
  };
  const handleDelete = () => {
    setIsDelete(true);
    setIsUpdate(false);
    setIsAddGuest(false);
    setOptionsButton(false);
  };

  const handleAddGuest = () => {
    setIsDelete(false);
    setIsUpdate(false);
    setIsAddGuest(true);
    setOptionsButton(false);
    setViewEvents(false);
    getMyContacts(authState.userToken);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmitUpdate = () => {
    updateEvent(authState.userToken, formValues, idEvent);
  };

  const handleSubmitDelete = () => {
    deleteEvent(authState.userToken, idEvent);
    setIsDelete(false)
    getEvents(authState.userToken);
    navigate('/menu')
  };

  const handleDeleteInvitation = () => {
    deleteInvitation( authState.userToken, idEvent)
    setIsDeleteInvitation(false)
    navigate('/menu')
  }

  const handleHideForm = () => {
    setIsUpdate(false);
    setIsDelete(false);
    setViewEvents(true);
    setIsAddGuest(false);
    setClickContact(false);
    setIsDeleteInvitation(false)
  };

  const getEvents = async (token) => {
    try {
      const response = await eventService.getEvents(token);
      setEvent(response.events);
    } catch (error) {
      console.log(error);
    }
  };

  const addGuest = async (token, data, event) => {
    try {
      const response = await eventService.addGuest(token, data, event);
    } catch (error) {
      console.log(error);
    }
  };
  const getMyContacts = async (token) => {
    try {
      const response = await userService.getMyContacts(token);
      setUsers(response.Contacts);
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
  const deleteInvitation = async (token, event) => {
    try {
      const response = await eventService.deleteInvitation(token, event);
    } catch (error) {
      console.log(error);
    }
  };

  const newContact = (users) =>
    users.map((user) => {
      user.id = user.Contact.user_id;
      user.name = user.Contact.User.name;
      user.surname = user.Contact.User.surname;
      user.email = user.Contact.User.email;
      user.phone = user.Contact.User.phone;
      return user;
    });

  const newEvent = (events) =>
    events.map((event) => {
      event.id = event.Event.id;
      event.title = event.Event.title;
      event.description = event.Event.description;
      event.date = event.Event.date;
      event.id_admin = event.Event.id_admin;
      event.time = event.Event.time;
      event.users = event.Event.Users.map((user) => {
        return user.name + " " + user.surname + ", ";
      });

      return event;
    });

  return (
    <div>
      <div className="contenedor-eventos">
        {viewEvents && (
          <DataListTable
            data={newEvent(events)}
            title="Tus Eventos"
            headers={[
              "Identificador del Evento",
              "Título",
              "Descripción",
              "Día",
              "Hora",
              "Asistirán",
              "Credencial del Organizador",
            ]}
            attributes={[
              "id",
              "title",
              "description",
              "date",
              "time",
              "users",
              "id_admin",
            ]}
            onChange={handleEvent}
          />
        )}

        {isAddGuest && (
          <>
            <h3>Clickea que invitado deseas agregar</h3>

            <div className="container">
              <DataListTable
                data={newContact(users)}
                title="Contacts"
                headers={[
                  "Contacto",
                  "Nombre",
                  "Apellidos",
                  "Email",
                  "Telefono",
                ]}
                attributes={["id", "name", "surname", "email", "phone"]}
                onChange={handleContact}
              />
              {clickContact && (
                <>
                  <h3>Agregar contacto Nº {idUser} </h3>
                  <div className="contenedor-botones">
                    <Button
                      variant="warning"
                      onClick={handlePushContact}
                      className="button"
                    >
                      Agregar invitado
                    </Button>
                    <Button
                      variant="primary"
                      className="button"
                      onClick={handleHideForm}
                    >
                      Volver atrás
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
        {optionsButton && (
          <>
            <h3>Evento Nº {idEvent} </h3>

            <div className="contenedor-botones">
              <button onClick={handleAddGuest} className="buttonConservar">
                {" "}
                Añadir invitado
              </button>
              <button onClick={handleUpdate} className="buttonModificar">
                {" "}
                Modificar evento
              </button>
              <button onClick={handleDelete} className="buttonEliminar">
                {" "}
                Eliminar evento
              </button>
            </div>
          </>
        )}

        {isUpdate && (
          <>
            <h3>Modificar evento Nº {idEvent} </h3>
            <Form
              noValidate
              onSubmit={handleSubmitUpdate}
              className="form-modificar-evento"
            >
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
              <div className="contenedor-botones">
                <Button variant="warning" type="submit" className="button">
                Modificar evento
              </Button>
              <Button
                variant="primary"
                className="button"
                onClick={handleHideForm}
              >
                No modificar
              </Button>
              </div>
              
            </Form>
          </>
        )}

        {isDelete && (
          <>
            <h3>Eliminar evento {idEvent}</h3>
            <div className="contenedor-botones">
              <button onClick={handleSubmitDelete} className="buttonEliminar">
                {" "}
                Eliminar evento
              </button>
              <button onClick={handleHideForm} className="buttonConservar">
                {" "}
                Conservar evento
              </button>
            </div>
          </>
        )}
        {isDeleteInvitation && (
          <>
            <h3>Eliminar Invitación del Evento Nº {idEvent}</h3>
            <div className="contenedor-botones">
              <button onClick={handleDeleteInvitation} className="buttonEliminar">
                {" "}
                Eliminar Invitación
              </button>
              <button onClick={handleHideForm} className="buttonConservar">
                {" "}
                Conservar Invitación
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
