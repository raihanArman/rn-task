import { colors } from '@/constants/theme'
import { InputProps } from '@/utils/types'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Typo from '../molecules/Typo'

const Input = ({ value, onChangeText, required, validator, ...props }: InputProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // validasi hanya jika value ada
        if (!value || value.trim() === '') {
            setError(null)
            return
        }

        if (required && value.trim() === '') {
            setError('This field is required')
        } else if (validator) {
            setError(validator(value))
        } else {
            setError(null)
        }
    }, [value, required, validator])

    return (
        <View style={props.containerStyle}>
            <View style={[
                styles.container,
                props.containerStyle,
                isFocused && styles.primaryBorder,
                error && styles.errorBorder
            ]}>
                {props.icon && <View>{props.icon}</View>}
                <TextInput
                    style={[styles.input, props.inputStyle, { fontSize: props.fontSize, height: props.height }]}
                    placeholderTextColor={colors.neutral500}
                    ref={props.inputRef}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    multiline={true}
                    numberOfLines={props.numberOfLines}
                    textAlignVertical="top"
                    value={value}            // controlled dari parent
                    onChangeText={onChangeText} // controlled dari parent
                    {...props}
                />
            </View>
            {error && <Typo style={styles.errorText}>{error}</Typo>}
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral300,
        paddingHorizontal: 16,
    },
    primaryBorder: {
        borderBottomColor: colors.primary,
    },
    errorBorder: {
        borderBottomColor: colors.red,
    },
    input: {
        flex: 1,
        color: colors.text,
        fontSize: 24
    },
    errorText: {
        color: colors.red,
        fontSize: 12,
        marginTop: 4
    }
})