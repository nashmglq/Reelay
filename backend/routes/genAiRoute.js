const express = require("express");
const route = express.Router()
const { authCheck } = require("../middleware/middleware");
const {generateImage, generateScript, newChat, getListViewChat} = require("../controller/userGeneration")

route.post("/create-chat", authCheck, newChat)
route.get("/get-chats", authCheck, getListViewChat)
route.post("/gen-image", authCheck, generateImage)
route.post("/gen-script", authCheck, generateScript)

module.exports = route