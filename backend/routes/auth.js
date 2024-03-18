const { signUp, login, changePassword } = require("../auth/auth")

const router = require("express").Router()

router.post("/sign-up", signUp)
router.post("/login", login)
router.post("/change-password", changePassword)

module.exports = router