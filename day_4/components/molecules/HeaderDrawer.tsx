import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Typo from './Typo'
import { HeaderDrawerProps } from '@/utils/types'
import { useNavigation } from 'expo-router'
import { colors } from '@/constants/theme'
import * as Icons from 'phosphor-react-native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList } from '@/app/navigation/DrawerNavigator'



const HeaderDrawer = ({ title }: { title: string }) => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                style={{ marginRight: 16 }}
            >
                <Icons.List size={24} color={colors.neutral500} />
            </TouchableOpacity>

            <Typo size={20} fontWeight={"600"}>
                {title}
            </Typo>
        </View>
    );
};

export default HeaderDrawer;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        height: 56,
        backgroundColor: "white",
    },
});