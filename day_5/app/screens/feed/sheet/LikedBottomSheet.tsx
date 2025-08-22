import Avatar from "@/components/molecules/Avatar";
import Typo from "@/components/molecules/Typo";
import { colors } from "@/constants/theme";
import { useFeed } from "@/contexts/feedContext";
import { LikesBottomSheetProps, LikesBottomSheetRef } from "@/utils/types";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Image, SafeAreaView, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { forwardRef, useImperativeHandle } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import FeedLikeItem from "@/components/molecules/FeedLikeItem";


const LikesBottomSheet = forwardRef<LikesBottomSheetRef, LikesBottomSheetProps>(
    ({ feedId, onClose }, ref) => {
        const { feedLikes, loadFeedLikes } = useFeed();
        const bottomSheetRef = useRef<BottomSheetModal>(null);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            handleLoadFeedLikes();
        }, [feedId]);

        const handleLoadFeedLikes = async () => {
            console.log("Feed ID: ", feedId)
            setIsLoading(true)
            await loadFeedLikes(feedId)
            setIsLoading(false)
        }

        useImperativeHandle(ref, () => ({
            expand: () => bottomSheetRef.current?.expand(),
            close: () => bottomSheetRef.current?.close(),
        }));

        return (
            <BottomSheet
                index={-1}
                ref={bottomSheetRef}
                snapPoints={['25%', '50%', '75%']}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                        pressBehavior="close"
                    />
                )}
            >
                <BottomSheetScrollView>
                    <View style={styles.container}>
                        {isLoading ? (
                            <View style={styles.loading}>
                                <Typo size={20} fontWeight={'600'} style={{ color: colors.text }}>Loading...</Typo>
                            </View>
                        ) : feedLikes.length > 0 ? (
                            feedLikes.map((item) => (
                                <FeedLikeItem
                                    key={item.userName}
                                    avatar={item.profilePicture}
                                    name={item.userName}
                                />
                            ))
                        ) : <View style={styles.emptyContainer}>
                            <Typo size={20} fontWeight={'600'}>No feeds found</Typo>
                        </View>}
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
        );
    }
);


export default LikesBottomSheet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
    },
    close: {
        color: colors.primary,
        fontWeight: '600',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.neutral200,
    },
    name: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.black,
    },
    date: {
        fontSize: 12,
        color: colors.neutral500,
    },
    separator: {
        height: 1,
        backgroundColor: colors.neutral200,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100
    },
});