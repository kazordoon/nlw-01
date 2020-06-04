import { Router } from 'express';

import pointController from './controllers/pointController';
import itemController from './controllers/itemController';

const routes = Router();

routes.get('/items', itemController.index);

routes.get('/points/:id', pointController.show);
routes.post('/points', pointController.create);

export default routes;
