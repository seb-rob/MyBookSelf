const { uploadBook, getBooksList, updateBook, deleteBook } = require("../controllers/user")

const router = require("express").Router()

router.post("/upload-book", uploadBook)
router.post("/get-books", getBooksList)
router.put("/update-book/:book_id", updateBook)
router.put("/delete/:book_id", deleteBook)


module.exports = router