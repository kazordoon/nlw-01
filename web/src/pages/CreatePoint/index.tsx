import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';

import './styles.css';
import logo from '../../assets/logo.svg';
import API from '../../services/api';
import Item from '../../contracts/Item';
import IBGE_UF_Response from '../../contracts/IBGE_UF_Response';
import IBGECityResponse from '../../contracts/IBGECityResponse';

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [UFs, setUFs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    API.get('/items')
      .then((response) => setItems(response.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    axios.get<IBGE_UF_Response[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .then((response) => {
        const UFInitials = response.data.map((UF) => UF.sigla);
        setUFs(UFInitials);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`)
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);
        setCities(cityNames);
      })
      .catch(console.error);
  }, [selectedUf]);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const UF = event.target.value;
    setSelectedUf(UF);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSelectedCity(city);
  }

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
               <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
              >
                <option value="0">Selecione um estado</option>
                {UFs.map((UF) => (
                  <option key={UF} value={UF}>
                    {UF}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
               <label htmlFor="city">Cidade</label>
               <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
              >
                <option value="0">Selecione uma cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
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
