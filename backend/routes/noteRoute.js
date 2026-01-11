import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { noteValidator } from "../validators/noteValidator.js"
import { createNote, deleteNote, getNotes, updateNote } from "../controllers/note.js"

const router = express.Router()

router.use(authMiddleware)

router.post("/", noteValidator, createNote)
router.get("/", getNotes)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router
