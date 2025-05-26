const express = require("express");
const { verificationGoogleToken, getProfile } = require("../controller/authController");
const { authCheck } = require("../middleware/middleware");
const routeAuth = express.Router()

routeAuth.post("/google-auth", verificationGoogleToken)
routeAuth.get("/get-profile", authCheck ,getProfile)


module.exports = routeAuth;