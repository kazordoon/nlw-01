import { Request, Response } from 'express';
import knex from '../database/connection';
import Point from '../contracts/Point';

export default {
  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const point = await knex('points')
        .select('*')
        .where('id', '=', id)
        .first();

      if (!point) {
        return res.status(400).json({ error: 'Point not found.' });
      }

      const items = await knex('items')
        .select('items.title')
        .join('point_items', 'items.id', 'point_items.item_id')
        .where('point_items.point_id', '=', id);

      return res.json({ point, items });
    } catch (err) {
      return res.status(400).json({ error: "Couldn't show this point." });
    }
  },
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
