import React from "react";
import "./Register.scss";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import authService from "../../_services/authService";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export default function Register() {
  const [formValues, setFormValues] = useState({});
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = {
      name: formValues.name,
      surname: formValues.surname,
      email: formValues.email,
      phone: formValues.phone,
      password: formValues.password,
    };

    if (
      validator.isAlpha(values.name) &&
      validator.isAlpha(values.surname) &&
      validator.isEmail(values.email) &&
      validator.isMobilePhone(values.phone) &&
      validator.isByteLength(values.password, { min: 8, max: undefined })
    ) {
      registerUser(values);
      navigate("/");
    } else if (!validator.isEmail(values.email)) {
      setLoginError("Debes introducir un correo real");
    } else if (!validator.isAlpha(values.name)) {
      setLoginError("El apartado nombre solo puede contener letras");
    } else if (!validator.isAlpha(values.surname)) {
      setLoginError("El apartado apellido solo puede contener letras");
    } else if ((!validator.isMobilePhone(values.phone))) {
      setLoginError("Debe ser un movil real");
    } else if (
      !validator.isByteLength(values.password, { min: 8, max: undefined })
    ) {
      setLoginError("La contraseña debe contener mínimo 8 caracteres");
    }
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
        <div>
          <h1>Registro</h1>
        </div>
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
        <div>
          <br />
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        </div>
      </div>
    </>
  );
}
