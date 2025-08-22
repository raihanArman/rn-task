import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Typo from '@/components/molecules/Typo'
import { colors } from '@/constants/theme'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import { useAuth } from '@/contexts/authContext'
import { useNavigation } from 'expo-router'
import { CommonActions } from '@react-navigation/native'
import { RootNavigationProp } from '@/utils/types'
import { Validator } from '@/utils/validator'
import PasswordInput from '@/components/molecules/PasswordInput'

const LoginScreen = () => {
    const { signIn } = useAuth()
    const rootNavigation = useNavigation<RootNavigationProp>();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {
        const emailError = Validator.email(email)
        const passwordError = Validator.password(password)

        if (emailError || passwordError) {
            Alert.alert('Error', emailError ? emailError : passwordError ? passwordError : 'Invalid email or password')
            return
        }

        try {
            setIsLoading(true)
            const result = await signIn(email, password)
            if (result) {
                rootNavigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Main" }],
                }))
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Typo size={24} fontWeight={'600'} style={{ color: colors.text }}>Login</Typo>
            </View>
            <View style={styles.form}>
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    fontSize={16}
                    required
                    validator={Validator.email}
                />
                <PasswordInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    fontSize={16}
                    required
                />
            </View>
            <Button
                buttonText="Login"
                onPress={() => { handleLogin() }}
                style={{ marginTop: 20, marginHorizontal: 20, }}
                fontSize={20}
                isLoading={isLoading}
            />

            <View style={{ marginTop: 25 }}>
                <View style={styles.footer}>
                    <Typo size={16} fontWeight={'600'} style={{ color: colors.text }}>Don't have an account?</Typo>
                    <Pressable onPress={() => { rootNavigation.navigate("Register") }}>
                        <Typo size={16} fontWeight={'600'} style={{ color: colors.primary }}>Register</Typo>
                    </Pressable>
                </View>
            </View>
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
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    }
})