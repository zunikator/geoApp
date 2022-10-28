import express from "express";
import cors from 'cors';
import morgan from "morgan";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

// const options = {

// }

import locationRoutes from './routes/location'

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(locationRoutes);

// app.use('/docs', swa)

export default app;