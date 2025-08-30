const sendMail = require("../middleware/mailer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
"${text}"

We’ll get back to you as soon as possible.

Best regards,  
Nash Maglaqui  
Owner, Reelay`
    );

    return res.status(200).json({ success: "Successfully sent." });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const getUsers = async (req, res) => {
  try {
    const userId = req.user.id;

    const adminCheck = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!adminCheck.admin) {
      return res.status(400).json({ error: "Unauthorized Access" });
    }

    const users = await prisma.user.findMany({
      where: {},
      select: {
        email: true,
        id: true,
        name: true,
        profilePic: true,
        ticket: true,
        admin: true,
      },
    });
    return res.status(200).json({ success: users });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const adminCheck = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!adminCheck.admin) {
      return res.status(400).json({ error: "Unauthorized Access" });
    }

    if (!id) {
      return res.status(400).json({ error: "No ID found!" });
    }

    await prisma.user.delete({
      where: { id : parseInt(id) },
    });
    
    return res.status(200).json({success: "Successfully Deleted."})
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const findUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { query } = req.params;

    const adminCheck = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!adminCheck.admin) {
      return res.status(400).json({ error: "Unauthorized Access" });
    }

    const results = await prisma.user.findMany({
      where: {
        email: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        email: true,
        id: true,
        name: true,
        profilePic: true,
        ticket: true,
        admin: true,
      },
    });
    return res.status(200).json({ success: results });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { tickets, id } = req.body;
    console.log(tickets)

    const adminCheck = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!adminCheck.admin) {
      return res.status(400).json({ error: "Unauthorized Access" });
    }

    await prisma.user.update({
      where: { id: id },
      data: {
        ticket: parseInt(tickets),
      },
    });
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ error: err.message });
  }
};

const adminCheck = async (req, res) => {
  try {
    const userId = req.user.id;

    const adminCheck = await prisma.user.findUnique({
      where: { id: userId },
    });


    if (adminCheck.admin === true) {
      return res.status(200).json({ success: adminCheck.admin });
    }
    return res.status(200).json({ success: adminCheck.admin });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = {
  contactAdmin,
  getUsers,
  findUser,
  updateUser,
  deleteUser,
  adminCheck,
};
