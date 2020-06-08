import {
  Router, Request, Response, NextFunction,
} from 'express';
import multer from 'multer';

import pointController from './controllers/pointController';
import itemController from './controllers/itemController';
import multerConfig from './config/multer';

const routes = Router();
const upload = multer(multerConfig).single('image');

const interceptUpload = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err: any) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    return next();
  });
};

routes.get('/items', itemController.index);

routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);
routes.post('/points', interceptUpload, pointController.create);

export default routes;
