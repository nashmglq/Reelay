const express = require("express");
const {
  verificationGoogleToken,
  getProfile,
  updateProfile,
  postTicket,
  getTicket
} = require("../controller/authController");
const { authCheck } = require("../middleware/middleware");
const routeAuth = express.Router();
const {upload} = require("../middleware/middleware");


routeAuth.post("/google-auth", verificationGoogleToken);
routeAuth.get("/get-profile", authCheck, getProfile);
routeAuth.put(
  "/update-profile",
  authCheck,
  upload.single("profilePic"),
  updateProfile
);
routeAuth.post("/post-ticket", authCheck, postTicket)
routeAuth.get("/get-ticket", authCheck, getTicket)
module.exports = routeAuth;
