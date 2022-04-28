import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import MapIcon from '../utils/MapIcon'
import api from "../services/api";

import Sidebar from '../components/Sidebar'
import '../styles/pages/garage.css';

interface GarageT {
  id:number;
  name:string;
  latitude:number;
  longitude:number;
  instructions:string;
  about:string;
  opening_hours:string;
  open_on_weekends:Boolean;
  images:Array<{
    id:number,
    url:string
  }>
}
// interface GarageParams{
//   id:string;
// }

export default function Garage() {

  const params = useParams();
  const [garage, setGarage] = useState<GarageT>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);


    useEffect( () => {
      api.get(`garages/${params.id}`).then(resp =>{ 
        setGarage(resp.data);
      });
    }, [params.id]);

    if(!garage){
      return <p>Carregando...</p>
    }

  return (
    <div id="page-garage">
      <Sidebar />
    
      <main>
        <div className="garage-details">
          <img src={garage.images[activeImageIndex].url} alt={garage.name} />

          <div className="images">
            {
              garage.images.map((image,index) => {
                return (
                  <button key={image.id}
                   className={activeImageIndex === index ? 'active' : ''}
                   type="button"
                   onClick={() => {
                     setActiveImageIndex(index);
                   }}
                   >
                    <img src={image.url} alt={garage.name} />
                  </button>
                )
              })
            }
          </div>
          
          <div className="garage-details-content">
            <h1>{garage.name}</h1>
            <p>{garage.about}</p>

            <div className="map-container">
              <MapContainer 
                center={[garage.latitude,garage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={MapIcon} position={[garage.latitude,garage.longitude]} />
              </MapContainer>

              <footer>

                <a target="_blank" rel="noreferrer" href={`https://maps.google.com/?q=${garage.latitude},${garage.longitude}`}>Ver rotas no Google Maps</a>
                
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{garage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {garage.opening_hours}
              </div>
              {garage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}