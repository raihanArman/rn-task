import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const pickImageFromGallery = async (
    setImage: (uri: string) => void
) => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
};

export const takePhotoWithCamera = async (
    setImage: (uri: string) => void
) => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
        Alert.alert("Permission required", "Camera access is needed to take photos.");
        return;
    }

    const result = await ImagePicker.launchCameraAsync({
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
};

export const onPickImage = (setImage: (uri: string) => void) => {
    Alert.alert(
        "Choose Option",
        "Select an image source",
        [
            {
                text: "Camera", onPress: () => takePhotoWithCamera((uri) => {
                    console.log(`Result Camera -> ${uri}`)
                    setImage(uri)
                })
            },
            {
                text: "Gallery", onPress: () => pickImageFromGallery((uri) => {
                    console.log(`Result Gallery -> ${uri}`)
                    setImage(uri)
                })
            },
            { text: "Cancel", style: "cancel" },
        ],
        { cancelable: true }
    );
};
