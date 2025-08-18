import login from "@/services/auth_services";
import { AuthContextProps, RootNavigationProp } from "@/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { CommonActions } from '@react-navigation/native';

const CHECK_LOGIN_KEY = 'CHECK_LOGIN'

export const AuthContext = createContext<AuthContextProps>({
    signIn: async () => false,
    signOut: async () => { },
    isLogin: false,
    checkIsLogin: async () => { },
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const rootNavigation = useNavigation<RootNavigationProp>();

    const [isLogin, setIsLogin] = useState(false)


    const checkIsLogin = async () => {
        const isLogin = await AsyncStorage.getItem(CHECK_LOGIN_KEY)
        console.log(`Check from authContext before setIsLogin: ${isLogin}`)
        if (isLogin) {
            setIsLogin(true)
        }
        console.log(`Check from authContext: ${isLogin}`)
    }

    const signIn = async (email: string, password: string) => {
        const result = await login(email, password)
        if (result) {
            await AsyncStorage.setItem(CHECK_LOGIN_KEY, 'true')
            setIsLogin(true)
            return true
        } else {
            Alert.alert("Error", "Invalid email or password")
            return false
        }
    }

    const signOut = async () => {
        await AsyncStorage.removeItem(CHECK_LOGIN_KEY)
        setIsLogin(false)
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            signOut,
            isLogin,
            checkIsLogin,
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)