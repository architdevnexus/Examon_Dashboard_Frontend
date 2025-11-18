import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path'
import { fileURLToPath } from 'url';
import Routes from './Routes/routes.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3003;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '20mb' }));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use('/temp', express.static(path.join(__dirname, 'public/temp')));
// app.use('/uploads', express.static('uploads'));

app.use('/api', Routes);

app.listen(PORT, () => {
    console.log("App Started");
    mongoose.connect(uri);
    console.log("DB Connected");
});

