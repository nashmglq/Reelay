const sendMail = require("../middleware/mailer");
const contactAdmin = async (req, res) => {
  try {
    const { email, subject, text } = req.body;

    if (!email || !subject || !text) {
      return res.status(400).json({ error: "Please input all fields." });
    }

    const emailOwner = await sendMail(
      process.env.EMAIL,
      process.env.EMAIL,
      `Email from ${email}: ${subject}`,
      text
    );

    const receipt = await sendMail(
      `"Reelay Support" <${process.env.EMAIL}>`,
      email,
      "Thank you for contacting Reelay – Here's a copy of your message",
      `Hi there,

Thank you for getting in touch with Reelay! We’ve received your message with the subject:

"${subject}"

Here’s what you sent:
"${message}"

We’ll get back to you as soon as possible.

Best regards,  
Nash Maglaqui  
Owner, Reelay`
    );

    return res.status(200).json({ success: "Successfully sent." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
    contactAdmin
}