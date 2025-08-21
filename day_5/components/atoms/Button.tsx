import { colors } from '@/constants/theme'
import { ButtonProps } from '@/utils/types'
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'

const Button = ({
    style,
    onPress,
    buttonText,
    fontSize,
    isLoading = false,
}: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}>
            {isLoading ? (
                <ActivityIndicator size="small" color={colors.white} />
            ) : (
                <Text style={[styles.buttonText, { fontSize }]}>{buttonText}</Text>
            )}
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    buttonText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "bold",
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