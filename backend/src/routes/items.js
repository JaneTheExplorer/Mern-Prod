import { Router } from 'express';
import { Item } from '../db.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }).limit(50);
    res.json(items);
  } catch (e) { next(e); }
});

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });
    const created = await Item.create({ name });
    res.status(201).json(created);
  } catch (e) { next(e); }
});

export default router;
