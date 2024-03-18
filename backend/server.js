const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const port = process.env.PORT
const app = express()
const config = require("./config/config")
config();
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")

app.use(cors())
app.use(express.json())
app.use("/api", authRouter)
app.use("/api", userRouter)


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})