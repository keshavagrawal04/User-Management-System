// OBJECT : Object For Response Messages
const responseMessage = {
  USER_REGISTERED: "User Registered Successfully",
  USER_LOGGED_IN: "User Logged In Successfully",
  USER_ALREADY_EXISTS: "User Already Exists",
  PASSWORD_MISMATCH: "Password Mismatch",
  USER_DELETED: "User Data Deleted Successfully",
  USER_UPDATED: "User Data Updated Successfully",
  USER_NOT_REGISTERED: "User With This Email Is Not Registered",
  USER_DATA_RETRIEVAL: "Users Data Retrieval Successfully",
  USERS_DATA_NOT_FOUND: "Users Data Not Found",
  USER_DATA_NOT_FOUND: "User Data Not Found",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  RESET_PASSWORD_EMAIL_SEND_SUCCESS:
    "Password Reset Email Send Successfully,\n Email Is Validated Only For 1 Hour",
  PASSWORD_RESET_SUCCESS: "Password Successfully Changed",
};

module.exports = responseMessage;
