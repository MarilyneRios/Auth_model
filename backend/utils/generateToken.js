import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    //sameSite: 'none', //si 2 domaine différent
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    domain: '.https://auth-model.onrender.com', //Pour enregistrer les cookies dans le domaine racine, attention au point avant le nom
  });
};

export default generateToken;