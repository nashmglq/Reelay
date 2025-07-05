const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { GoogleGenAI, Modality } = require("@google/genai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const crypto = require("crypto");

const newChat = async (req, res) => {
  try {
    const { title, selectedPlatforms, selectedTypes, scriptType } = req.body;
    const id = req.user.id;

    if (
      !title ||
      selectedPlatforms.length === 0 ||
      selectedTypes.length === 0 ||
      !scriptType
    )
      return res
        .status(400)
        .json({ error: "Please insert all fields including script type" });

    const queryTitle = await prisma.chat.findFirst({
      where: { title, userId: id },
    });

    if (queryTitle)
      return res.status(400).json({ error: `"${title}" already exist` });

    const createNewChat = await prisma.chat.create({
      data: {
        title,
        createdAt: new Date(),
        dateLastModified: new Date(),
        platform: selectedPlatforms,
        userId: id,
        typeOfChat: selectedTypes,
        scriptType,
      },
    });

    return res.status(200).json({ success: `Successfully created ${title}` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getListViewChat = async (req, res) => {
  try {
    const id = req.user.id;
    const fetchChat = await prisma.chat.findMany({
      where: { userId: id },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (fetchChat[0].userId != id)
      return res.status(400).json({ error: "You are not authenticated" });

    if (fetchChat.length === 0)
      return res.status(400).json({ success: "No chats yet." });

    return res.status(200).json({
      success: fetchChat,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const searchChat = async (req, res) => {
  try {
    const { query } = req.body;
    const userId = req.user.id;
    if (!query)
      return res.status(400).json({ error: "Please provide a query" });

    const search = await prisma.chat.findMany({
      where: {
        userId: userId,
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    return res.status(200).json({ success: search });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getDetailChat = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    if (!id) return res.status(400).json({ error: "Please provide an ID" });

    const getDetail = await prisma.chat.findUnique({
      where: {
        userId: userId,
        id: id,
      },
    });

    if (!getDetail)
      return res.status(400).json({ error: "Chat is not found." });

    return res.status(200).json({ success: getDetail });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const generateImage = async (req, res) => {
  try {
    const { prompt, uuid, text, position, allowed, oriented } = req.body;
    const userId = req.user.id;

      console.log(prompt,uuid, text,position,allowed,oriented)

    if (!allowed)
      return res
        .status(400)
        .json({ error: "Image generation in this chat is not available." });

    if (!prompt || !uuid || !oriented)
      return res.status(400).json({ error: "Please input all fields." });

    const randomString = crypto.randomBytes(10).toString("hex").slice(0, 10);
    const imagePrompt = `Based on the following prompt, generate an image that represents it as accurately as 
possible and make it as a thumbnail based on the platform given:\n\n${prompt}
\n\nInput the text provided: ${text ? text : "NONE"}
\n\nPosition of text: ${position && text ? position : text && !position ? "AI WILL PICK" : "NONE"}
\n\n Image Orientation : ${oriented}
\n\nDo NOT include the platform's logo in the image.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: imagePrompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });
    const date = Date.now();
    const fileName = `${date}-${randomString}`;
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync(`genImage/${fileName}.png`, buffer);

        const saveImage = await prisma.genImage.create({
          data: {
            thumbnailImage: fileName,
            chatId: uuid,
            userId: userId,
          },
        });
        return res.status(200).json({ success:  `${fileName}` });
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const historyImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) return res.status(400).json({ error: "No id found" });

    const getImages = await prisma.genImage.findMany({
      where: { userId, chatId: id },
    });

    if (!getImages)
      return res.status(400).json({ error: "No image history yet." });

    return res.status(200).json({ success: getImages });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const generateScript = async (req, res) => {
  try {
    const { prompt, platform, uuid, scriptType } = req.body;
    const userId = req.user.id;

    if (!prompt || !platform || !uuid)
      return res
        .status(400)
        .json({ error: "Please input all the required fields." });

    const promptMessage = `Based on the script type "${scriptType}", follow the correct format:

      - If the script type sounds like a play, act, skit, or scene: write it as a character-based script with dialogue and stage directions.
      - Otherwise, write it as a narrator-only script in a storytelling or explanatory format. Do NOT use characters or dialogue in this case.

      The platform is "${platform}".

      Here is the idea:

      "${prompt}"

      Return only the script. No comments, code, or extra formatting.`;

    const result = await model.generateContent(promptMessage);

    const saveResult = await prisma.genText.create({
      data: {
        prompt,
        content: result.response.text(),
        chatId: uuid,
        userId: userId,
      },
    });

    return res.status(200).json({ success: result.response.text() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const historyChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const chat = await prisma.chat.findUnique({
      where: { id },
      include: { genText: true },
    });

    if (!chat)
      return res.status(400).json({ error: "No chat history available" });

    if (chat.userId !== userId)
      return res.status(403).json({ error: "You are not authenticated." });

    return res.status(200).json({ success: chat.genText });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const { uuid } = req.params;
    console.log(uuid);
    if (!uuid) return res.status.json({ error: "Please provide an ID." });

    const deleteChat = await prisma.chat.delete({
      where: { userId: userId, id: uuid },
    });

    return res.status(200).json({ success: "Successfully deleted chat." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, uuid } = req.body;
    console.log(title, uuid);

    if (!title && !uuid)
      return res.status.json({
        error: "Please provide all fields: title, ID",
      });

    const titleExist = await prisma.chat.findUnique({
      where: { title: title, userId: userId },
    });

    if (titleExist === title) {
      return res
        .status(200)
        .json({ success: "No changes detected. Update not required." });
    }

    if (titleExist) {
      return res.status(400).json({
        error: "Title already exists. Please choose a different one.",
      });
    }

    const updateChat = await prisma.chat.update({
      where: { userId: userId, id: uuid },
      data: {
        title: title,
      },
    });

    return res.status(200).json({ success: "Successfully updated chat." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  newChat,
  getListViewChat,
  generateImage,
  generateScript,
  searchChat,
  getDetailChat,
  deleteChat,
  updateChat,
  historyChat,
  historyImage,
};
