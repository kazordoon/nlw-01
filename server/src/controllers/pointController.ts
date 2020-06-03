import { Request, Response } from 'express';
import knex from '../database/connection';
import Point from '../contracts/Point';

export default {
  async create(req: Request, res: Response) {
    try {
      const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items,
      } = req.body;

      const trx = await knex.transaction();

      const [pointId] = await trx<Point>('points')
        .insert({
          name,
          email,
          whatsapp,
          latitude,
          longitude,
          city,
          uf,
          image: 'fake_image',
        }).returning('id');

      const pointItems = items.map((itemId: number) => ({
        item_id: itemId,
        point_id: pointId,
      }));

      await trx('point_items')
        .insert(pointItems);

      return res.sendStatus(201);
    } catch (err) {
      return res.status(400).json({ error: "Couldn't create a new point." });
    }
  },
};
