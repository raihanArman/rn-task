import React from "react";
import { CommonActions, createNavigationContainerRef, NavigationContainer } from "@react-navigation/native";
import { NoteProvider } from "@/contexts/noteContext";
import TabNavigator from "./navigation/TabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormModal from "./screens/notes/modal/formModal";
import DrawerNavigator from "./navigation/DrawerNavigator";
import SplashScreen from "./screens/splash/SplashScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import { AuthProvider } from "@/contexts/authContext";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { NetworkProvider } from "@/contexts/networkContext";
import { FeedProvider } from "@/contexts/feedContext";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Splash: undefined;
  Main: undefined;
  FormModal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const rootNavigationRef = createNavigationContainerRef<RootStackParamList>();


export default function RootLayout() {
  return (
    <NetworkProvider>
      <AuthProvider>
        <FeedProvider>
          <NoteProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Main" component={DrawerNavigator} />
              <Stack.Screen name="FormModal" component={FormModal} options={{ presentation: 'modal' }} />
            </Stack.Navigator>
          </NoteProvider>
        </FeedProvider>
      </AuthProvider>
    </NetworkProvider>
  );
}