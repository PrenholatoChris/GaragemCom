import React from "react";
import '../styles/pages/landing.css'

import logoImg from '../images/logo.png';
import backgroundImg from '../images/fundo.png'

import { FiArrowRight } from 'react-icons/fi';
import { Link } from "react-router-dom";


function Landing(){
    return(
      <div id="page-landing">
        <div id="flex-wrap">
          <div id="left">
            <div id='logo'>
              <img src={logoImg}  alt="texto alternativo da logo" />
              <h1>GaragemCom</h1>
            </div>

            <div id='presentation'>
              <h2>Texto apresentativo da GaragemCom</h2>
              <p>Visite uma de nossas garagens e acabe com os problemas do seu carro e da sua dor de cabeça</p>
            </div>
          </div>
          <div id="right">
            <img src={backgroundImg} alt="Imagem de garagem" />
            <Link className="enter-app" to="./app">
              <FiArrowRight size={26} />
            </Link>
          </div>

        </div>

      </div>

    );
}

export default Landing;