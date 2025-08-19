import { login, register } from "@/services/auth_remote_services";
import { AuthContextProps, RootNavigationProp } from "@/utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { CommonActions } from '@react-navigation/native';
import { User } from "@/utils/auth_types";
import { CHECK_LOGIN_KEY, TOKEN_KEY, USER_KEY } from "@/constants";

export const AuthContext = createContext<AuthContextProps>({
    signIn: async () => false,
    signOut: async () => { },
    signUp: async () => false,
    isLogin: false,
    checkIsLogin: async () => { },
    user: null,
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const [isLogin, setIsLogin] = useState(false)


    const checkIsLogin = async () => {
        const isLogin = await AsyncStorage.getItem(CHECK_LOGIN_KEY)
        const token = await AsyncStorage.getItem(TOKEN_KEY)
        console.log(`Check from authContext before setIsLogin: ${isLogin}`)
        console.log(`Check from authContext before setIsLogin: ${token}`)
        console.log(`Check from authContext before setIsLogin: ${user}`)
        if (isLogin) {
            setIsLogin(true)
            getUser()
        }
        console.log(`Check from authContext: ${isLogin}`)
    }

    const getUser = async () => {
        const user = await AsyncStorage.getItem(USER_KEY)
        if (!user) return
        setUser(JSON.parse(user))
    }

    const signIn = async (email: string, password: string) => {
        try {
            const emailParams = email.toLowerCase()
            const result = await login(emailParams, password)
            await savePref(result)
            return true
        } catch (error: any) {
            console.log(error)
            Alert.alert("Error", error.message)
            return false
        }
    }

    const signUp = async (email: string, password: string, name: string) => {
        try {
            const emailParams = email.toLowerCase()
            const result = await register(emailParams, password, name)
            await savePref(result)
            return true
        } catch (error: any) {
            console.log(error)
            Alert.alert("Error", error.message)
            return false
        }
    }

    const savePref = async (result: any) => {
        await AsyncStorage.setItem(TOKEN_KEY, result.token)
        await AsyncStorage.setItem(CHECK_LOGIN_KEY, "true")
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(result.user))
        setToken(result.token)
        setUser(result.user)
        setIsLogin(true)
    }

    const signOut = async () => {
        await AsyncStorage.clear();
        setIsLogin(false)
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            signUp,
            signOut,
            isLogin,
            checkIsLogin,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)