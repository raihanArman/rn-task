import { NoteMapper } from "@/mappers/note_mapper";
import { addAllNotes, addNote, clearNotes, deleteNote, getLocalNotes, toggleFavorite, updateNote } from "@/services/notes_local_services";
import { addFavoriteNotes, addNotes, deleteFavoriteNotes, deleteNotes, getFavoriteNotes, getNotes, updateNotes } from "@/services/notes_remote_services";
import { NoteContextProps, NoteProps, SortByOption } from "@/utils/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export const NoteContext = createContext<NoteContextProps>({
    notes: [],
    note: null,
    notesSearch: [],
    favoriteNotes: [],
    getNotes: async () => { },
    getNotesSearch: async () => { },
    addNote: async () => false,
    updateNote: async () => false,
    deleteNote: async () => false,
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
        const allNotes = await getLocalNotes();

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
        try {
            const localNotes = await getLocalNotes()
            setNotes(localNotes)

            const remoteResponse = await getNotes()
            const favoriteNotes = await getFavoriteNotes()
            if (remoteResponse.data.length > 0) {
                let result;
                if (favoriteNotes) {
                    result = NoteMapper.toPropsListWithFavorites(remoteResponse.data, favoriteNotes)
                } else {
                    result = NoteMapper.toPropsList(remoteResponse.data)
                }
                await clearNotes()
                await addAllNotes(result)
                setNotes(result)
            }
        } catch (error) {
            console.error("Failed to fetch remote notes:", error)
        }
    }

    const [note, setNote] = useState<NoteProps | null>(null)

    const handleAddNote = async (note: NoteProps) => {
        try {
            const result = await addNotes(note.title, note.content, note.priority);
            if (result) {
                loadNotes()
                return true
            } else {
                Alert.alert("Error", "Failed to add note")
                return false
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Failed to add note : " + error)
            return false
        }
    };

    const handleUpdateNote = async (note: NoteProps) => {
        try {
            const result = await updateNotes(note.id, note.title, note.content, note.priority);
            if (result) {
                loadNotes()
                return true
            } else {
                Alert.alert("Error", "Failed to update note")
                return false
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Failed to update note : " + error)
            return false
        }
    };

    const handleDeleteNote = async (id: number) => {
        try {
            const result = await deleteNotes(id);
            if (result) {
                loadNotes()
                return true
            } else {
                Alert.alert("Error", "Failed to delete note")
                return false
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Failed to delete note : " + error)
            return false
        }
    };

    const handleSetNote = (note: NoteProps | null) => {
        setNote(note)
    };

    const handleSetNotesSearch = (notes: NoteProps[]) => {
        setNotesSearch(notes)
    };

    const handleDefaultNote = async () => {
        const allNotes = await getLocalNotes();
        setNotesSearch(allNotes);
        setSearchQuery('');
        setSortBy('newest');
    }

    const handleToggleFavorite = async (id: number, isFavorite: boolean) => {
        try {
            if (isFavorite) {
                await deleteFavoriteNotes(id);
            } else {
                await addFavoriteNotes(id);
            }

            const updatedNotes = await updateNoteList(id, !isFavorite)
            if (updatedNotes) {
                const favoriteNotes = updatedNotes.filter((note: NoteProps) => note.isFavorite);
                setFavoriteNotes(favoriteNotes);
            }
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Failed to add favorite note : " + error)
        }
    }

    const updateNoteList = async (id: number, currentIsFavorite: boolean) => {
        try {
            const result = notes;
            const updatedNotes = result.map((note: NoteProps) => {
                if (note.id === id) {
                    return {
                        ...note,
                        isFavorite: currentIsFavorite,
                    };
                }
                return note;
            });

            setNotes(updatedNotes);
            return updatedNotes;
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Failed to update note : " + error)
        }
    };


    const handleGetFavoriteNotes = async () => {
        const allNotes = notes;
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