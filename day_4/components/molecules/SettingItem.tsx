import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import Typo from './Typo'
import * as Icons from 'phosphor-react-native'
import { SettingItemProps } from '@/utils/types'
import { TouchableOpacity } from 'react-native'

const SettingItem = (props: SettingItemProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Typo size={16} fontWeight={'600'} style={{ color: props.color ? props.color : colors.text }}>{props.title}</Typo>
            <Icons.CaretRightIcon size={24} color={colors.neutral500} />
        </TouchableOpacity>
    )
}

export default SettingItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral300,
    }
})