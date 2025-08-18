import { colors } from '@/constants/theme'
import { DividerPros } from '@/types'
import React from 'react'
import { StyleSheet, View } from 'react-native'

const Divider = ({ style }: DividerPros) => {
    return (
        <View style={[styles.container, style]} />
    )
}

export default Divider

const styles = StyleSheet.create({
    container: {
        height: 1,
        backgroundColor: colors.neutral300,
    }
})