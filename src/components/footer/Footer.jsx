import React from 'react'
import './Footer.scss'

export default function Footer() {
  return (
    <div className="contenedor-footer">
    <div className="contenedor-redes">
      <a href="" target="_blank" className="m-3 link">
        <img
          src="../../../img/intagram.jpg"
          alt="imagenInstagram"
          width="30"
        />{" "}
        Instagram
      </a>
      </div>
      <div>
      <a href="" target="_blank" className="m-3 link">
        <img
          src="../../../img/facebook.jpg"
          alt="imagenFacebook"
          width="28px"
        />{" "}
        Facebook
      </a>
    </div>
  </div>
  )
}
