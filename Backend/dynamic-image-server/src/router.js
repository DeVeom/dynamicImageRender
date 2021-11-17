import express from 'express';
import upload from './middlewares/multer';

const router = express.Router();

router.post('/test', upload.single('image'), async (req, res, next) => {
  try {
    const image = req.file.location;
    if (!image) {
      return res.status(400).json({ errors: { message: 'Image not found! ' } });
    }
    return res.status(200).json({ message: 'Image upload succeeded', image });
  } catch (err) {
    next(err);
  }
});

export default router;
