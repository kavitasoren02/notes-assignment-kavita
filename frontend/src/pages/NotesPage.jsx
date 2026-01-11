import { useEffect, useState } from "react"
import api from "../api/axios"
import NotesTable from "../components/NotesTable"
import NoteModal from "../components/modals/NoteModal"
import Button from "../components/ui/Button"

const NotesPage = () => {
    const [notes, setNotes] = useState([])
    const [modal, setModal] = useState({ open: false, mode: "add", note: null })

    const fetchNotes = async () => {
        const res = await api.get("/notes")
        setNotes(res.data)
    }

    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Notes</h1>
                <Button onClick={() => setModal({ open: true, mode: "add", note: null })}>
                    + Add Note
                </Button>
            </div>
            <NotesTable
                notes={notes}
                onView={(note) => setModal({ open: true, mode: "view", note })}
                onEdit={(note) => setModal({ open: true, mode: "edit", note })}
                onRefresh={fetchNotes}
            />
            <NoteModal
                open={modal.open}
                mode={modal.mode}
                note={modal.note}
                onClose={() => setModal({ open: false })}
                onSuccess={fetchNotes}
            />
        </div>
    )
}

export default NotesPage
