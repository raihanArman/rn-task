import { colors } from '@/constants/theme'
import { TypoProps } from '@/types'
import React from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native'

const Typo = ({
    size = 16,
    color = colors.black,
    fontWeight = '400',
    children,
    style,
    textProps = {},
}: TypoProps) => {
    const textStyle: TextStyle = {
        fontSize: size,
        color,
        fontWeight
    }
    return (
        <Text style={[textStyle, style]} {...textProps}>{children}</Text>
    )
}

export default Typo

const styles = StyleSheet.create({})