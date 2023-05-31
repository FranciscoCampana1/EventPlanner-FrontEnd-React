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
          <img
            src="../../../img/Sin título.png"
            alt="ir a contactos"
            className="imagen-contactos"
          />
        </div>
      </div>
      <div className="contenedor">
        <div>
            <h2>
                Crear Evento
            </h2>
        </div>
        <div>
          <img
            src="../../../img/crear evento2.png"
            alt="imagen crear evento"
            className="imagen-evento"
          />
        </div>
      </div>
      <div className="contenedor">
        <div>
          <h2>Próximos Eventos</h2>
        </div>
        <div>
          <img
            src="../../../img/proximos eventos.png"
            alt="ver eventos"
            className="imagen-ver-eventos"
          />
        </div>
      </div>
    </div>
  );
}
