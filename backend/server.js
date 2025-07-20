const dotenv = require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");
const authRoute = require("./routes/authRoute")
const genAiRoute = require("./routes/genAiRoute")
// Static to get all locally such as the image
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
// app.use("/genImage", express.static(path.join(__dirname, "genImage")));
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(express.json());
app.use("/auth", authRoute)
app.use("/crud-genAi", genAiRoute)
console.log("STATIC UPLOADS:", path.join(__dirname, 'uploads'));


app.listen((port), () => {
    console.log(`Listening to port: ${port}`)
})