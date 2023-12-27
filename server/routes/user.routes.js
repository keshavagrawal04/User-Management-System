const router = require('express').Router();
const { userController } = require('../controllers');
const { authMiddleware } = require('../middlewares');
const { multerMiddleware } = require('../middlewares');

const { jwt } = require('../utils');

router.post('/register', multerMiddleware.upload.single('profilePicture'), userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/get', authMiddleware.authenticateToken, userController.getUsers);
router.get('/get/:id', authMiddleware.authenticateToken, userController.getUser);
router.delete('/delete/:id', authMiddleware.authenticateToken, userController.deleteUser);
router.patch('/update/:id', authMiddleware.authenticateToken, userController.updateUser);
router.post('/token/refresh', jwt.accessTokenRefresh);

module.exports = router;
