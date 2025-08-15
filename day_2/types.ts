import { TextInput, TextInputProps, TextProps, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";

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
}

export type DividerPros = {
    style?: ViewStyle;
}

export type NoteContextProps = {
    notes: NoteProps[];
    note: NoteProps | null;
    getNotes: () => Promise<void>;
    setNote: (note: NoteProps | null) => void;
    addNote: (note: NoteProps) => Promise<void>;
    updateNote: (note: NoteProps) => Promise<void>;
    deleteNote: (id: number) => Promise<void>;
    // Sort & Search

    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortBy: SortByOption;
    setSortBy: (option: SortByOption) => void;
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
