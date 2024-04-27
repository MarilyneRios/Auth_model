//index.js
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'; 

const port = process.env.PORT || 3001;

connectDB();

const app = express(); 

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}
)); 

//gérer les données JSON et URL encodées dans les requêtes entrantes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Le terme “api”  est une convention lors de la création d’APIs Web.
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    //indique au serveur où trouver et comment servir certains fichiers static
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    // route générique qui correspond à toutes les requêtes GET
    app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server Started on port ${port}`));
