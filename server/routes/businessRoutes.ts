import { Router } from 'express';
import multer from 'multer';
import {
  getBusinesses,
  searchBusinesses,
  getBusinessById,
  createBusiness,
} from '../controllers/businessController';

const router = Router();

// Multer storage in memory for streaming/processing to Supabase Storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per file
    files: 10,
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and WebP images are allowed.'));
    }
  },
});

router.get('/search', searchBusinesses);
router.get('/', getBusinesses);
router.get('/:id', getBusinessById);

router.post(
  '/',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 8 },
  ]),
  createBusiness
);

export default router;
