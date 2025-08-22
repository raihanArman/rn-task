import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { FeedProps } from '@/utils/types'
import { colors } from '@/constants/theme'
import Avatar from './Avatar'
import Typo from './Typo'
import { format } from 'date-fns/format'
import LikeCount from './LikeCount'
import { useWindowDimensions } from 'react-native';
import { decode } from 'html-entities';
import HtmlText from './HtmlText'


const FeedCard = ({ feed, onLike, onShowLikes }: { feed: FeedProps, onLike: (feedId: number) => void, onShowLikes: (feedId: number) => void }) => {
    const { width } = useWindowDimensions();
    return (
        <View style={styles.container}>
            <View style={styles.author}>
                <Avatar uri={feed.author.profilePicture} size={24} />
                <Typo style={{ flex: 1 }} size={12} fontWeight={'600'}>{feed.author.name}</Typo>
            </View>
            {feed.imageUrls.length > 0 && <Image source={{ uri: feed.imageUrls[0] }} style={styles.image} />}
            <Typo size={12} fontWeight={'400'} color={colors.black} style={{ marginTop: 8 }} >{feed.title}</Typo>

            <HtmlText html={feed.content} baseStyle={{ fontSize: 12, marginTop: 4 }} />

            <Typo size={10} fontWeight={'400'} color={colors.neutral500} style={{ marginTop: 8, marginBottom: 8 }} >{format(new Date(feed.updatedAt), 'E dd MMM yyyy, HH:mm')}</Typo>

            <LikeCount isLiked={feed.isLikedByCurrentUser} count={feed.likesCount} onLike={() => onLike(feed.id)} onShowLikes={() => onShowLikes(feed.id)} />
        </View>
    )
}

export default FeedCard

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: colors.white,
        borderBottomColor: colors.neutral300,
        borderBottomWidth: 1,
    },
    author: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    image: {
        width: '100%',
        height: 200,
    }
})