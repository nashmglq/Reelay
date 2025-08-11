const express = require("express");
const { contactAdmin, getUsers } = require("../controller/admin");
const adminRoute = express.Router();
const { authCheck } = require("../middleware/middleware");

adminRoute.post("/contact-us", contactAdmin)
adminRoute.get("/get-users", authCheck, getUsers)


module.exports = {
    adminRoute
}