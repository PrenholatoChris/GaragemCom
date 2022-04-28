import Sidebar from '../components/Sidebar'
import '../styles/pages/search-garage.css'

export default function searchGarage(){
  async function handleSearch(){//event:FormEvent){
  //   event.preventDefault();

    
  //   navigate('/app')
  }

  return(
    <div id="search-garage">
      <Sidebar/>
      <main>
          <form onSubmit={handleSearch} >
            <input type="text" id="name"/>

            <select name="orderby" id="orderby">
              <option value="default">Padrão</option>
              <option value="distance">Distancia</option>
              <option value="price">Preço</option>
            </select>
          </form>
      </main>
    </div>
  )
}