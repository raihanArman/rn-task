import { colors } from '@/constants/theme';
import { AppBarProps } from '@/types';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const AppBar = ({ title, action }: AppBarProps) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                {action && <View style={styles.action}>{action}</View>}
            </View>
        </SafeAreaView>
    );
};

export default AppBar

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: colors.white,
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: 16,
        height: 60,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ccc",
    },
    action: {
        position: "absolute",
        right: 16,
    },
    title: {
        color: colors.black,
        fontSize: 24,
        fontWeight: "bold",
    }
})