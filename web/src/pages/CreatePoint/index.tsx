import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

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

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords: { latitude, longitude } } = position;
        console.table({ latitude, longitude });
        setInitialPosition([latitude, longitude]);
      });
    }
  }, []);

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

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setSelectedPosition([lat, lng])
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = (selectedItems.findIndex((item) => item === id)) >= 0;
    if (alreadySelected) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
      return null;
    }

    setSelectedItems([...selectedItems, id]);
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
                  onChange={handleInputChange}
                />
              </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="name">Whatsapp</label>
                <input
                  type="tel"
                  name="whatsapp"
                  id="whatsapp"
                  onChange={handleInputChange}
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

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition}></Marker>
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
              <li
                className={selectedItems.includes(item.id) ? 'selected' : '' }
                onClick={() => handleSelectItem(item.id)}
                key={item.id}
              >
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
