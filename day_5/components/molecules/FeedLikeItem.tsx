import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Avatar from './Avatar'
import Typo from './Typo'

const FeedLikeItem = ({ avatar, name }: { avatar: string, name: string }) => {
    return (
        <View style={styles.item}>
            <Avatar uri={avatar} size={24} />
            <View style={{ marginLeft: 12 }}>
                <Typo size={12} fontWeight={'600'}>{name}</Typo>
            </View>
        </View>
    )
}

export default FeedLikeItem

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
})