export interface Author {
    id: number
    email: string
    name: string
    profilePicture: string
}

export interface Note {
    id: number
    title: string
    content: string
    category: string
    isFavorite: boolean
    isPublic: boolean
    imageUrls: string[]
    createdAt: string  // ISO date string
    updatedAt: string
    userId: number
    author: Author
    likesCount: number
    isLikedByCurrentUser: boolean
}

export interface FeedListResponse {
    data: Note[]
    limit: number
    offset: number
    total: number
}


export interface FeedLike {
    likedAt: string
    profilePicture: string
    userId: number
    userName: string
}



export interface FeedLikeListResponse {
    data: FeedLike[]
    likesCount: number
}