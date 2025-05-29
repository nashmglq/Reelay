const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { GoogleGenAI, Modality } = require("@google/genai");
const fs = require("fs");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const crypto = require('crypto');

const postGenAi = async (req, res) => {
  try {
    const { prompt } = req.body;
    const randomString = crypto.randomBytes(10).toString('hex').slice(0,10)
    const contents = `Base on this prompt provide an Image accurately with 100% of accuracy: ${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: contents,
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

module.exports = { postGenAi };
