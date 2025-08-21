import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNote } from '@/contexts/noteContext';
import { RootNavigationProp, SortByOption } from '@/utils/types';
import Header from '@/components/molecules/Header';
import { FlatList, TouchableOpacity } from 'react-native';
import NoteCard from '@/components/molecules/NoteCard';
import SearchInput from '@/components/molecules/SearchInput';
import SortByDropdown from '@/components/molecules/SortByDropdown';
import Typo from '@/components/molecules/Typo';
import { colors } from '@/constants/theme';
import * as Icons from 'phosphor-react-native'
import { useNavigation, useRouter } from 'expo-router'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/app/_layout'


const NotesSearch = () => {
    const { notesSearch, getNotesSearch, setNote, searchQuery, setSearchQuery, sortBy, setSortBy, toggleFavorite } = useNote()
    const rootNavigation = useNavigation<RootNavigationProp>();


    useEffect(() => {
        getNotesSearch()
    }, [searchQuery, sortBy])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header title="Search Notes" onBack={() => rootNavigation.goBack()} />
                <TouchableOpacity onPress={() => {
                    setNote(null)
                    rootNavigation.navigate("FormModal")
                }}>
                    <Icons.Plus size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>
            <View style={styles.searchSortContainer} >
                <SearchInput
                    placeholder="Search by title"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    containerStyle={{ flex: 1 }}
                />
                <SortByDropdown
                    value={sortBy}
                    onChange={setSortBy}
                />
            </View>
            {notesSearch.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Typo size={20} fontWeight={'600'}>No notes found</Typo>
                </View>
            ) : (
                <FlatList
                    data={notesSearch}
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

export default NotesSearch

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