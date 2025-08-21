import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNetwork } from '@/contexts/networkContext'
import { colors } from '@/constants/theme'
import Typo from './Typo'

const NetworkContainer = ({ onPress }: { onPress: () => void }) => {
    const { isOnline } = useNetwork()
    return (
        <>
            {!isOnline && (
                <View style={styles.networkContainer}>
                    <Typo size={16} fontWeight={'600'} color={colors.white}>No Internet Connection</Typo>
                    <Pressable onPress={onPress}>
                        <Typo size={16} fontWeight={'600'} color={colors.white}>Retry</Typo>
                    </Pressable>
                </View>
            )}
        </>
    )
}

export default NetworkContainer

const styles = StyleSheet.create({

    networkContainer: {
        backgroundColor: colors.red,
        paddingTop: 50,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
})