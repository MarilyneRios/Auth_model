import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const port = process.env.PORT || 3001;

import userRoutes from './routes/userRoutes.js'

const app = express();

// Le terme “api”  est une convention lors de la création d’APIs Web.
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is ready'));


app.listen(port, () => console.log(`Server Started on port ${port}`));

/*les routes :

- POST / register un utilisateur
- POST / Authentifier un utilisateur et un token
- POST / déconnexion d'un utilisateur et nettoyer les cookies
- GET / obtenir un profile utilisateur
- PUT / mise à jour d'un profil

*/