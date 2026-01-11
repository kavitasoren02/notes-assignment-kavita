import { useEffect, useState } from "react"
import api from "../api/axios"
import NotesTable from "../components/NotesTable"
import NoteModal from "../components/modals/NoteModal"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"

const NotesPage = () => {
    const [notes, setNotes] = useState([])
    const [modal, setModal] = useState({ open: false, mode: "add", note: null })
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("latest")

    const fetchNotes = async () => {
        const res = await api.get("/notes", {
            params: { search, sort }
        })
        setNotes(res.data)
    }

    useEffect(() => {
        fetchNotes()
    }, [search, sort])

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Notes</h1>
                <Button onClick={() => setModal({ open: true, mode: "add", note: null })}>
                    + Add Note
                </Button>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    placeholder="Search notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                </select>
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
