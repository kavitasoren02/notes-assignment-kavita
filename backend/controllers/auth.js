import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import User from "../models/User.js"

export const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const payload = { user: { id: user.id } }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        res.status(201).json({ token })
    } catch {
        res.status(500).json({ message: "Server error" })
    }
}

export const login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const payload = { user: { id: user.id } }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        res.json({ token })
    } catch {
        res.status(500).json({ message: "Server error" })
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    }
    catch {
        res.status(500).json({ message: "Server error" })
    }
}

export const updateProfile = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email } = req.body

    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const updatedUser = await User.findByIdAndUpdate(user._id, {name, email}, {new: true, runValidators: true }).select("-password")

        return res.status(200).json(updatedUser)
    } catch {
        res.status(500).json({ message: "Server error" })
    }
}