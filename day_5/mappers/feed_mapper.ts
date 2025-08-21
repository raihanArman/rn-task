import { FeedProps } from "@/utils/types"
import { Note } from "@/utils/feed_types"

export class FeedMapper {
    static toProps(note: Note): FeedProps {
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            updatedAt: note.updatedAt,
            isFavorite: note.isFavorite,
            category: note.category,
            isPublic: note.isPublic,
            imageUrls: note.imageUrls,
            createdAt: note.createdAt,
            userId: note.userId,
            author: note.author,
            likesCount: note.likesCount,
            isLikedByCurrentUser: note.isLikedByCurrentUser,
        }
    }

    static toPropsList(notes: Note[]): FeedProps[] {
        return notes.map(FeedMapper.toProps)
    }

}
