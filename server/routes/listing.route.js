import express from 'express';
import { createListing, deleteListing, updateListing, getListing, getListings} from '../controllers/listing.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', createListing);
router.delete('/delete/:id',verifyUser, deleteListing);
router.post('/update/:id',verifyUser, updateListing);
router.get('/getlisting/:id', getListing)
router.get('/get', getListings)


export default router;