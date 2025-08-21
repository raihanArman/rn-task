import { colors } from '@/constants/theme'
import { colorsMap, NoteProps } from '@/utils/types'
import { format } from 'date-fns'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Divider from '@/components/atoms/Divider'
import Typo from '@/components/molecules/Typo'
import Favorite from '@/components/molecules/Favorite'

const NoteCard = ({ note, onPress, toggleFavorite }: { note: NoteProps, onPress: () => void, toggleFavorite: () => void }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.title}>
                <View style={[styles.indicator, { backgroundColor: colorsMap[note.priority] }]} />
                <Typo size={30} fontWeight={'600'} style={{ color: colors.black, flex: 1 }}>{note.title}</Typo>
                <TouchableOpacity onPress={toggleFavorite}>
                    <Favorite isFavorite={note.isFavorite} />
                </TouchableOpacity>
            </View>
            <Typo size={16} fontWeight={'400'} style={{ color: colors.neutral500 }}>{note.content}</Typo>
            <Divider style={{ marginTop: 8, marginBottom: 8 }} />
            <Typo size={12} fontWeight={'400'} style={{ color: colors.neutral500 }}>{format(new Date(note.updatedAt), 'E dd MMM yyyy, HH:mm')}</Typo>
        </TouchableOpacity>
    )
}

export default NoteCard

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    indicator: {
        borderRadius: 100,
        width: 12,
        height: 12,
        marginRight: 8,
    }
})