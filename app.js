import express, { json, urlencoded } from 'express';
import router from './routes/index.js';

const app = express();
const PORT = 3000;

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
});
