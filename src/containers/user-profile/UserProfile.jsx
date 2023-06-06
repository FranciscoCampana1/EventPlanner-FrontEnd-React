import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import userService from "../../_services/userService";
import "./UserProfile.scss"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {

  const [user, setUser] = useState({});
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate()

  
  useEffect(() => {
    if (authState.userToken) {
      getProfile(authState.userToken);
    }
  }, []);

  const handleBackMenu = () =>{
    navigate('/menu')
  }

  const getProfile = async (token) => {
    try {
      const response = await userService.getProfile(token);
      setUser(response);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="background">
      <div className="contenedor-perfil">
        <Card className="carta">
          <Card.Img variant="top" src="../../../img/imagen-perfil.png" />
          <Card.Body>
            <Card.Title>Nombre: {user.name}</Card.Title>
            <Card.Title>Apellido: {user.surname}</Card.Title>
            <Card.Title>Email: {user.email}</Card.Title>
            <Card.Title>Telefono: {user.phone}</Card.Title>
            <Button variant="primary" onClick={handleBackMenu}>Volver al menú</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
