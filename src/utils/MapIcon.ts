import L from 'leaflet'
import pinIcon from '../images/pinIcon.png'

const MapIcon = L.icon({
    iconUrl: pinIcon,
  
    iconSize: [36, 48],
    iconAnchor: [18, 48],
    popupAnchor: [0, -60]
})
export default MapIcon