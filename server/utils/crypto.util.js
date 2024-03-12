const crypto = require("crypto");

// FUNCTION : Password Hashing
const generateHash = (
  password,
  salt = crypto.randomBytes(32).toString("hex")
) => {
  try {
    const generatedHash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return {
      salt,
      hash: generatedHash,
    };
  } catch (error) {
    return {};
  }
};

// FUNCTION : Validates Hash
const validateHash = (password, salt, hash) => {
  try {
    const { hash: generatedHash } = generateHash(password, salt);
    const isHashValid = generatedHash === hash;
    return isHashValid;
  } catch (error) {
    return false;
  }
};

module.exports = {
  generateHash,
  validateHash,
};
