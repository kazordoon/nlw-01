import {
  Router, Request, Response, NextFunction,
} from 'express';
import multer from 'multer';

import pointController from './controllers/PointController';
import itemController from './controllers/ItemController';
import multerConfig from './config/multer';
import validateCreatePoint from './validations/createPoint';

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
routes.post('/points', interceptUpload, validateCreatePoint, pointController.create);

export default routes;
