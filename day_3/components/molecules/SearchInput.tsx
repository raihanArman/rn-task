import { colors } from '@/constants/theme'
import { InputProps } from '@/types'
import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const SearchInput = (props: InputProps) => {
    const [isFocuesd, setIsFocused] = useState(false)
    return (
        <View style={[
            styles.container,
            props.containerStyle && props.containerStyle,
            isFocuesd && styles.primaryBorder
        ]}>
            {props.icon && props.icon}
            <TextInput
                style={[styles.input, props.inputStyle]}
                placeholderTextColor={colors.neutral400}
                ref={props.inputRef && props.inputRef}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...props}
            />
        </View>
    )
}

export default SearchInput
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.neutral500,
        borderRadius: 8,
        paddingHorizontal: 12,
        gap: 10
    },
    primaryBorder: {
        borderColor: colors.primary,
    },
    input: {
        flex: 1,
        color: colors.text,
        fontSize: 14,
    }
})