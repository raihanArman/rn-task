import { colors } from '@/constants/theme'
import { ProfileProps } from '@/types'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Avatar from './Avatar'
import Button from './Button'

const profilePicture = `https://upload.wikimedia.org/wikipedia/commons/a/a2/Person_Image_Placeholder.png?20230410144854`;

const ProfileCard = ({
    name,
    email,
    phone,
    address,
    onEdit,
    onDelete,
}: ProfileProps) => {
    return (
        <View style={styles.container}>
            <Avatar url={profilePicture} size={60} />
            <View style={styles.info}>
                <Text>{name}</Text>
                <Text>{email}</Text>
                <Text>{phone}</Text>
                <Text>{address}</Text>
                <View style={styles.cta}>
                    <Button style={styles.editButton} onPress={onEdit} buttonText="Edit" />
                    <Button style={styles.deleteButton} onPress={onDelete} buttonText="Delete" />
                </View>
            </View>
        </View>
    )
}

export default ProfileCard

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    info: {
        flex: 1,
        marginLeft: 16,
        gap: 8
    },
    cta: {
        flexDirection: "row",
        gap: 8
    },
    editButton: {
        backgroundColor: colors.yellow,
        width: 80,
    },
    deleteButton: {
        backgroundColor: colors.red,
        width: 80,
    },
})