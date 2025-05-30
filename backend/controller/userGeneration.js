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
    const { title, platform } = req.body;
    const id = req.user.id;

    const queryTitle = await prisma.script.findFirst({
      where: { title: title },
    });

    if (queryTitle)
      return res.status(400).json({ error: `"${title}" already exist` });

    const createNewChat = await prisma.script.create({
      data: {
        title: title,
        prompt: null,
        createdAt: new Date(),
        dateLastModified: null,
        content: null,
        platform: platform,
        userId: id,
      },
    });

    return res.status(200).json({ success: `Successfully created ${title}` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt)
      return res.status(400).json({ error: "Please input your prompt." });
    const randomString = crypto.randomBytes(10).toString("hex").slice(0, 10);
    const imagePrompt = `Based on the following prompt, generate an image that represents it as accurately as possible:\n\n${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: imagePrompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });
    for (const part of response.candidates[0].content.parts) {
      console.log(response.candidates[0].content.parts);
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync(`genImage/${randomString}.png`, buffer);

        return res
          .status(200)
          .json({ success: `Generated: ${randomString}.png` });
      }
    }
  } catch (err) {
    console.error("Error in postGenAi:", err);
    return res.status(500).json({
      error: err.message,
    });
  }
};

const generateScript = async (req, res) => {
  try {
    const { prompt, platform } = req.body;

    if (!prompt)
      return res.status(400).json({ error: "Please input your prompt." });

    const promptMessage = `Please write a complete script for the platform "${platform}", based on the following idea:\n\n${prompt}`;

    const result = await model.generateContent(promptMessage);

    return res.status(200).json({ success: result.response.text() });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { newChat, generateImage, generateScript };
