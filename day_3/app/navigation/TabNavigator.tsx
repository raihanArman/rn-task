import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotesStack from "../screens/notes/NotesStack";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";
import * as Icons from 'phosphor-react-native'


export type TabParamList = {
    Notes: undefined;
    Favorites: undefined;
    Categories: undefined;
    Settings: undefined;
};


const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let IconComponent: React.ComponentType<any>;

                    if (route.name === "Notes") IconComponent = Icons.Book;
                    else if (route.name === "Favorites") IconComponent = Icons.Heart;
                    else if (route.name === "Categories") IconComponent = Icons.List;
                    else IconComponent = Icons.Gear;

                    return <IconComponent color={color} size={size} weight={focused ? "fill" : "regular"} />;
                },
                tabBarActiveTintColor: "#007AFF",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen options={{ headerShown: false }} name="Notes" component={NotesStack} />
            <Tab.Screen options={{ headerShown: false }} name="Favorites" component={FavoritesScreen} />
            <Tab.Screen options={{ headerShown: false }} name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}