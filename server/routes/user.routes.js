const router = require('express').Router();
const { userController } = require('../controllers');
const { authMiddleware, multerMiddleware } = require('../middlewares');

// ROUTE : User Register
router.post('/register', multerMiddleware.upload.single('profileImage'), userController.registerUser);

// ROUTE : User Login
router.post('/login', userController.loginUser);

// ROUTE : All Users Data Get
router.get('/get', authMiddleware.authenticateToken, userController.getUsers);

// ROUTE : User Data Get By Id
router.get('/get/:id', authMiddleware.authenticateToken, userController.getUser);

// ROUTE : User Data Delete By Id
router.delete('/delete/:id', authMiddleware.authenticateToken, userController.deleteUser);

// ROUTE : User Data Update By Id
router.patch('/update/:id', [authMiddleware.authenticateToken, multerMiddleware.upload.single('profileImage')], userController.updateUser);

// ROUTE : Access Token Refresh
router.post('/token/refresh', authMiddleware.authenticateToken, userController.accessTokenRefresh);

module.exports = router;
