import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import HeaderDrawer from '@/components/molecules/HeaderDrawer'
import SettingItem from '@/components/molecules/SettingItem'
import { useAuth } from '@/contexts/authContext'
import { useNavigation } from 'expo-router'
import { RootNavigationProp } from '@/utils/types'
import { CommonActions } from '@react-navigation/native'

const SettingsScreen = () => {
    const { signOut } = useAuth()
    const rootNavigation = useNavigation<RootNavigationProp>();

    const confirmLogout = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            {
                text: "Cancel",
                onPress: () => { },
                style: "cancel",
            },
            {
                text: "Logout",
                onPress: () => { handleLogout() },
            },
        ])
    }

    const handleLogout = () => {
        signOut()
        rootNavigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
        }))
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderDrawer title="Settings" />
            </View>
            <SettingItem title="Profile" onPress={() => { }} />
            <SettingItem title="Notifications" onPress={() => { }} />
            <SettingItem title="Privacy" onPress={() => { }} />
            <SettingItem title="Help" onPress={() => { }} />
            <SettingItem title="About" onPress={() => { }} />
            <SettingItem title="Logout" onPress={() => { confirmLogout() }} color={colors.red} />
        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomColor: colors.neutral300,
    },
})