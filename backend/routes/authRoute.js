import express from "express"
import { loginValidator, registerValidator } from "../validators/authValidator.js"
import { getUserInfo, login, register, updateProfile } from "../controllers/auth.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/register", registerValidator, register)
router.post("/login", loginValidator, login)
router.get("/info", authMiddleware, getUserInfo)
router.put("/profile", authMiddleware, updateProfile)

export default router
