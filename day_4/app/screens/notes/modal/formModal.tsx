import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import PrioritySelector from '@/components/molecules/PrioritySelector'
import Typo from '@/components/molecules/Typo'
import { colors } from '@/constants/theme'
import { useNote } from '@/contexts/noteContext'
import { PriorityLevel } from '@/utils/types'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const formModal = () => {
    const { note, addNote, updateNote, deleteNote } = useNote()
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const [priority, setPriority] = React.useState<PriorityLevel>('medium')
    const [isLoading, setIsLoading] = React.useState(false)
    const router = useRouter()

    useEffect(() => {
        if (note) {
            setTitle(note.title)
            setContent(note.content)
            setPriority(note.priority)
        }
    }, [note])

    const handleSubmit = async () => {
        setIsLoading(true)
        if (note) {
            const result = await updateNote({
                ...note,
                title,
                content,
                priority,
            })
            if (result) {
                router.back()
            }
            setIsLoading(false)
        } else {
            const result = await addNote({
                id: Date.now(),
                title,
                content,
                updatedAt: new Date().toISOString(),
                priority,
                isFavorite: false,
            })
            if (result) {
                router.back()
            }
            setIsLoading(false)
        }
    }

    const handleDelete = () => {
        if (note) {
            deleteNote(note.id)
        }
        router.back()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Typo size={16} fontWeight={'600'} color={colors.red}>Cancel</Typo>
                </TouchableOpacity>
            </View>
            <Input
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                containerStyle={
                    {
                        height: 80,
                        marginBottom: 16,
                    }
                }
            />
            <Input
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                containerStyle={
                    {
                        height: 200,
                        marginBottom: 24,
                    }
                }
            />
            <Typo size={16} fontWeight={'600'} style={{ marginBottom: 8, marginTop: 24 }} >Priority</Typo>
            <PrioritySelector priority={priority} onPress={setPriority} />

            <Button style={styles.addButton} buttonText={note ? 'Save Changes' : 'Add'} onPress={handleSubmit} isLoading={isLoading} />
            {note && (
                <Button style={styles.backButton} buttonText="Delete" onPress={handleDelete} />
            )}
        </View>
    )
}

export default formModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.white,
        paddingTop: 40,
    },
    header: {
        alignContent: 'flex-end',
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    addButton: {
        height: 44,
        fontWeight: 'bold',
        marginTop: 8,
    },
    backButton: {
        height: 44,
        fontWeight: 'bold',
        backgroundColor: colors.red,
        marginTop: 8,
    },
})