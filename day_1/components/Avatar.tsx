import { AvatarProps } from '@/types'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Avatar = ({
    url,
    size = 40
}: AvatarProps) => {
    return (
        <View style={[styles.avatar, { height: size, width: size }]}>
            <Image
                style={{ flex: 1 }}
                source={url}
                contentFit="contain"
                transition={100}
            />

        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 100,
        borderColor: '#000',
        borderWidth: 2,
        overflow: "hidden",
    }
})