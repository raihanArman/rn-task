import { addNote, deleteNote, getNotes, updateNote } from "@/services/notes_services";
import { NoteContextProps, NoteProps, SortByOption } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const NoteContext = createContext<NoteContextProps>({
    notes: [],
    note: null,
    getNotes: async () => { },
    addNote: async () => { },
    updateNote: async () => { },
    deleteNote: async () => { },
    setNote: async () => { },
    searchQuery: '',
    setSearchQuery: () => { },
    sortBy: 'newest',
    setSortBy: () => { },
})

export const NoteProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<NoteProps[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortBy, setSortBy] = useState<SortByOption>('newest');

    const priorityMap: Record<string, number> = { high: 3, medium: 2, low: 1 };


    useEffect(() => {
        loadNotes()
    }, [searchQuery, sortBy])

    const loadNotes = async () => {
        const allNotes = await getNotes();

        // filter
        const filtered = allNotes.filter((note: NoteProps) =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // sort
        const sorted = [...filtered].sort((a: NoteProps, b: NoteProps) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                case 'oldest':
                    return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
                case 'priorityHighLow':
                    return (priorityMap[b.priority] ?? 0) - (priorityMap[a.priority] ?? 0);
                case 'priorityLowHigh':
                    return (priorityMap[a.priority] ?? 0) - (priorityMap[b.priority] ?? 0);
                default:
                    return 0;
            }
        });

        setNotes(sorted);
    };

    const [note, setNote] = useState<NoteProps | null>(null)

    const handleAddNote = async (note: NoteProps) => {
        await addNote(note);
        loadNotes()
    };

    const handleUpdateNote = async (note: NoteProps) => {
        await updateNote(note.id, note);
        loadNotes()
    };

    const handleDeleteNote = async (id: number) => {
        await deleteNote(id);
        loadNotes()
    };

    const handleSetNote = (note: NoteProps | null) => {
        setNote(note)
    };



    return (
        <NoteContext.Provider value={{
            notes,
            note,
            getNotes: loadNotes,
            addNote: handleAddNote,
            updateNote: handleUpdateNote,
            deleteNote: handleDeleteNote,
            setNote: handleSetNote,
            searchQuery,
            setSearchQuery: (q) => {
                setSearchQuery(q);
            },
            sortBy,
            setSortBy: (s) => {
                setSortBy(s);
            },
        }}>
            {children}
        </NoteContext.Provider>
    )
}

export const useNote = () => useContext(NoteContext)