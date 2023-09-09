import express from 'express';
import users from './users/index.js';

const router = express.Router();
router.use('/v1/user', users);

export default router;
