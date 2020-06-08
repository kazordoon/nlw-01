import { Request, Response } from 'express';
import knex from '../database/connection';
import Point from '../contracts/Point';

class PointController {
  public async index(req: Request, res: Response) {
    try {
      const { city, uf, items } = req.query;

      const parsedItems = String(items)
        .split(',')
        .map((item) => Number(item.trim()));

      const points = await knex('points')
        .select('points.*')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', '=', String(city))
        .where('uf', '=', String(uf))
        .distinct();

      const serializedPoints = points.map((point) => ({
        ...points,
        image_url: `http://${process.env.HOST}:${process.env.PORT}/uploads/${point.image}`,
      }));

      return res.json(serializedPoints);
    } catch (err) {
      return res.status(500).json({ error: "Couldn't list the points." });
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const point = await knex('points')
        .select('*')
        .where('id', '=', id)
        .first();

      if (!point) {
        return res.status(400).json({ error: 'Point not found.' });
      }

      const serializedPoint = {
        ...point,
        image_url: `http://${process.env.HOST}:${process.env.PORT}/uploads/${point.image}`,
      };

      const items = await knex('items')
        .select('items.title')
        .join('point_items', 'items.id', 'point_items.item_id')
        .where('point_items.point_id', '=', id);

      return res.json({ point: serializedPoint, items });
    } catch (err) {
      return res.status(400).json({ error: "Couldn't show this point." });
    }
  }

  public async create(req: Request, res: Response) {
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
        image: req.file.filename,
      };

      const [pointId] = await trx<Point>('points')
        .insert(point).returning('id');

      const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((itemId: number) => ({
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
  }
}

export default new PointController();
