const { tokenGenerator } = require("../helpers/helpers");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
    try {
        const { email,
            password,
            fname,
            lname,
        } = req.body;
        if (!email || !password || !fname || !lname) {
            return res.status(400).json({message: "Enter required fields!"})
        }
        const email_already_exist = await User.findOne({ email })
        if (email_already_exist) {
            return res.status(400).json({message: "Email is already taken!!"})
        }
        if (password.length <= 5) {
            return res.status(400).json({ message: "create strong password of at least 6 chars" });
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        await User.create({
            email, password: hashedPassword, fname, lname
        })
        return res.status(200).json({ message: "Registration successful!" })
    } catch (error) {
        return res.status(500).json({message: "Something went wrong", err: error.message})
    }
}


exports.login = async (req, res) => {
    try {
        const {
            email, password
        } = req.body
        if (!email || !password) {
            return res.status(400).json({message: "Enter required fields!"})
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(403).json({ message: "Invalid email or password" })
        }
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.status(403).json({message: "Invalid email or password"})
        }
        const token = tokenGenerator({ id: user._id }, "20h")
        return res.status(200).json({
            message: "Login successful!",
            firstName: user.fname,
            email: user.email,
            token
        })
    } catch (error) {
        return res.status(500).json({ message: "something went wrong", err: error.message })
    }
}


exports.changePassword = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!password || !email) {
            return res.status(400).json({message: "Enter required fields!"})
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(403).json({message: "user not found"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        await User.findOneAndUpdate({ email }, { $set: {password: hashedPassword} })
        return res.status(200).json({message: "Password change successful!"})
    } catch (error) {
        return res.status(500).json({ message: "something went wrong", err: error.message })
    }
}