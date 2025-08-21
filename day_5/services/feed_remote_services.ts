import { FavoriteResponse, NoteListResponse } from "@/utils/note_types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "./axios_instance";
import { USER_KEY } from "@/constants";
import { FeedLikeListResponse, FeedListResponse } from "@/utils/feed_types";

export const getFeedNotes = async (limit: number, offset: number): Promise<FeedListResponse> => {
    try {
        const response = await axiosInstance.get("/api/social/feed", {
            params: {
                limit,
                offset
            }
        })
        return response.data;
    } catch (error: any) {

        console.log("got error: ", error)
        const msg = error?.response?.data?.error || "Get Feed Notes Failed"

        throw new Error(msg)
    }
}

export const likeFeed = async (feedId: number): Promise<boolean> => {
    try {
        await axiosInstance.post(`/api/social/notes/${feedId}/like`)
        return true;
    } catch (error: any) {

        console.log("got error: ", error)
        const msg = error?.response?.data?.error || "Like Feed Note Failed"

        throw new Error(msg)
    }
}


export const getFeedLikes = async (feedId: number): Promise<FeedLikeListResponse> => {
    try {
        const response = await axiosInstance.get(`/api/social/notes/${feedId}/likes`)
        return response.data;
    } catch (error: any) {

        console.log("got error: ", error)
        const msg = error?.response?.data?.error || "Get Feed Likes Failed"

        throw new Error(msg)
    }
}