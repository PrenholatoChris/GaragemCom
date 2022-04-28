import React from 'react';
import {useNavigate} from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import logoImg from '../images/logo.png';

import '../styles/components/sidebar.css'

export default function Sidebar(){
    let navigate = useNavigate();
    function goBack(){
        navigate(-1);
    }

    return(
      <aside>
        <img src={logoImg} alt="Logo GaragemCom" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    )
}