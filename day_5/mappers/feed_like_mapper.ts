import { FeedLikeProps } from "@/utils/types"
import { FeedLike, Note } from "@/utils/feed_types"

export class FeedLikeMapper {
    static toProps(note: FeedLike): FeedLikeProps {
        return {
            likedAt: note.likedAt,
            profilePicture: note.profilePicture,
            userId: note.userId,
            userName: note.userName,
        }
    }

    static toPropsList(notes: FeedLike[]): FeedLikeProps[] {
        return notes.map(FeedLikeMapper.toProps)
    }

}
