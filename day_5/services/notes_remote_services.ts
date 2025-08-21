import { FavoriteResponse, NoteListResponse } from "@/utils/note_types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "./axios_instance";
import { USER_KEY } from "@/constants";

export const getNotes = async (): Promise<NoteListResponse> => {
    try {
        const response = await axiosInstance.get("/api/notes")
        return response.data;
    } catch (error: any) {

        console.log("got error: ", error)
        const msg = error?.response?.data?.error || "Login Failed"

        throw new Error(msg)
    }
}


export const addNotes = async (
    title: string,
    content: string,
    priority: string
): Promise<boolean> => {
    try {
        await axiosInstance.post(
            `/api/notes`,
            {
                title,
                content,
                category: priority
            },
        )

        return true
    } catch (error: any) {
        console.log("got error: ", error)
        const msg = error?.response?.data?.error || "Add Note Failed"
        throw new Error(msg)
    }
}

export const updateNotes = async (
    id: number,
    title: string,
    content: string,
    priority: string
): Promise<boolean> => {
    try {
        await axiosInstance.put(
            `/api/notes/${id}`,
            {
                title,
                content,
                category: priority
            },
        )

        return true
    } catch (error: any) {
        console.log("got error: ", error)
        const msg = error?.response?.data?.error || "Update Note Failed"
        throw new Error(msg)
    }
}

export const deleteNotes = async (
    id: number
): Promise<boolean> => {
    try {
        await axiosInstance.delete(
            `/api/notes/${id}`,
        )

        return true
    } catch (error: any) {
        console.log("got error: ", error)
        const msg = error?.response?.data?.error || "Delete Note Failed"
        throw new Error(msg)
    }
}


export const addFavoriteNotes = async (
    id: number
): Promise<boolean> => {
    const user = await AsyncStorage.getItem(USER_KEY)
    const userId = JSON.parse(user || "{}")?.id

    try {
        await axiosInstance.post(
            `/favorites`,
            {
                note_id: id,
                user_id: userId
            }
        )

        return true
    } catch (error: any) {
        console.log("got error: ", error)
        const msg = error?.response?.data?.error || "Add Favorite Note Failed"
        throw new Error(msg)
    }
}

export const getFavoriteNotes = async (): Promise<FavoriteResponse[] | null> => {
    const user = await AsyncStorage.getItem(USER_KEY)
    const userId = JSON.parse(user || "{}")?.id

    try {
        const response = await axiosInstance.get(
            `/favorites/${userId}`
        )

        return response.data;
    } catch (error: any) {
        console.log("got error: get favorites ", error)
        const msg = error?.response?.data?.error || "Get Favorite Notes Failed"
        throw new Error(msg)
    }
}


export const deleteFavoriteNotes = async (
    id: number
): Promise<boolean> => {
    const user = await AsyncStorage.getItem(USER_KEY)
    const userId = JSON.parse(user || "{}")?.id

    try {
        await axiosInstance.delete(
            `/favorites/${userId}/${id}`,
        )

        return true
    } catch (error: any) {
        console.log("got error: ", error)
        const msg = error?.response?.data?.error || "Delete Favorite Note Failed"
        throw new Error(msg)
    }
}