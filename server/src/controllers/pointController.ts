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

      const point: Point = {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        image: 'fake_image',
      };

      const [pointId] = await trx<Point>('points')
        .insert(point).returning('id');

      const pointItems = items.map((itemId: number) => ({
        item_id: itemId,
        point_id: pointId,
      }));

      await trx('point_items')
        .insert(pointItems);

      await trx.commit();

      return res.status(201).json({
        id: pointId,
        ...point,
      });
    } catch (err) {
      return res.status(400).json({ error: "Couldn't create a new point." });
    }
  },
};
