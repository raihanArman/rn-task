import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNote } from '@/contexts/noteContext';
import { RootNavigationProp, SortByOption } from '@/utils/types';
import Header from '@/components/molecules/Header';
import { FlatList, TouchableOpacity } from 'react-native';
import NoteCard from '@/components/molecules/NoteCard';
import Typo from '@/components/molecules/Typo';
import { colors } from '@/constants/theme';
import * as Icons from 'phosphor-react-native'
import { useNavigation } from 'expo-router'
import { SearchBar } from 'react-native-screens';
import HeaderDrawer from '@/components/molecules/HeaderDrawer';

const FavoritesScreen = () => {
    const { favoriteNotes, getFavoriteNotes, setNote, searchQuery, setSearchQuery, sortBy, setSortBy, toggleFavorite } = useNote()
    const rootNavigation = useNavigation<RootNavigationProp>();


    useEffect(() => {
        getFavoriteNotes()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderDrawer title="Favorites" />
            </View>
            <SearchBar />
            {favoriteNotes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Typo size={20} fontWeight={'600'}>No favorites found</Typo>
                </View>
            ) : (
                <FlatList
                    data={favoriteNotes}
                    renderItem={({ item }) => (
                        <NoteCard
                            note={item}
                            onPress={() => {
                                setNote(item)
                                rootNavigation.navigate("FormModal")
                            }}
                            toggleFavorite={() => toggleFavorite(item.id)}
                        />
                    )}
                    style={styles.flat}
                />
            )}
        </View>
    )
}

export default FavoritesScreen

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
    flat: {
        paddingHorizontal: 16,
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
    }
})