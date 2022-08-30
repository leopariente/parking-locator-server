import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { parkingRoute } from './routes/parkingRoute';
import { userRoute } from './routes/userRoute';


const app: Express = express();
app.use(cors());
app.use(json());
const root: string = path.join(process.cwd(), 'dist');

app.use(parkingRoute);
app.use(userRoute)
app.use(express.static(root));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Hosted: http://localhost:' + port);
});

