import express from 'express';
import http from "http";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

import * as dotenv from 'dotenv'; // Import dotenv

dotenv.config();

const dbPassword = process.env.DB_PASSWORD;


const app = express();

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server started on port 8080');
});

const MONGO_URL = 'mongodb+srv://armstrongwang2000:L2nPoCIyY5I1zA6x@cluster0.lk7fdpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.once('error', (err) => {
    console.error('MongoDB connection error: ', err);
});
mongoose.connection.once('open', () => {
    console.log('MongoDB connected');
});


app.use('/', router());