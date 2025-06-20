const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { GoogleGenAI, Modality } = require("@google/genai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const crypto = require("crypto");
const { platform } = require("os");

const newChat = async (req, res) => {
  try {
    const { title, selectedPlatforms, selectedTypes } = req.body;
    const id = req.user.id;

    if (!title || selectedPlatforms.length === 0 || selectedTypes.length === 0)
      return res.status(400).json({ error: "Please insert all fields" });

    const queryTitle = await prisma.chat.findFirst({
      where: { title, userId: id },
    });

    if (queryTitle)
      return res.status(400).json({ error: `"${title}" already exist` });

    const createNewChat = await prisma.chat.create({
      data: {
        title: title,
        createdAt: new Date(),
        dateLastModified: new Date(),
        platform: selectedPlatforms,
        userId: id,
        typeOfChat: selectedTypes,
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
    });
    if (fetchChat[0].userId != id)
      return res.status(400).json({ error: "You are not authenticated" });

    // console.log(fetchChat.length === 0 , !fetchChat.length)
    // "!" turn value opposite, so 0 will be true

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
    const { prompt, uuid, platform } = req.body;
    if (!prompt)
      return res.status(400).json({ error: "Please input your prompt." });
    const randomString = crypto.randomBytes(10).toString("hex").slice(0, 10);
    const imagePrompt = `Based on the following prompt, generate an image that represents it as accurately as 
    possible and make it as a thumbnail base on the platform given:\n\n${prompt}
    \n\n Platform:${platform} `;

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
          },
        });
        return res.status(200).json({ success: `${fileName}` });
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const generateScript = async (req, res) => {
  try {
    const { prompt, platform, uuid } = req.body;
    const id = req.user.id;
    // if not user dont show

    if (!prompt || !platform || !uuid)
      return res
        .status(400)
        .json({ error: "Please input all the required fields." });

    const promptMessage = `Please write a complete script for the platform "${platform}" based on the following idea:
    \n\n ${prompt}
    \n\n Only return the script. Do not include any additional messages.`;

    const result = await model.generateContent(promptMessage);

    const saveResult = await prisma.genText.create({
      data: {
        prompt,
        content: result.response.text(),
        chatId: uuid,
      },
    });

    return res.status(200).json({ success: result.response.text() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = use.params();

    if (!id) return res.status.json({ error: "Please provide an ID." });

    const deleteChat = await prisma.chat.delete({
      where: { userId: userId, id: id },
    });

    return res.status(200).json({ success: "Successfully deleted chat." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateChat = async (req, res) => {
  try {
    const userId = req.user.id;
    const id = req.params;
    const { type, platform } = req.body;

    if (!type && !platform) return res.status.json({ error: "Please provide " });

    const updateChat = await prisma.chat.delete({
      where: { userId: userId, id: id },
      data: {
        typeOfChat: type,
        platform: platform
      }
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
};
