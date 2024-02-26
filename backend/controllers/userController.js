
// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public ( n’importe qui peut envoyer une requête à cette route)
const authUser =  (req, res) => {
    res.status(200).json({message: 'Auth User'})
}