import { FavoriteResponse, Note } from "@/utils/note_types"
import { NoteProps, PriorityLevel } from "@/utils/types"

export class NoteMapper {
    static toProps(note: Note): NoteProps {
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            updatedAt: note.updatedAt,
            isFavorite: note.isFavorite,
            priority: NoteMapper.mapPriority(note.category),
        }
    }

    static toPropsList(notes: Note[]): NoteProps[] {
        return notes.map(NoteMapper.toProps)
    }

    static toPropsListWithFavorites(notes: Note[], favorites: FavoriteResponse[]): NoteProps[] {
        const favoriteIds = new Set(favorites.map(fav => fav.id))
        return notes.map(note => ({
            ...note,
            isFavorite: favoriteIds.has(note.id),
            priority: NoteMapper.mapPriority(note.category),
        }))
    }

    private static mapPriority(category: string): PriorityLevel {
        const lower = category.toLowerCase()
        if (lower === "high" || lower === "medium" || lower === "low") {
            return lower as PriorityLevel
        }
        // fallback kalau API kirim "General" atau nilai lain
        return "low"
    }
}
