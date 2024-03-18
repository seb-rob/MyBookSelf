const mongoose = require("mongoose")
// const booksModel = require("./book")

const userModel = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "What is your mail id?"]
    },
    fname: {
        type: String,
        required: [true, "What is your first name?"]
    },
    password: {
        type: String,
        required: [true, "Enter secure password."],
    },
    lname: {
        type: String,
        required: [true, "What is your last name?"]
    },
    books: [
        {
            title: {
                type: String,
                required: [true, "Mention book title."]
            },
            book_length: {
                type: Number,
                required: [true, "Mention books length."]
            },
            writer: {
                type: String,
                required: [true, "Who is author?"]
            },
            deleted: {
                type: Boolean,
                default: false,
            },
            link: {
                type: String,
                default: ""
            },
            image: {
                type: String,
                default: "https://res.cloudinary.com/du5fgvlvs/image/upload/v1710731160/defaults/jyl6iv2wgqcx3wlrbk84.png"
            },
            time: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});


const User = mongoose.model("User", userModel);
module.exports = User;