import { validationResult } from "express-validator"
import Note from "../models/Note.js"

export const createNote = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const note = await Note.create({
        user: req.user.id,
        title: req.body.title,
        content: req.body.content
    })

    res.status(201).json(note)
}

export const getNotes = async (req, res) => {
    const { search = "", sort = "latest" } = req.query
    
    const query = {
        user: req.user.id
    }

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { content: { $regex: search, $options: "i" } }
        ]
    }

    const sortOption = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 }

    const notes = await Note.find(query).sort(sortOption).populate("user", "name email")

    res.json(notes)
}

export const updateNote = async (req, res) => {
    let note = await Note.findById(req.params.id)
    if (!note) return res.status(404).json({ message: "Note not found" })

    if (note.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" })
    }

    note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(note)
}

export const deleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (!note) return res.status(404).json({ message: "Note not found" })

    if (note.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" })
    }

    await note.deleteOne()
    res.json({ message: "Note deleted" })
}
