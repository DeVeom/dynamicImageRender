import { CACHE_PERIOD } from '../utils/contants';

export const setCache = (req, res, next) => {
  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${CACHE_PERIOD}`);
  } else {
    res.set('Cache-control', `no-store`);
  }

  next();
};
