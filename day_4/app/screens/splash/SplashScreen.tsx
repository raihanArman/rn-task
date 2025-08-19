import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Typo from '@/components/molecules/Typo'
import { colors } from '@/constants/theme'
import { useNote } from '@/contexts/noteContext'
import { useAuth } from '@/contexts/authContext'
import { useNavigation } from 'expo-router'
import { RootNavigationProp } from '@/utils/types'
import { CommonActions } from '@react-navigation/native'


const SplashScreen = () => {

    const rootNavigation = useNavigation<RootNavigationProp>();
    const { isLogin, checkIsLogin } = useAuth()

    useEffect(() => {
        checkIsLogin()
        const timeout = setTimeout(() => {
            if (isLogin) {
                rootNavigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Main" }],
                    })
                )
            } else {
                rootNavigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    })
                )
            }
        }, 2000);

        return () => clearTimeout(timeout);
    }, [isLogin]);

    return (
        <View style={styles.container}>
            <Typo size={24} fontWeight={'600'} style={{ color: colors.text }}>Notes App</Typo>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})