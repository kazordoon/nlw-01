import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import './styles.css';
import logo from '../../assets/logo.svg';
import API from '../../services/api';
import Item from '../../contracts/Item';

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    API.get('/items')
      .then(response => setItems(response.data))
      .catch(console.error);
  }, []);

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta Logo" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form action="">
        <h1>Cadastro do <br /> ponto de coleta</h1>
       
        <fieldset>
          <legend>
            <h2>Dados</h2>
            <div className="field">
                <label htmlFor="name">Nome da entidade</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                />
              </div>
              <div className="field">
                <label htmlFor="name">Whatsapp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  id="whatsapp"
                />
              </div>
            </div>

          </legend>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereços</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={[0,0]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[0,0]}></Marker>
          </Map>

          <div className="field-group">
            <div className="field">
               <label htmlFor="uf">Estado (UF)</label>
               <select name="uf" id="uf">
                 <option value="0">Selecione um estado</option>
               </select>
            </div>
            <div className="field">
               <label htmlFor="city">Cidade</label>
               <select name="city" id="city">
                 <option value="0">Selecione uma cidade</option>
               </select>
            </div>
          </div>
        </fieldset>

         <fieldset>
          <legend>
            <h2>ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>
          <ul className="items-grid">
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  )
};

export default CreatePoint;
