import express from 'express';
import router from './router';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use((req, res, next, err) => {
  console.error(err);
  const { status, message } = err;
  res
    .status(status || 500)
    .json({ message: message || 'internal server error' });
});

export default app;
