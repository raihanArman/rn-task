import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import Header from '@/components/molecules/Header'
import { useNavigation } from 'expo-router'
import { RootNavigationProp } from '@/utils/types'
import Typo from '@/components/molecules/Typo'
import { useNote } from '@/contexts/noteContext'
import { useAuth } from '@/contexts/authContext'
import { useFeed } from '@/contexts/feedContext'
import Avatar from '@/components/molecules/Avatar'

const UserProfileScreen = () => {
    const rootNavigation = useNavigation<RootNavigationProp>();
    const { getNotesCount, getFavoriteNotesCount } = useNote()
    const { getLikedFeedsCount } = useFeed()
    const { user } = useAuth()

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Header title="Profile" onBack={() => rootNavigation.goBack()} />
            </View>

            {/* Profile info */}
            <View style={styles.content}>
                <Avatar uri={user?.profilePicture || ""} size={100} style={{ marginBottom: 20 }} />
                <Typo size={30} fontWeight="600" style={{ color: colors.text }}>
                    {user?.name}
                </Typo>

                <Typo size={16} color={colors.neutral500} style={{ marginTop: 4 }}>
                    {user?.email}
                </Typo>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Typo size={16} fontWeight="600">{getNotesCount()}</Typo>
                        <Typo size={14} color={colors.neutral500}>Notes</Typo>
                    </View>
                    <View style={styles.statBox}>
                        <Typo size={16} fontWeight="600">{getLikedFeedsCount()}</Typo>
                        <Typo size={14} color={colors.neutral500}>Liked</Typo>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default UserProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        marginTop: 50,
        marginHorizontal: 20,
    },
    content: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    statsContainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
        width: "60%",
    },
    statBox: {
        alignItems: "center",
    },
    button: {
        marginTop: 20,
        backgroundColor: colors.primary,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
});
