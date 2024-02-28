//bibliothèque d’assistance pour gérer les exceptions dans les fonctions asynchrones
//(les exceptions non gérées dans les routes asynchrones seront automatiquement transmises à votre middleware d’erreur)
import asyncHandler from 'express-async-handler';


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password} = req.body;  
  console.log(username);

  const userExists = await UserModel.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await UserModel.create({ username, email, password });
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
const authUser = asyncHandler(async (req, res)  => {
   // res.status(401);
   // throw new Error('Invalid email or password');

    res.status(200).json({message: 'Auth User'});
});


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (token)
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'User profil successfully'});
});


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private (token)
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Update user profil successfully'});
});


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
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