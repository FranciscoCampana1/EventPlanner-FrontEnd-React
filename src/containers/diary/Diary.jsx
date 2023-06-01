import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userService from "../../_services/userService";
import { DataListTable } from "../../components";
import './Diary.scss'

export default function Diary() {
  //hooks
  const authState = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

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
      </div>
    </>
  );
}
