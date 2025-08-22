import { BASE_URL } from "@/constants"

export const getAvatarPath = (file: any) => {
    if (file && typeof file == "string") {
        return `${BASE_URL}${file}`
    }

    if (file && typeof file == "object") {
        return file.uri
    }

    return require('@/assets/images/defaultGroupAvatar.png')
}