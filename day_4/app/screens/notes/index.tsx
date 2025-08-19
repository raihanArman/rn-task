import NoteCard from '@/components/molecules/NoteCard'
import Typo from '@/components/molecules/Typo'
import { colors } from '@/constants/theme'
import { useNote } from '@/contexts/noteContext'
import { NotesScreenNavigationProp, RootNavigationProp } from '@/utils/types'
import { useNavigation } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import HeaderDrawer from '@/components/molecules/HeaderDrawer'
import SearchBar from '@/components/molecules/SearchBar'
import NetworkContainer from '@/components/molecules/NetworkContainer'


const NotesScreen = () => {
    const { notes, getNotes, setNote, toggleFavorite } = useNote()
    const rootNavigation = useNavigation<RootNavigationProp>();
    const [loading, setLoading] = useState(false)

    const fetchNotes = async () => {
        setLoading(true)
        await getNotes()
        setLoading(false)
    }
    useEffect(() => {
        fetchNotes()
    }, [])


    return (
        <View style={styles.container}>
            <NetworkContainer onPress={() => fetchNotes()} />
            <View style={styles.header}>
                <HeaderDrawer title="Notes" />
                <TouchableOpacity onPress={() => {
                    setNote(null)
                    rootNavigation.navigate("FormModal")
                }}>
                    <Icons.Plus size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>
            <SearchBar />
            {loading ? (
                <View style={styles.loading}>
                    <Typo size={20} fontWeight={'600'}>Loading...</Typo>
                </View>
            ) : notes.length > 0 ? (
                <FlatList
                    data={notes}
                    renderItem={({ item }) => (
                        <NoteCard
                            note={item}
                            onPress={() => {
                                setNote(item)
                                rootNavigation.navigate("FormModal")
                            }}
                            toggleFavorite={() => toggleFavorite(item.id, item.isFavorite)}
                        />
                    )}
                    style={styles.flat}
                />
            ) : <View style={styles.emptyContainer}>
                <Typo size={20} fontWeight={'600'}>No notes found</Typo>
            </View>}

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
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})