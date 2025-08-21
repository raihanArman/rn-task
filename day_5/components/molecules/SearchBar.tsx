import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import * as Icons from 'phosphor-react-native'
import Typo from './Typo'
import { useNavigation } from 'expo-router'
import { NotesScreenNavigationProp } from '@/utils/types'
import { useNote } from '@/contexts/noteContext';

const SearchBar = () => {
    const notesNavigation = useNavigation<NotesScreenNavigationProp>();
    const { setDefaultNotesSearch } = useNote()
    return (
        <TouchableOpacity style={styles.searchBar} onPress={() => {
            setDefaultNotesSearch()
            notesNavigation.navigate("NotesSearch")
        }}>
            <Icons.MagnifyingGlass size={24} color={colors.neutral500} />
            <Typo size={16} fontWeight={'600'} color={colors.neutral500}>Search</Typo>
        </TouchableOpacity>
    )
}

export default SearchBar

const styles = StyleSheet.create({
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