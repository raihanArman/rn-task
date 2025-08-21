import TabNavigator from "./TabNavigator";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserProfileScreen from "../screens/user/UserProfileScreen";

const Drawer = createDrawerNavigator();

export type DrawerParamList = {
    Home: undefined;
    Profile: undefined;
};

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Home"
        >
            <Drawer.Screen name="Home" component={TabNavigator} />
            <Drawer.Screen name="Profile" component={UserProfileScreen} />
        </Drawer.Navigator>
    );
}