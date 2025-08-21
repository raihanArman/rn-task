import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { AvatarProps } from '@/utils/types'
import { colors } from '@/constants/theme'
import { getAvatarPath } from '@/utils/image_utils'
import { Image } from 'expo-image'

const Avatar = ({
    uri,
    size = 40,
    style,
}: AvatarProps) => {
    console.log(`Result -> ${uri}`)
    return (
        <View
            style={[styles.avatar, style, { height: size, width: size }]}>
            <Image
                key={uri}
                style={{ width: '100%', height: '100%', borderRadius: size / 2 }}
                source={uri ? { uri } : require('@/assets/images/defaultGroupAvatar.png')}
                contentFit="cover"
                transition={100}
            />

        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    avatar: {
        alignSelf: "center",
        backgroundColor: "#fff",
        width: 100,
        height: 100,
        borderRadius: 200,
        justifyContent: "center",
        alignItems: "center",
        borderColor: colors.primary,
        borderWidth: 1,
    }
})