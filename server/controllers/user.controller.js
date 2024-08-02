const { userService } = require("../services");
const { crypto, jwt, logger, send } = require("../utils");
const { responseMessage } = require("../configs");
const { uploadOnCloudinary, deleteOnCloudinary } = require("../utils");

// FUNCTION : User Register
const registerUser = async (req, res) => {
  try {
    let user = await userService.getUserByEmail(req.body.email);
    if (user) {
      res.status(400).json({ message: responseMessage.USER_ALREADY_EXISTS });
      logger.error(responseMessage.USER_ALREADY_EXISTS);
    } else {
      if (req.file) {
        const profileImageLocalPath = req.file.path;
        const profileImage = await uploadOnCloudinary(profileImageLocalPath);
        req.body.profileImage = profileImage.url;
      }
      user = await userService.saveUser(req.body);
      logger.info(responseMessage.USER_REGISTERED);
      return res
        .status(201)
        .json({ message: responseMessage.USER_REGISTERED, data: user });
    }
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({
      message: responseMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

// FUNCTION : User Login
const loginUser = async (req, res) => {
  try {
    let user = await userService.getUserByEmail(req.body.email);
    if (!user)
      return res
        .status(400)
        .json({ message: responseMessage.USER_NOT_REGISTERED });
    logger.error(responseMessage.USER_NOT_REGISTERED);
    let isPasswordValid = crypto.validateHash(
      req.body.password,
      user.password.salt,
      user.password.hash
    );
    if (!isPasswordValid)
      return res
        .status(400)
        .json({ message: responseMessage.PASSWORD_MISMATCH });

    user = { userId: user._id };
    const tokens = jwt.generateJWTTokens(user);
    logger.info(responseMessage.USER_LOGGED_IN);
    return res.status(201).json({
      message: responseMessage.USER_LOGGED_IN,
      tokens: tokens,
      userId: user.userId,
    });
  } catch (error) {
    logger.error(error.message);
    return res.status(400).json({
      message: responseMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

// FUNCTION : Get All Users
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    if (!users)
      return res
        .status(400)
        .json({ message: responseMessage.USERS_DATA_NOT_FOUND });
    logger.info(responseMessage.USER_DATA_RETRIEVAL);
    return res
      .status(200)
      .json({ message: responseMessage.USER_DATA_RETRIEVAL, data: users });
  } catch (error) {
    return res.status(400).json({
      message: responseMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

// FUNCTION : Get User
const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user)
      return res
        .status(400)
        .json({ message: responseMessage.USER_DATA_NOT_FOUND });
    logger.info(responseMessage.USER_DATA_RETRIEVAL);
    return res
      .status(200)
      .json({ message: responseMessage.USER_DATA_RETRIEVAL, data: user });
  } catch (error) {
    return res.status(400).json({
      message: responseMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

// FUNCTION : Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user)
      return res
        .status(400)
        .json({ message: responseMessage.USER_DATA_NOT_FOUND });
    await deleteOnCloudinary(user.profileImage);
    logger.info(responseMessage.USER_DELETED);
    return res
      .status(200)
      .json({ message: responseMessage.USER_DELETED, data: user });
  } catch (error) {
    return res.status(400).json({
      message: responseMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

// FUNCTION : Update User
const updateUser = async (req, res) => {
  try {
    let user = await userService.getUserById(req.params.id);
    if (!user)
      return res
        .status(400)
        .json({ message: responseMessage.USER.USER_DATA_NOT_FOUND });
    if (req.file) {
      const profileImageLocalPath = req.file.path;
      const profileImage = await uploadOnCloudinary(profileImageLocalPath);
      await deleteOnCloudinary(user.profileImage);
      req.body.profileImage = profileImage.url;
    }
    user = userService.updateUser(req.params.id, req.body);
    logger.info(responseMessage.USER_UPDATED);
    return res
      .status(200)
      .json({ message: responseMessage.USER_UPDATED, data: user });
  } catch (error) {
    return res.status(400).json({
      message: responseMessage.INTERNAL_SERVER_ERROR,
      error: error.message,
    });
  }
};

// FUNCTION : Forgot Password Controller
const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    let user = await userService.getUserByEmail(email);
    if (!user)
      return res
        .status(400)
        .json({ message: responseMessage.USER_DATA_NOT_FOUND });
    user = { userId: user._id, email: email };
    let forgotPasswordToken = jwt.generateForgotPasswordToken(user);
    let url = `https://user-management-system-two.vercel.app/reset-password/${forgotPasswordToken}`;
    await send(email, "Password Reset Email", url);
    logger.info(responseMessage.RESET_PASSWORD_EMAIL_SEND_SUCCESS);
    return res
      .status(200)
      .json({ message: responseMessage.RESET_PASSWORD_EMAIL_SEND_SUCCESS });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// FUNCTION : Reset Password
const resetPassword = async (req, res) => {
  try {
    let user = await userService.getUserById(req.user.userId);
    if (!user)
      return res
        .status(400)
        .json({ message: responseMessage.USER.USER_DATA_NOT_FOUND });
    req.body.password = await crypto.generateHash(req.body.password);
    user = userService.updateUser(req.user.userId, req.body);
    logger.info(responseMessage.PASSWORD_RESET_SUCCESS);
    return res
      .status(200)
      .json({ message: responseMessage.PASSWORD_RESET_SUCCESS });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// FUNCTION : Generate New Access Tokens For Valid Refresh Token
const accessTokenRefresh = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == "")
    return res.status(400).json({ message: "refreshToken field is required" });

  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decode) => {
        if (error)
          return res.status(400).json({ message: "Invalid Refresh Token" });
        const user = {
          user_id: decode.id,
        };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        logger.info("Access Token Refreshed");
        return res.status(200).json({
          message: "Access Token Refreshed",
          tokens: { access: accessToken },
        });
      }
    );
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  accessTokenRefresh,
  forgotPassword,
  resetPassword,
};
