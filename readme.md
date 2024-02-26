# dans le dossier principale (root)

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

4/  npm run server

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

8/ Créer un dossier : controller.js
    => un contrôleur est une partie du code qui reçoit les requêtes HTTP de l’utilisateur 

9/ Créer un fichier : userController.js# Auth_model
