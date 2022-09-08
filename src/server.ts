import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { parkingRoute } from './routes/parkingRoute';
import { userRoute } from './routes/userRoute';

export const app: Express = express();
app.use(cors());
app.use(json());

app.use(userRoute);
app.use(parkingRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});
