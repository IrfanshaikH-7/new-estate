import express from 'express'
import { google, signin, signoutUser, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/google', google )
router.get('/signout', signoutUser)

export default router