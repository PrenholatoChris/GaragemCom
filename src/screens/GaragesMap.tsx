import React from "react";
import { Link } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import 'leaflet/dist/leaflet.css';
import "../styles/pages/garages-map.css";
import { FiPlus, FiArrowRight, FiSearch } from "react-icons/fi";

import logoImg from "../images/logo.png";
import MapIcon from '../utils/MapIcon'

import { useEffect, useState } from "react";
import api from "../services/api";

interface Garage {
    id: number;
    name:string;
    latitude:number;
    longitude:number;
}


function GaragesMap(){
    const [garages, setGarages] = useState<Garage[]>([]);

    useEffect( () => {
        api.get('garages').then(resp =>{ 
            setGarages(resp.data);
        });
    }, []);

    return(
        <div id="garagesMap">
            <aside>
                <header>
                    <img src={logoImg} alt="Logo GaragemCom" />
                    <h1>Localize a garagem que deseja</h1>
                    <p>Nossos mecanicos estão mais que prontos para receber você e seu motor</p>
                    <Link to="search"><FiSearch size={20} color='#fff'/></Link>
                </header>

                <footer>
                    <strong>Brazil</strong>
                    <p>Uf</p>
                </footer>
            </aside>

            <MapContainer className="map" center={[-20.3444697,-40.3995558]} zoom={17}
            style={{width:'100%', height: '100%'}}>
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}/?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                
            {
            garages.map(garage => {

                return (
                    <Marker 
                        icon={MapIcon} 
                        position={[garage.latitude,garage.longitude]} 
                        key={garage.id}
                    >
                        <Popup className="map-popup" closeButton={false}>
                            {garage.name}
                            <Link to={`/garages/${garage.id}`}>
                                <FiArrowRight size={20} color='#fff'/>
                            </Link>
                        </Popup>
                    </Marker>
                )
            })
            }

            </MapContainer>

            <Link className="request-garage" to="/garages/create">
                <FiPlus />
            </Link>
        </div>
    );
}

export default GaragesMap;