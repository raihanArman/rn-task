import { RootStackParamList } from "@/app/_layout";
import { NotesStackParamList } from "@/app/screens/notes/NotesStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TextInput, TextInputProps, TextProps, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";
import { User } from "./auth_types";
import { Author } from "./feed_types";

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

export type FeedProps = {
    id: number;
    title: string;
    content: string;
    category: string;
    isFavorite: boolean;
    isPublic: boolean;
    imageUrls: string[];
    createdAt: string;
    updatedAt: string;
    userId: number;
    author: Author;
    likesCount: number;
    isLikedByCurrentUser: boolean
}

export type FeedLikeProps = {
    likedAt: string
    profilePicture: string
    userId: number
    userName: string
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
    addNote: (note: NoteProps) => Promise<boolean>;
    updateNote: (note: NoteProps) => Promise<boolean>;
    deleteNote: (id: number) => Promise<boolean>;
    // Sort & Search

    setDefaultNotesSearch: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortBy: SortByOption;
    setSortBy: (option: SortByOption) => void;

    // Favorite
    toggleFavorite: (id: number, isFavorite: boolean) => Promise<void>;
    getFavoriteNotes: () => Promise<void>;

    // Count
    getNotesCount: () => Promise<number>;
    getFavoriteNotesCount: () => Promise<number>;
}

export interface InputProps extends TextInputProps {
    icon?: React.ReactNode
    containerStyle?: ViewStyle
    inputStyle?: TextStyle
    inputRef?: React.RefObject<TextInput>
    fontSize?: number
    height?: number
    required?: boolean
    validator?: (value: string) => string | null
}

export interface InputPasswordProps extends TextInputProps {
    value: string
    onChangeText: (text: string) => void
    containerStyle?: ViewStyle
    inputStyle?: TextStyle
    inputRef?: React.RefObject<TextInput>
    fontSize?: number
    height?: number
    required?: boolean
    validator?: (value: string) => string | null
}


export interface ButtonProps extends TouchableOpacityProps {
    style?: ViewStyle;
    onPress?: () => void;
    buttonText: string;
    fontSize?: number;
    isLoading?: boolean;
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
    signUp: (email: string, password: string, name: string, profilePicture: string | null) => Promise<boolean>;
    signOut: () => Promise<void>;
    isLogin: boolean;
    checkIsLogin: () => Promise<void>;
    user: User | null;
};

export type NetworkContextProps = {
    isOnline: boolean;
};


export type AvatarProps = {
    size?: number;
    uri: string | null;
    style?: ViewStyle;
};

export type FeedContextProps = {
    feeds: FeedProps[];
    feed: FeedProps | null;
    loadFeeds: () => Promise<void>;
    likeFeedNote: (feedId: number) => Promise<void>;
    getLikedFeedsCount: () => Promise<number>;
    loadFeedLikes: (feedId: number) => Promise<void>;
    feedLikes: FeedLikeProps[];
}

export interface LikesBottomSheetProps {
    feedId: number;
    onClose?: () => void;
}

export interface LikesBottomSheetRef {
    expand: () => void;
    close: () => void;
}
