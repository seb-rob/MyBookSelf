const mongoose = require("mongoose")
const url = process.env.MONGO_URI

const config = () => {
    mongoose.connect(url)
        .then(() => {
            console.log("database connection successful")
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = config