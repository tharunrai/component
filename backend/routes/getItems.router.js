import express from 'express';
import getItems from '../controllers/getItems.controller.js';

const router = express.Router();

// Route to get all items
router.get('/', getItems);

export default router;
