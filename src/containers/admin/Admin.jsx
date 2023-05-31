import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../_services/userService";
import { DataListTable } from "../../components";
import { dateFormat } from "../../_util/date";
import "./Admin.scss";


export default function Admin() {
    //hooks
    const navigate = useNavigate();
    const authState = useSelector((state) => state.auth);
    const [users, setUsers] = useState([]);
    const [usersPage, setUsersPage] = useState(1);
    const [usersPages, setUsersPages] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const {name} = authState.userInfo
    const isAdmin = authState.userInfo.role == "admin";
  
    useEffect(() => {
      if (isAdmin) {
        getAllUsers(authState.userToken, usersPage);
      } else {
        navigate("/");
      }
    }, []);

    const handleUsersList = (e) => {
      const { page, dataId } = e.currentTarget.dataset;
      handleUsersListPagination(page);
      handleSingleUser(dataId);
    };
  
    const handleUsersListPagination = (page) => {
      switch (page) {
        case "next":
          return setUsersPage((page) => page + 1);
        case "prev":
          return setUsersPage((page) => page - 1);
        case "first":
          return setUsersPage(1);
        case "last":
          return setUsersPage(usersPages);
      }
    };
  
    const handleSingleUser = (dataId) => {
      console.log(dataId);
    };
  
    const getAllUsers = async (token, page) => {
      try {
        const response = await userService.getAllUsers(token, page);
        setUsers(response.results);
        setUsersCount(response.info.total_results);
        setUsersPages(response.info.total_pages);
      } catch (error) {
        console.log(error);
      }
    };


    const newUsers = (users) =>
    users.map((user) => {
       user.createdAt = dateFormat(user.createdAt);
       user.updatedAt = dateFormat(user.updatedAt);
       return user;
    });
  return (
    <div className= "contenedor-admin">
      {isAdmin  && (
          <>
            <h1 style={{ textAlign: "center"}}>
              Bienvenido {name}
            </h1>
            <DataListTable
              data={newUsers(users)}
              title="Users"
              count={usersCount}
              headers={["ID", "Nombre", "Apellidos", "Email", "Telefono", "Regitrado desde", "Última modificación" ]}
              attributes={[
                "id",
                "name",
                "surname",
                "email",
                "phone",
                "createdAt",
                "updatedAt"
              ]}
              pagination={{
                page: usersPage,
                totalPages: usersPages,
                count: usersCount,
              }}
              onChange={handleUsersList}
            />
          </>
        )}
    </div>
  )
}
