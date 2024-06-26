//userController.js
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password} = req.body;  
  console.log('le username : ' + username + ', le email : '+ email + ' et le password : '+ password);

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ username, email, password });
  if (user) {
    generateToken(res, user._id);

    res.status(201).json({_id: user._id, username: user.username,  email: user.email});
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public ( n’importe qui peut envoyer une requête à cette route)
//monggose attend une promise => async
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (token)
const getUserProfile = asyncHandler(async (req, res) => {

    //res.status(200).json({message: 'User profil successfully'});//tester la route

    console.log(req.user); // on peut lire le id, username, email, les dates de création et update

    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });

      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
});


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private (token)
const updateUserProfile = asyncHandler(async (req, res) => {
   // res.status(200).json({message: 'Update user profil successfully'});//tester la route

      // Récupère user avec _id fourni dans la requête
   const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

     // Si un mot de passe est donné, met à jour du password
    if (req.body.password) {
      user.password = req.body.password;
    }

     // Sauvegarder les modifications 
    const updatedUser = await user.save();

    // Renvoie une réponse JSON contenant les informations mises à jour
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  // Supprime le cookie
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logout user successfully' });
  };

  export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
  };

  /*
'jwt' =le nom du cookie.
'' : C’est la valeur du cookie, 
    ce qui efface essentiellement la valeur du cookie.

Les options du cookie:
httpOnly: true signifie que le cookie ne peut être accédé que par le serveur web et pas par le code côté client 
=> une mesure de sécurité qui aide à prévenir les attaques de type cross-site scripting (XSS).

expires: new Date(0) définit la date d’expiration du cookie à une date dans le passé (le 1er janvier 1970 à 00:00:00 UTC, pour être précis). 
Cela fait que le navigateur expire immédiatement le cookie, ce qui a pour effet de le supprimer.
  */