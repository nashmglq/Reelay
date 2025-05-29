const dotenv = require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const authRoute = require("./routes/authRoute")
const genAiRoute = require("./routes/genAiRoute")
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());
app.use("/auth", authRoute)
app.use("/crud-genAi", genAiRoute)


app.listen((port), () => {
    console.log(`Listening to port: ${port}`)
})