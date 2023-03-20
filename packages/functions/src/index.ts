import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import express from 'express';
import authRouter from './auth';
import searchRouter from './search';
import cors from 'cors';

admin.initializeApp();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/search', searchRouter);

app.get('/', (req, res) => res.status(200).send('hello'));

export const api = functions.region('asia-northeast3').https.onRequest(app);
