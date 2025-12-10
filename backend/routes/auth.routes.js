import express from 'express';
import { login } from '../controllers/auth.controller.js';

const router = express.Router();

// Email/Password login
router.post('/login', login);

export default router;
