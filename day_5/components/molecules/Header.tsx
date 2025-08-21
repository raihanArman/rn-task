import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Typo from './Typo'
import { HeaderProps } from '@/types'
import { useNavigation } from 'expo-router'
import { colors } from '@/constants/theme'
import * as Icons from 'phosphor-react-native'

const Header = ({ title, onBack }: HeaderProps) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            {onBack && (
                <TouchableOpacity onPress={onBack} style={{ marginRight: 16 }}>
                    <Icons.ArrowLeft size={24} color={colors.neutral500} />
                </TouchableOpacity>
            )}
            <Typo size={20} fontWeight={'600'}>{title}</Typo>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})