const express = require("express");
const { contactAdmin } = require("../controller/admin");
const adminRoute = express.Router();

adminRoute.post("/contact-us", contactAdmin)


module.exports = {
    adminRoute
}