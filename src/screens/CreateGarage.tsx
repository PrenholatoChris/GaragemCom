import React, {FormEvent, useState, ChangeEvent, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet';
import L from 'leaflet';

import {FiPlus } from "react-icons/fi";
import MapIcon from '../utils/MapIcon'

import Sidebar from '../components/Sidebar';
import '../styles/pages/create-garage.css';


import api from "../services/api";



export default function CreateGarage() {
  let navigate = useNavigate()


  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [position, setPosition] = useState<L.LatLng | null >(null);
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  async function handleSubmit(event:FormEvent){
    event.preventDefault();

    const latitude = position?.lat
    const longitude = position?.lng;

    const data = new FormData();

    data.append('name', name)
    data.append('latitude', String(latitude))
    data.append('longitude',String(longitude))
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach(image => data.append('images', image))

    await api.post('garages',data)

    alert('Cadastro Realizado!')

    navigate('/app')
  }


  function LocationMarker(){
    const map = useMapEvent('click', (event) => {
        let positionClicked = event.latlng
        setPosition(positionClicked)
        map.flyTo(positionClicked, 17)
      })

      return position === null ? null :(
        <Marker interactive={false}
          icon={MapIcon}
          position={position}
          /> 
      )
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    const files = event.target.files
    if (files){
      const selectedImages = Array.from(files)
      const selectedImagesPreview = selectedImages.map(image => {
        return URL.createObjectURL(image);
      })

      setImages(selectedImages);  
      setPreviewImages(selectedImagesPreview)
    }
  }

  function handleRemoveImages(event: MouseEvent<HTMLButtonElement>) {
    const idClicked = parseInt(event.currentTarget.id);
      if(idClicked > -1){
        setImages(images.filter((item,index) => index !== idClicked));
        setPreviewImages(previewImages.filter((item,index) => index !== idClicked));
      }
      else{return;}
    }

  return (
    <div id="page-create-garage">
      <Sidebar />
      

      <main>
        <form onSubmit={handleSubmit} className="create-garage-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer 
              center={[-14.26438308756265,-49.13085937500001]} 
              style={{ width: '100%', height: 280 }}
              zoom={4}
              onclick={(event:any)=>{console.log(event)}}>
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              <LocationMarker/>
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} 
                value={about} onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              <div className="images-container">
                {
                  previewImages.map((image,index) => {
                  return ( 
                    <div key={image}  className="image-card">
                      <img src={image} id={`${index}`} alt={name}/>
                      <button type="button" id={`${index}`} onClick={handleRemoveImages}>X</button>
                    </div>
                  )
                  })
                }
                
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input onChange={handleSelectImages} multiple type="file" id="image[]"></input>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" 
                value={instructions} onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input id="opening_hours" 
                value={opening_hours} onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                type="button" 
                className={open_on_weekends ? 'active' : ''}
                onClick={event => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button 
                type="button"
                className={ !open_on_weekends ? 'active' : ''}
                style={!open_on_weekends ? 
                  {
                    backgroundColor:'#ffedf9',
                    color:"#FF669D",
                    borderColor:"#e9a1bc"
                  }: {}}
                onClick={event => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
