export interface Note {
    id: number
    title: string
    content: string
    category: string
    isFavorite: boolean
    createdAt: string   // ISO date string
    updatedAt: string
    userId: number
}

export interface NoteListResponse {
    data: Note[]
    total: number
}

export interface FavoriteResponse {
    id: number
    title: string
    content: string
    created_at: string
}


