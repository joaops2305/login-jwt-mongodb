import express from 'express';
import path from 'path';
import cors from 'cors';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

import router from './src/router.js';

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));

app.get('/', (req, res) =>{
     res.render("./views/index");
});

app.use('/api', router);

app.listen(3000, () =>{ 
     console.log("Servidor Online Porta 3000");
});