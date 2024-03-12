const jwt = require("jsonwebtoken");

// FUNCTION : Generate JWT Tokens
const generateJWTTokens = (payload) => {
  try {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "12h",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    return {
      access: accessToken,
      refresh: refreshToken,
    };
  } catch (error) {
    return false;
  }
};

const generateForgotPasswordToken = (payload) => {
  try {
    const forgotPasswordToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    return forgotPasswordToken;
  } catch (error) {
    return false;
  }
};

module.exports = {
  generateJWTTokens,
  generateForgotPasswordToken,
};
