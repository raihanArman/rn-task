import { FeedLikeMapper } from "@/mappers/feed_like_mapper"
import { FeedMapper } from "@/mappers/feed_mapper"
import { getFeedLikes, getFeedNotes, likeFeed } from "@/services/feed_remote_services"
import { FeedContextProps, FeedLikeProps, FeedProps } from "@/utils/types"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

export const FeedContext = createContext<FeedContextProps>({
    feeds: [],
    feed: null,
    loadFeeds: async () => { },
    likeFeedNote: async () => { },
    getLikedFeedsCount: async () => 0,
    loadFeedLikes: async () => { },
    feedLikes: [],
})

export const FeedProvider = ({ children }: { children: ReactNode }) => {
    const [feeds, setFeeds] = useState<FeedProps[]>([])
    const [feed, setFeed] = useState<FeedProps | null>(null)
    const [feedLikes, setFeedLikes] = useState<FeedLikeProps[]>([])


    const loadFeeds = async () => {

        console.log("loadFeeds Fetching remote feeds...")
        try {
            console.log("Fetching remote feeds...")
            const remoteResponse = await getFeedNotes(20, 0)
            console.log("Remote response:", remoteResponse)
            // const favoriteNotes = await getFavoriteNotes()
            if (remoteResponse.data.length > 0) {
                const result = FeedMapper.toPropsList(remoteResponse.data)
                setFeeds(result)
            }
        } catch (error) {
            console.error("Failed to fetch remote feeds:", error)
        }
    }

    const likeFeedNote = async (feedId: number) => {
        try {
            await likeFeed(feedId)
            loadFeeds()
        } catch (error) {
            console.error("Failed to like feed note:", error)
        }
    }

    const getLikedFeedsCount = async () => {
        const likedFeeds = feeds.filter((feed: FeedProps) => feed.isLikedByCurrentUser);
        return likedFeeds.length;
    }

    const loadFeedLikes = async (feedId: number) => {
        try {
            const remoteResponse = await getFeedLikes(feedId)
            console.log("Remote response:", remoteResponse)

            const result = FeedLikeMapper.toPropsList(remoteResponse.data)
            setFeedLikes(result)
        } catch (error) {
            console.error("Failed to fetch remote feed likes:", error)
            setFeedLikes([])
        }
    }

    return (
        <FeedContext.Provider value={{
            feeds,
            feed,
            loadFeeds,
            likeFeedNote,
            getLikedFeedsCount: getLikedFeedsCount,
            loadFeedLikes,
            feedLikes,
        }}>
            {children}
        </FeedContext.Provider>
    )
}

export const useFeed = () => useContext(FeedContext)