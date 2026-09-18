import { Router } from 'express';
import { createEnquiry, getBusinessEnquiries } from '../controllers/enquiryController';

const router = Router();

router.post('/', createEnquiry);
router.get('/business/:id', getBusinessEnquiries);

export default router;
