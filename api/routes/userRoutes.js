import express from 'express';
import { test, updateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router();

router.get("/home", test)
router.post('/update/:id', verifyToken, updateUser)

export default router;