import NoteCard from '@/components/NoteCard'
import SearchInput from '@/components/SearchInput'
import SortByDropdown from '@/components/SortByDropdown'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import { useNote } from '@/contexts/noteContext'
import { SortByOption } from '@/types'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React, { useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'

const NotesScreen = () => {
    const { notes, setNote, searchQuery, setSearchQuery, sortBy, setSortBy } = useNote()
    const router = useRouter()

    const [selectedPriority, setSelectedPriority] = useState<SortByOption>('newest');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Typo size={40} fontWeight={'600'}>Notes</Typo>
                <TouchableOpacity onPress={() => {
                    setNote(null)
                    router.push(`/formModal`)
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
            {notes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Typo size={20} fontWeight={'600'}>No notes found</Typo>
                </View>
            ) : (
                <FlatList
                    data={notes}
                    renderItem={({ item }) => (
                        <NoteCard
                            note={item}
                            onPress={() => {
                                setNote(item)
                                router.push(`/formModal`)
                            }}
                        />
                    )}
                    style={styles.flat}
                />
            )}
        </View>
    )
}

export default NotesScreen

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
})