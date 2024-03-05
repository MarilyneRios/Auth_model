# Dans le dossier principale (root)

1/ npm init -y (package.json)

2/  npm i express dotenv mongoose bcryptjs jsonwebtoken cookie-parser

3/ Créer un dossier backend

4/ Dans package.json :
    "type": "module", (utilise import au lieu de require)
    "description": "MERN authentication system",
    "main": "backend/index.js",

5/ Dans package.json :
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon index.js"
        "server": "nodemon index.js"
    },

6/ npm i -D nodemon

7/ Créer le fichier : .env 
    NODE_ENV=development
    PORT=numéroDuPortUtilisé

    VITE_DB_CONNECTION_STRING=
    JWT_SECRET=

8/ Créer le fichier : **.gitignore**

    node_modules
    .env

# Dans le dossier backend

1/ Créer un fichier : index.js

2/ dans index.js:

    import express from 'express';
    const port = 3001;

    const app = express();

    app.get('/', (req, res) => res.send('Server is ready'));

    app.listen(port, () => console.log(`Server Started on port ${port}`));

3/  Dans le terminal : node index.js => Server Started on port 3001

4/ **npm run server**

    > authentification_model@1.0.0 server
    > nodemon index.js

    [nodemon] 3.1.0
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,cjs,json
    [nodemon] starting `node index.js backend/index.js`
    Server Started on port 3001

5/ Dans index.js :

    **import dotenv from 'dotenv';**
    **dotenv.config();**
    import express from 'express';

    **const port = process.env.PORT || numéroDuPortUtilisé;**

    const app = express();

    app.get('/', (req, res) => res.send('Server is ready'));

    app.listen(port, () => console.log(`Server Started on port ${port}`));

6/ Créer un dossier : routes

7/ Créer un fichier : userRoutes.js
    import express from 'express';
    import {
    authUser,
    } from '../controllers/userController.js';

    const router = express.Router();

    router.post('/auth', authUser);

    export default router;

8/ Créer un dossier : controller.js
    => un contrôleur est une partie du code qui reçoit les requêtes HTTP de l’utilisateur 

9/ Créer un fichier : userController.js# Auth_model

    const authUser =  (req, res) => {
        res.status(200).json({message: 'Auth User'})
    }

    export {
        authUser,
        
    };

10/ npm install **express-async-handler**
    Une **bibliothèque** d’assistance pour gérer les exceptions dans les **fonctions asynchrones**
    (les exceptions non gérées dans les routes asynchrones seront automatiquement transmises à votre middleware d’erreur)

    Dans userController.js:

    import asyncHandler from 'express-async-handler';

    //monggose attend une promise => async
    const authUser = asyncHandler(async (req, res)  => {
        res.status(200).json({message: 'Auth User'});
    });

    export {authUser};

11/ Créer un dossier : middleware

12/ Créer un fichier : errorMiddleware.js

13/ Créer un dossier : config

14/ Créer un fichier : db.js

    import mongoose from 'mongoose';

    const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.VITE_DB_CONNECTION_STRING);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
    };

export default connectDB;

13/ Créer un dossier : models

14/ Créer un fichier : userModel.js


# Tester les routes:

1/ routes user/auth :

        Dans Thunder Client dans mon cas: Post + http://localhost:3001/api/users/auth
        Réponse: 
            status 200 
        et 
            {
            "message": "Auth User"
            }

2/ route('/profile')

 GET ou PUT + http://localhost:3001/api/users/profile
  
 .get( getUserProfile)
 .put( updateUserProfile);

 3/ récuperation du body.req avec thunder client

    post http://localhost:3001/api/users

    Body => Form-encode => username : riri
    {
    "message": "Register User"
    }
    clg = riri

    /// Dans userController
    const registerUser = asyncHandler(async (req, res) => {
    const { username} = req.body;  
    console.log(username);
        res.status(200).json({message: 'Register User'});
    });
    ///

# fontend

1/ npm create vite@latest frontend
    a/ y
    b/ react
    c/ JavaScript

2/  cd frontend

3/ npm i (install)

4/   npm run dev

5/ vite.config.js : 
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
        plugins: [react()],
        server: {
        port: 3000,
        proxy: {
        '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
        },
        },
        },
    })

6/ Dans le dossier racine : package.json :

     "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js",
    "server": "nodemon index.js",
    "client": "npm run dev --prefix frontend" 
  },

7/ Retour à la racine du dossier (cd ..)
 
8/ npm run client

9/ npm i bootstrap-icons,npm i react-bootstrap bootstrap et npm install react-icons puis npm install react-router-bootstrap



10/ dans main.jsx :
  
    import 'bootstrap/dist/css/bootstrap.min.css';
  
11/ Création du dossier : components

12/ header.jsx //rafce

11/ Création du dossier : screens

12/ HomeScreen.jsx //rafce

13/ npm i react-router-dom

14/  creation du routeur dans main.jsx ( gérer la navigation, définir des routes ) , 
Outlet dans App.jsx (afficher le contenu de la route/ screen), 
LinkContainer : 
 - permet de créer des liens de navigation qui interagissent avec le routeur.
 - envelopper des éléments de la bibliothèque React Bootstrap et les rendre réactifs aux changements d’URL.

15/ LoginScreen : formulaire + états 
    main : ajout route login
    RegisterScreen : formulaire + états
    main : ajout route register

16/ npm i @reduxjs/toolkit react-redux   

17/ créer le fichier store.js dans le dossier src

    - Le store est l’endroit où vous stockez l’état global de votre application et où vous gérez les actions et les réducteurs.
    - Le composant Provider  rend le store Redux disponible pour le reste de votre application.

18/ main.jsx : ajout provider et store

19/ Créer un dossier Slices puis fichier authSlice.js et apiSlice.js

20/ Ajout auth: authReduce dans le store.js

# Racine do projet : concurrently

concurrently permet d’exécuter plusieurs commandes en parallèle/ même temps.

1/ npm i -D concurrently 

2/Dans le dossier racine : package.json :

     "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js",
    "server": "nodemon index.js",
    "client": "npm run dev --prefix frontend" 
    "dev": "concurrently \"npm run server\" \"npm run client\""
    },