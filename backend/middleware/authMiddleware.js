import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// protect = middleware qui vérifie si un user est authentifié,
//avant de lui permettre d’accéder à certaines routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
        // Vérifie le token avec la clé secrète
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //  // Recherche user dans la data base
      req.user = await User.findById(decoded.userId).select('-password');

      // Passe au middleware suivant
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };

//next = fonction qui permet de passer au middleware suivant dans la chaîne de traitement des requêtes. 
//Si vous appelez next(), Express exécute le middleware suivant. 
//Si vous ne l’appelez pas, la requête reste bloquée dans ce middleware.
