const User = require("../models/user");

exports.uploadBook = async (req, res) => {
    try {
        const {
            email,
            title,
            book_length,
            writer,
            link,
        } = req.body;
        if (!email || !title || !book_length || !writer || !link) {
            return res.status(400).json({message: "Enter required fields!"})
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const book = {
            title,
            book_length,
            writer,
            link
        }
        await user.books.push(book)
        user.save()
        return res.status(200).json({message: "Book uploaded successfully!"})
    } catch (error) {
        return res.status(500).json({ message: "something went wrong", err: error.message })
    }
}


exports.getBooksList = async (req, res) => {
    try {
        const {
            email
        } = req.body
        if (!email) {
            return res.status(400).json({ message: "User not found" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const books = user.books.filter(obj => !obj.deleted).map(obj => ({
            id: obj._id,
            writer: obj.writer,
            image: obj.image,
            link: obj.link,
            title: obj.title,
            pages: obj.book_length
        }));
        return res.status(200).json({books})
    } catch (error) {
        return res.status(500).json({ message: "something went wrong", err: error.message })
    }
}


exports.updateBook = async (req, res) => {
    try {
        const data = req.body;
        const email = req.query.email;
        const bookId = req.params.book_id;
        if (data.deleted || data.link || data._id) {
            return res.status(400).json({ message: "certain fields of the book cannot be modified!" })
        }
        if (!bookId) {
            return res.status(400).json({ message: "Book id is missing!" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        if (user.books.deleted) {
            return res.status(400).json({ message: "Book not found" })
        }
        let userObject = {}
        for (const key in data) {
            userObject[`books.$.${key}`] = data[key]
        }
        await User.findOneAndUpdate({ email: email, "books._id": bookId },
            {
                $set: userObject
            },
            {
                new: true
            }
        )
        return res.status(200).json({message: "Details updated!"})
    } catch (error) {
        return res.status(500).json({ message: "something went wrong", err: error.message })
    }
}


exports.deleteBook = async (req, res) => {
    try {
        const email = req.query.email;
        const bookId = req.params.book_id;
        if (!bookId) {
            return res.status(400).json({ message: "Book id is missing!" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        await User.findOneAndUpdate({ email: email, "books._id": bookId },
            {
                $set: {"books.$.deleted": true}
            },
            {
                new: true
            }
        )
        return res.status(200).json({message: "Book deleted!"})
    } catch (error) {
        return res.status(500).json({ message: "something went wrong", err: error.message })
    }
}