import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as Icons from 'phosphor-react-native'
import { colors } from '@/constants/theme'
import Typo from './Typo'

const LikeCount = ({ isLiked, count, size, onLike, onShowLikes }: { isLiked: boolean, count: number, size?: number, onLike?: () => void, onShowLikes?: () => void }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onLike}>
                <Icons.ThumbsUpIcon color={isLiked ? colors.red : colors.neutral500} size={size ? size : 20} weight={isLiked ? 'fill' : 'regular'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShowLikes} style={styles.count}>
                <Typo size={12} fontWeight={'400'} color={colors.neutral500}>{count}</Typo>
            </TouchableOpacity>
        </View>
    )
}

export default LikeCount

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    count: {
        width: 100,
    }
})