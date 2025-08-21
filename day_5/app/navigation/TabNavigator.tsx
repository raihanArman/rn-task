import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotesStack from "../screens/notes/NotesStack";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import * as Icons from 'phosphor-react-native'
import { useNetwork } from "@/contexts/networkContext";
import { View, StyleSheet, Pressable } from "react-native";
import Typo from "@/components/molecules/Typo";
import { colors } from "@/constants/theme";
import FeedsScreen from "../screens/feed/FeedsScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetProvider } from "@gorhom/bottom-sheet/lib/typescript/contexts";


export type TabParamList = {
    Notes: undefined;
    Feeds: undefined;
    Categories: undefined;
    Settings: undefined;
};


const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
    const { isOnline } = useNetwork();

    return (
        <GestureHandlerRootView>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let IconComponent: React.ComponentType<any>;

                        if (route.name === "Notes") IconComponent = Icons.Book;
                        else if (route.name === "Feeds") IconComponent = Icons.GlobeIcon;
                        else if (route.name === "Categories") IconComponent = Icons.List;
                        else IconComponent = Icons.Gear;

                        return (
                            <IconComponent
                                color={color}
                                size={size}
                                weight={focused ? "fill" : "regular"}
                            />
                        );
                    },
                    tabBarActiveTintColor: "#007AFF",
                    tabBarInactiveTintColor: "gray",
                })}
            >
                <Tab.Screen name="Notes" component={NotesStack} />
                <Tab.Screen name="Feeds" component={FeedsScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </GestureHandlerRootView>
    );

}

export default TabNavigator