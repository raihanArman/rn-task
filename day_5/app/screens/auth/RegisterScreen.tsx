import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Typo from '@/components/molecules/Typo'
import { colors } from '@/constants/theme'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import { useAuth } from '@/contexts/authContext'
import { useNavigation } from 'expo-router'
import { CommonActions } from '@react-navigation/native'
import { RootNavigationProp } from '@/utils/types'
import PasswordInput from '@/components/molecules/PasswordInput'
import { Validator } from '@/utils/validator'
import * as ImagePicker from 'expo-image-picker'
import Avatar from '@/components/molecules/Avatar'
import * as Icons from "phosphor-react-native"
import { onPickImage } from '@/utils/image_picker_helper'

const RegisterScreen = () => {
    const { signUp } = useAuth()
    const rootNavigation = useNavigation<RootNavigationProp>();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [profilePicture, setProfilePicture] = useState<string | null>(null)

    const handleRegister = async () => {
        const nameError = Validator.defaultValidator("Name", name)
        const emailError = Validator.email(email)
        const passwordError = Validator.password(password)
        if (nameError || emailError || passwordError) {
            Alert.alert("Error", nameError ? nameError : emailError ? emailError : passwordError ? passwordError : "Invalid email or password")
            return
        }

        try {
            setIsLoading(true)
            const result = await signUp(email, password, name, profilePicture)
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
                <Typo size={24} fontWeight={'600'} style={{ color: colors.text }}>Register</Typo>
            </View>
            <View style={styles.avatar}>
                <Avatar uri={profilePicture} size={130} />
                <TouchableOpacity style={styles.editIcon} onPress={() => onPickImage((uri) => {
                    console.log(`Register -> ${uri}`)
                    setProfilePicture(uri)
                })}>
                    <Icons.Pencil
                        size={20}
                        color={colors.neutral800}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <Input placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    fontSize={16}
                    required
                    validator={(value) => Validator.defaultValidator("Name", value)} />
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
                    validator={Validator.password}
                    secureTextEntry />
            </View>
            <Button
                buttonText="Register"
                onPress={() => { handleRegister() }}
                style={{ marginTop: 20, marginHorizontal: 20, }}
                fontSize={20}
                isLoading={isLoading}
            />
            <View style={{ marginTop: 25 }}>
                <View style={styles.footer}>
                    <Typo size={16} fontWeight={'600'} style={{ color: colors.text }}>Already have an account?</Typo>
                    <Pressable onPress={() => { rootNavigation.navigate("Login") }}>
                        <Typo size={16} fontWeight={'600'} style={{ color: colors.primary }}>Login</Typo>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default RegisterScreen

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
    },
    avatar: {
        alignSelf: "center",
        backgroundColor: colors.primary,
        width: 100,
        height: 100,
        borderRadius: 200,
        justifyContent: "center",
        alignItems: "center",
        borderColor: colors.primary,
        borderWidth: 1,
        marginBottom: 20,
    },
    editIcon: {
        position: "absolute",
        bottom: -20,
        right: -20,
        borderRadius: 100,
        backgroundColor: colors.neutral100,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 4,
        padding: 7,
    },
})