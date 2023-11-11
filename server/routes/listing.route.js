import express from 'express';
import { createListing, deleteListing, updateListing, getListing} from '../controllers/listing.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', createListing);
router.delete('/delete/:id',verifyUser, deleteListing);
router.post('/update/:id',verifyUser, updateListing);
router.get('/getlisting/:id', getListing)


export default router;