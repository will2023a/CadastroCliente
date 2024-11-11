import express, { Application } from 'express';
import dotenv from 'dotenv';
import { router } from './routes/userRoutes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const app: Application = express();

dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
