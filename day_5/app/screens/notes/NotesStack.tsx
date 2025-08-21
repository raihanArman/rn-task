import React from "react";
import NotesList from "./index";
import SearchScreen from "./NotesSearch";
import { createStackNavigator } from "@react-navigation/stack";

export type NotesStackParamList = {
    NotesList: undefined;
    NotesSearch: undefined;
};

const Stack = createStackNavigator<NotesStackParamList>();

export default function NotesStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="NotesList" component={NotesList} />
            <Stack.Screen name="NotesSearch" component={SearchScreen} />
        </Stack.Navigator>
    );
}