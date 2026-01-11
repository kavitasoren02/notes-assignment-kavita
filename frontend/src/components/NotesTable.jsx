import api from "../api/axios"
import Button from "./ui/Button"
import { Delete, Edit, Eye, Trash, Trash2 } from 'lucide-react'


const NotesTable = ({ notes, onView, onEdit, onRefresh }) => {
    const deleteNote = async (id) => {
        await api.delete(`/notes/${id}`)
        onRefresh()
    }

    return (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-300">
                    <tr>
                        <th className="text-left p-3">Title</th>
                        <th className="text-left p-3">Content</th>
                        <th className="text-right p-3">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {notes.map((note) => (
                        <tr key={note._id} className="hover:bg-gray-50 not-last:border-b border-gray-200">
                            <td
                                className="p-3 font-medium text-blue-600 cursor-pointer"
                                onClick={() => onView(note)}
                            >
                                {note.title}
                            </td>

                            <td className="p-3 text-gray-600 truncate max-w-xs">
                                {note.content}
                            </td>

                            <td className="p-3 flex justify-end items-center gap-2">
                                <Eye 
                                    className="w-8 h-8 text-gray-600 cursor-pointe p-2 rounded-full hover:bg-gray-300 cursor-pointer"
                                    onClick={() => onView(note)}
                                    title="View Note"
                                />
                                <Edit 
                                    className="w-8 h-8 text-gray-600 cursor-pointe p-2 rounded-full hover:bg-gray-300 cursor-pointer"
                                    onClick={() => onEdit(note)}
                                    title="Edit Note"
                                />
                                <Trash2
                                    className="w-8 h-8 text-red-600 cursor-pointe p-2 rounded-full hover:bg-gray-300 cursor-pointer"
                                    onClick={() => deleteNote(note._id)}
                                    title="Delete Note"
                                />
                            </td>
                        </tr>
                    ))}

                    {notes.length === 0 && (
                        <tr>
                            <td colSpan="3" className="p-6 text-center text-gray-500">
                                No notes found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default NotesTable
