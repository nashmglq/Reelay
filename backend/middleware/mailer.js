const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const emailStructure = (from, to, subject, text) => {
  const emailSent = {
    from,
    to,
    subject,
    text,
  };

  return transporter.sendMail(emailSent);
};


module.exports = emailStructure;
