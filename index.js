const express = require("express");
require("./utils/dotenv");
require("./database/dbConnect")

const authRouter = require("./routes/auth")

const app = express();
const port = 3000;

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));


app.use('/api/', authRouter)


app.listen(process.env.PORT || port, () => console.log(`App is running on port ${process.env.PORT}`) )