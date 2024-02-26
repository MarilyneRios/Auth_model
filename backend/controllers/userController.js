//bibliothèque d’assistance pour gérer les exceptions dans les fonctions asynchrones
//(les exceptions non gérées dans les routes asynchrones seront automatiquement transmises à votre middleware d’erreur)
import asyncHandler from 'express-async-handler';


// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public ( n’importe qui peut envoyer une requête à cette route)
//monggose attend une promise => async
const authUser = asyncHandler(async (req, res)  => {
    res.status(200).json({message: 'Auth User'});
});

export {
    authUser,
    
  };