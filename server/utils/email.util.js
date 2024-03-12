const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const send = async (to, subject, body) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: to,
      subject: subject,
      text: body,
    };
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

module.exports = send;
