import React from "react";
import './Register.scss'
import { useState } from "react";
import Form from "react-bootstrap/Form";
import authService from "../../_services/authService";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, 
    });
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formValues);
    navigate('/')
  };

  const registerUser = async (body) => {
    try {
      const response = await authService.registerUser(body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="contenedor-form">
        <Form noValidate onSubmit={handleSubmit} className="form">
          <Form.Group className="mb-3  rounded p-4 inputForm">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre "
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apellidos "
              name="surname"
              value={formValues.surname}
              onChange={handleChange}
            />
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email "
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Teléfono "
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </Form.Group>
          
            <Button variant="primary" type="submit" className="button">
            Crear perfil
          </Button>
          
          
        </Form>
      </div>
    </>
  );
}
