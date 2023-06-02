import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userService from "../../_services/userService";
import { DataListTable } from "../../components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Diary.scss";

export default function Diary() {
  //hooks
  const authState = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [buttons, setButtons] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [addContact, setAddContact] = useState(false);

  useEffect(() => {
    getMyContacts(authState.userToken);
  }, []);

  const getMyContacts = async (token) => {
    try {
      const response = await userService.getMyContacts(token);
      setUsers(response.Contacts);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleAddContact = () => {
    setAddContact(true);
    setButtons(false);
  };
  
  const handleNewContact = () => {
    addNewContact(authState.userToken, formValues);
  };
  const handleHideForm = () => {
    setAddContact(false);
    setButtons(true);
  };

  const addNewContact = async (token, data) => {
    try {
      const response = await userService.addContact(token, data);
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
    

  return (
    <>
      <div className="contenedor-agenda">
        <DataListTable
          data={newContact(users)}
          title="Contacts"
          headers={["Nombre", "Apellidos", "Email", "Telefono"]}
          attributes={["name", "surname", "email", "phone"]}
        />
        <div className="contenedor-form-add-contact">
          {addContact && (
            <div>
              <h3>Agendar Contacto </h3>
              <Form
                noValidate
                onSubmit={handleNewContact}
                className="form-modificar-evento"
              >
                <Form.Group className="mb-3  rounded p-4 inputForm">
                  <Form.Label>Nº Móvil</Form.Label>
                  <Form.Control
                    type="integer"
                    placeholder="692447415 "
                    name="phone"
                    value={formValues.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="buttons">
                  <Button variant="primary" type="submit" className="button">
                    Agendar Contacto
                  </Button>
                  <Button
                    variant="danger"
                    className="button"
                    onClick={handleHideForm}
                  >
                    Cancelar
                  </Button>
                </div>
              </Form>
            </div>
          )}
          {buttons && (
            <div className="buttons">
              <button className="buttonAñadir" onClick={handleAddContact}>
                Añadir Contacto
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
