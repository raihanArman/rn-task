import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { useFeed } from '@/contexts/feedContext'
import { LikesBottomSheetRef, RootNavigationProp } from '@/utils/types'
import { useNavigation } from 'expo-router'
import { useEffect } from 'react'
import HeaderDrawer from '@/components/molecules/HeaderDrawer'
import { SearchBar } from 'react-native-screens'
import FeedCard from '@/components/molecules/FeedCard'
import { FlatList } from 'react-native'
import Typo from '@/components/molecules/Typo'
import { colors } from '@/constants/theme'
import LikesBottomSheet from './sheet/LikedBottomSheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const FeedsScreen = () => {
    const { feeds, loadFeeds, likeFeedNote } = useFeed()
    const rootNavigation = useNavigation<RootNavigationProp>();
    const [isLoading, setIsLoading] = useState(false)
    const bottomSheetRef = useRef<LikesBottomSheetRef>(null);

    const [feedId, setFeedId] = useState(0)

    useEffect(() => {
        handleLoadFeeds()
    }, [])


    const openBottomSheet = () => {
        console.log("Open dong")
        bottomSheetRef.current?.expand(); // membuka ke snap point default
    };

    const closeBottomSheet = () => {
        console.log("Close dong")
        bottomSheetRef.current?.close();
    };

    const handleLoadFeeds = async () => {
        setIsLoading(true)
        await loadFeeds()
        setIsLoading(false)
    }

    const handleLike = async (feedId: number) => {
        await likeFeedNote(feedId)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderDrawer title="Feeds" />
            </View>
            <SearchBar />
            {isLoading ? (
                <View style={styles.loading}>
                    <Typo size={20} fontWeight={'600'}>Loading...</Typo>
                </View>
            ) : feeds.length > 0 ? (
                <FlatList
                    data={feeds}
                    renderItem={({ item }) => (
                        <FeedCard
                            feed={item}
                            onLike={handleLike}
                            onShowLikes={(feedId: number) => {
                                if (item.likesCount > 0) {
                                    setFeedId(feedId)
                                    openBottomSheet()
                                }
                            }}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : <View style={styles.emptyContainer}>
                <Typo size={20} fontWeight={'600'}>No feeds found</Typo>
            </View>}

            <LikesBottomSheet
                ref={bottomSheetRef}
                feedId={feedId}
                onClose={closeBottomSheet}
            />
        </View>
    )
}

export default FeedsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    searchSortContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100
    },
    searchBar: {
        flexDirection: 'row',
        gap: 16,
        padding: 16,
        backgroundColor: colors.neutral100,
        borderRadius: 12,
        borderColor: colors.neutral500,
        borderWidth: 1,
        marginHorizontal: 16,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})