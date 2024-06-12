import express from 'express';
import http from "http";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import dotenv from 'dotenv';

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


dotenv.config();

mongoose.Promise = global.Promise;
if (process.env.MONGO_URL === undefined) {
    throw new Error('MONGO_URL is not defined');
}
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.once('error', (err) => {
    console.error('MongoDB connection error: ', err);
});
mongoose.connection.once('open', () => {
    console.log('MongoDB connected');
});


app.use('/', router());