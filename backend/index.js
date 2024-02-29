import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 3001;

connectDB();


const app = express();

//gérer les données JSON et URL encodées dans les requêtes entrantes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Le terme “api”  est une convention lors de la création d’APIs Web.
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server Started on port ${port}`));

/*les routes :

- POST / register un utilisateur
- POST / Authentifier un utilisateur et un token
- POST / déconnexion d'un utilisateur et nettoyer les cookies
- GET / obtenir un profile utilisateur
- PUT / mise à jour d'un profil

*/