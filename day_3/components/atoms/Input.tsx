import { colors } from '@/constants/theme'
import { InputProps } from '@/types'
import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const Input = (props: InputProps) => {
    const [isFocused, setIsFocused] = useState(false)
    return (
        <View style={[
            styles.container,
            props.containerStyle && props.containerStyle,
            isFocused && styles.primaryBorder,
        ]}>
            <TextInput
                style={[styles.input, props.inputStyle]}
                placeholderTextColor={colors.neutral500}
                ref={props.inputRef && props.inputRef}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                multiline={true}
                numberOfLines={props.numberOfLines}
                textAlignVertical="top"
                {...props}
            />
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
    input: {
        flex: 1,
        color: colors.text,
        fontSize: 24
    }
})