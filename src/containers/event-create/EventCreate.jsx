import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";
import eventService from "../../_services/eventService";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import './EventCreate.scss'

export default function EventCreate() {
  const authState = useSelector((state) => state.auth);
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
      id_admin: authState.userInfo.id
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createEvent(authState.userToken ,formValues);
    navigate("/menu");
  };

  const createEvent = async (token, body) => {
    try {
      const response = await eventService.createEvent(token, body);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="contenedor-form">
        <Form noValidate onSubmit={handleSubmit} className="form">
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
            <FormGroup>
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
            </FormGroup>
          </Form.Group>
          <Button variant="primary" type="submit" className="button">
            Crear evento
          </Button>
        </Form>
      </div>
    </>
  );
}
