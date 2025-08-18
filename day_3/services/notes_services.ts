import { NoteProps } from '@/utils/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = 'NOTES_DATA';

export const getNotes = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error reading notes', e);
        return [];
    }
};

export const addNote = async (note: NoteProps) => {
    try {
        const existingNotes = await getNotes();
        const newNote = {
            ...note,
            id: Math.random() * 1000,
            updatedAt: new Date().toISOString(),
            priority: note.priority ?? 'medium',
            isFavorite: false,
        };
        const updatedNotes = [...existingNotes, newNote];
        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
        return newNote;
    } catch (e) {
        console.error('Error saving note', e);
    }
};

export const updateNote = async (id: number, updatedFields: NoteProps) => {
    try {
        const notes = await getNotes();
        const updatedNotes = notes.map((note: NoteProps) =>
            note.id === id
                ? { ...note, ...updatedFields, updatedAt: new Date().toISOString() }
                : note
        );
        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
    } catch (e) {
        console.error('Error updating note', e);
    }
};

export const deleteNote = async (id: number) => {
    try {
        const notes = await getNotes();
        const filteredNotes = notes.filter((note: NoteProps) => note.id !== id);
        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filteredNotes));
    } catch (e) {
        console.error('Error deleting note', e);
    }
};


export const toggleFavorite = async (id: number) => {
    try {
        const notes: NoteProps[] = await getNotes();
        const updateNotes = notes.map(note =>
            note.id === id ? { ...note, isFavorite: !note.isFavorite, updatedAt: new Date().toISOString() } : note
        );
        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updateNotes));
        return updateNotes.find(note => note.id === id);
    } catch (e) {
        console.error('Error updating favorite note', e);
    }
} 