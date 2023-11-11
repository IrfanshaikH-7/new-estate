import express from 'express';
import { deleteUser, getListing, test, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/', test);
router.post('/update/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyUser, deleteUser);
router.get('/listings/:id',verifyUser, getListing);

export default router