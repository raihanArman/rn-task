import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TextInput, TextInputProps, TextProps, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";
import { NotesStackParamList } from "./app/screens/notes/NotesStack";
import { RootStackParamList } from "./app/_layout";

export type TypoProps = {
    size?: number;
    color?: string;
    fontWeight?: TextStyle["fontWeight"];
    children: any | null;
    style?: TextStyle;
    textProps?: TextProps;
};

export type NoteProps = {
    id: number;
    title: string;
    content: string;
    updatedAt: string;
    priority: PriorityLevel;
    isFavorite: boolean;
}

export type DividerPros = {
    style?: ViewStyle;
}

export type NoteContextProps = {
    notes: NoteProps[];
    note: NoteProps | null;
    notesSearch: NoteProps[];
    favoriteNotes: NoteProps[];
    getNotes: () => Promise<void>;
    getNotesSearch: () => Promise<void>;
    setNote: (note: NoteProps | null) => void;
    setNotesSearch: (notes: NoteProps[]) => void;
    addNote: (note: NoteProps) => Promise<void>;
    updateNote: (note: NoteProps) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
    // Sort & Search

    setDefaultNotesSearch: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortBy: SortByOption;
    setSortBy: (option: SortByOption) => void;

    // Favorite
    toggleFavorite: (id: number) => Promise<void>;
    getFavoriteNotes: () => Promise<void>;

    // Count
    getNotesCount: () => Promise<number>;
    getFavoriteNotesCount: () => Promise<number>;
}

export interface InputProps extends TextInputProps {
    icon?: React.ReactNode;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    inputRef?: React.RefObject<TextInput>;
    fontSize?: number;
    height?: number;
    //   label?: string;
    //   error?: string;
}

export interface ButtonProps extends TouchableOpacityProps {
    style?: ViewStyle;
    onPress?: () => void;
    buttonText: string;
    fontSize?: number;
}

export interface HeaderProps extends TouchableOpacityProps {
    style?: ViewStyle;
    onBack?: () => void;
    title: string;
}


export interface PriorityProps {
    priority: PriorityLevel;
    onPress: (priority: PriorityLevel) => void;
}


export type PriorityLevel = 'high' | 'medium' | 'low';

export const colorsMap: Record<PriorityLevel, string> = {
    high: '#FF4D4F',
    medium: '#FFC107',
    low: '#4CAF50',
};

export type DropdownProps = {
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
    placeholder?: string;
    style?: ViewStyle;
};

export type SortByOption =
    | 'newest'
    | 'oldest'
    | 'priorityHighLow'
    | 'priorityLowHigh';


export type SortByDropdownProps = {
    value: SortByOption;
    onChange: (option: SortByOption) => void;
};

export type NotesScreenNavigationProp = NativeStackNavigationProp<
    NotesStackParamList,
    "NotesList"
>;

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList, "Main">;

export type HeaderDrawerProps = {
    title: string;
};


export type FavoriteProps = {
    isFavorite: boolean;
    size?: number;
};

export type SettingItemProps = {
    title: string;
    color?: string;
    onPress?: () => void;
};

export type AuthContextProps = {
    signIn: (email: string, password: string) => Promise<boolean>;
    signOut: () => Promise<void>;
    isLogin: boolean;
    checkIsLogin: () => Promise<void>;
};