import { Router } from 'express';

const router = Router();

router.use((req, res, next) => {
  res.status(404).json({ msg: 'Page not found' });
  next();
});

module.exports = router;
