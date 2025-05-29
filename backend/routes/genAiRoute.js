const express = require("express");
const route = express.Router()
const { authCheck } = require("../middleware/middleware");
const {postGenAi} = require("../controller/userGeneration")

route.post("/post-genai", authCheck, postGenAi)

module.exports = route