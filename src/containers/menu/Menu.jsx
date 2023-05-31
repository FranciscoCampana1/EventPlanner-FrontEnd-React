import React from "react";
import "./Menu.scss";

export default function Menu() {
  return (
    <div className="menu">
      <div className="contenedor">
        <div className="contenedor-title">
          <h2>Contactos</h2>
        </div>
        <div>
          <a href="/diary">
            <img
              src="../../../img/Sin título.png"
              alt="ir a contactos"
              className="imagen-contactos"
            />
          </a>
        </div>
      </div>
      <div className="contenedor">
        <div>
          <h2>Crear Evento</h2>
        </div>
        <div>
          <a href="/event-create">
            <img
              src="../../../img/crear evento2.png"
              alt="imagen crear evento"
              className="imagen-evento"
            />
          </a>
        </div>
      </div>
      <div className="contenedor">
        <div>
          <h2>Próximos Eventos</h2>
        </div>
        <div>
          <a href="/events">
            <img
              src="../../../img/proximos eventos.png"
              alt="ver eventos"
              className="imagen-ver-eventos"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
