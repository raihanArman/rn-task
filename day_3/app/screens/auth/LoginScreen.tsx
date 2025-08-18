import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Typo from '@/components/molecules/Typo'
import { colors } from '@/constants/theme'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import { useAuth } from '@/contexts/authContext'
import { useNavigation } from 'expo-router'
import { CommonActions } from '@react-navigation/native'
import { RootNavigationProp } from '@/utils/types'

const LoginScreen = () => {
    const { signIn } = useAuth()
    const rootNavigation = useNavigation<RootNavigationProp>();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Email and password are required")
            return
        }
        try {
            const result = await signIn(email, password)
            if (result) {
                rootNavigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Main" }],
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Typo size={24} fontWeight={'600'} style={{ color: colors.text }}>Login</Typo>
            </View>
            <View style={styles.form}>
                <Input placeholder="Username" value={email} onChangeText={setEmail} fontSize={16} />
                <Input placeholder="Password" value={password} onChangeText={setPassword} fontSize={16} />
            </View>
            <Button
                buttonText="Login"
                onPress={() => { handleLogin() }}
                style={{ marginTop: 20, marginHorizontal: 20, }}
                fontSize={20}
            />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: 100,
        marginBottom: 50,
        marginLeft: 20,
    },
    form: {
        paddingHorizontal: 20,
        gap: 16,
    },
})