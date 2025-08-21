export const getAvatarPath = (file: any) => {
    if (file && typeof file == "string") {
        console.log("file: ", file)
        return { uri: file } // <- harus object
    }

    if (file && typeof file == "object") {
        return { uri: file.uri } // pastikan format sama
    }

    return require('@/assets/images/defaultGroupAvatar.png')
}