const express = require("express");
const { contactAdmin, getUsers, findUser, updateUser, deleteUser, adminCheck } = require("../controller/admin");
const adminRoute = express.Router();
const { authCheck } = require("../middleware/middleware");

adminRoute.post("/contact-us", contactAdmin)
adminRoute.get("/get-users", authCheck, getUsers)
adminRoute.get("/search-user/:query", authCheck, findUser )
adminRoute.put("/update-user", authCheck, updateUser)
adminRoute.delete("/delete-user/:id", authCheck, deleteUser)
adminRoute.get("/admin-check", authCheck, adminCheck)


module.exports = {
    adminRoute
}