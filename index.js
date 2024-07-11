const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DB Connected")).catch((err) => console.log(err));

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));

const port = 3000;

app.listen(process.env.PORT || port, () => console.log(`App is running on port ${process.env.PORT}`) )