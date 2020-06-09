import { resolve } from 'path';

import PointRequestBody from '../../src/contracts/PointRequestBody';

const point: PointRequestBody = {
  name: 'Mercadinho Aleatório',
  email: 'contato@mercadinho.com',
  city: 'Rio de Janeiro',
  uf: 'RJ',
  latitude: 0,
  longitude: 0,
  whatsapp: '40028922',
  image: resolve(__dirname, 'image.jpg'),
  items: '1, 2',
  invalidImage: resolve(__dirname, 'invalidFile.sh'),
  largeImage: resolve(__dirname, 'largeImage.jpg'),
};

export default point;
