import express from 'express';
import addPerson from '../controllers/addPerson.controller.js';

const router = express.Router();

// Route to add a person (lending record)
router.post('/', addPerson);

export default router;
