import { Request, Response } from 'express';
import knex from '../database/connection';
import Item from '../contracts/Item';

class ItemController {
  async index(req: Request, res: Response) {
    try {
      const items = await knex<Item>('items').select('*');

      const serializedItems = items.map((item) => ({
        id: item.id,
        title: item.title,
        image_url: `http://${process.env.HOST}:${process.env.PORT}/uploads/${item.image}`,
      }));
      return res.json(serializedItems);
    } catch (err) {
      return res.status(500).json({ error: "Couldn't list the items." });
    }
  }
}

export default new ItemController();
