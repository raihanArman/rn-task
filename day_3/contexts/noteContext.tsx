import { addNote, deleteNote, getNotes, toggleFavorite, updateNote } from "@/services/notes_services";
import { NoteContextProps, NoteProps, SortByOption } from "@/utils/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const NoteContext = createContext<NoteContextProps>({
    notes: [],
    note: null,
    notesSearch: [],
    favoriteNotes: [],
    getNotes: async () => { },
    getNotesSearch: async () => { },
    addNote: async () => { },
    updateNote: async () => { },
    deleteNote: async () => { },
    setNote: async () => { },
    setNotesSearch: async () => { },
    searchQuery: '',
    setSearchQuery: () => { },
    sortBy: 'newest',
    setSortBy: () => { },
    setDefaultNotesSearch: () => { },
    toggleFavorite: async () => { },
    getFavoriteNotes: async () => { },
    getNotesCount: async () => 0,
    getFavoriteNotesCount: async () => 0,
})

export const NoteProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<NoteProps[]>([])
    const [notesSearch, setNotesSearch] = useState<NoteProps[]>([])
    const [favoriteNotes, setFavoriteNotes] = useState<NoteProps[]>([])
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortBy, setSortBy] = useState<SortByOption>('newest');
    const [notesCount, setNotesCount] = useState<number>(0);
    const [favoriteNotesCount, setFavoriteNotesCount] = useState<number>(0);

    const priorityMap: Record<string, number> = { high: 3, medium: 2, low: 1 };

    const loadNotesSearch = async () => {
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

        setNotesSearch(sorted);
    };

    const loadNotes = async () => {
        const allNotes = await getNotes();
        setNotes(allNotes);
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

    const handleSetNotesSearch = (notes: NoteProps[]) => {
        setNotesSearch(notes)
    };

    const handleDefaultNote = async () => {
        const allNotes = await getNotes();
        setNotesSearch(allNotes);
        setSearchQuery('');
        setSortBy('newest');
    }

    const handleToggleFavorite = async (id: number) => {
        await toggleFavorite(id);
        loadNotes()
    }

    const handleGetFavoriteNotes = async () => {
        const allNotes = await getNotes();
        const favoriteNotes = allNotes.filter((note: NoteProps) => note.isFavorite);
        setFavoriteNotes(favoriteNotes);
    }


    return (
        <NoteContext.Provider value={{
            notes,
            note,
            notesSearch,
            getNotes: loadNotes,
            getNotesSearch: loadNotesSearch,
            addNote: handleAddNote,
            updateNote: handleUpdateNote,
            deleteNote: handleDeleteNote,
            setNote: handleSetNote,
            setNotesSearch: handleSetNotesSearch,
            searchQuery,
            setSearchQuery: (q) => {
                setSearchQuery(q);
            },
            sortBy,
            setSortBy: (s) => {
                setSortBy(s);
            },
            setDefaultNotesSearch: handleDefaultNote,
            toggleFavorite: handleToggleFavorite,
            favoriteNotes,
            getFavoriteNotes: handleGetFavoriteNotes,
            getNotesCount: () => Promise.resolve(notes.length),
            getFavoriteNotesCount: () => Promise.resolve(favoriteNotes.length),
        }}>
            {children}
        </NoteContext.Provider>
    )
}

export const useNote = () => useContext(NoteContext)