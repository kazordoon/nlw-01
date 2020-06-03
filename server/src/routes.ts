import { Router, Request, Response } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response) => (
  res.json({ hello: 'world' })
));

export default routes;
