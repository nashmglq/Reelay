const express = require("express");
const { contactAdmin, getUsers, findUser } = require("../controller/admin");
const adminRoute = express.Router();
const { authCheck } = require("../middleware/middleware");

adminRoute.post("/contact-us", contactAdmin)
adminRoute.get("/get-users", authCheck, getUsers)
adminRoute.post("/get-user-query", authCheck, findUser )


module.exports = {
    adminRoute
}