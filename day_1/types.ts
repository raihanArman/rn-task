import { TextInput, TextInputProps, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";

export type ProfileProps = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export type AvatarProps = {
    size?: number;
    url: string | null;
};

export interface ButtonProps extends TouchableOpacityProps {
    style?: ViewStyle;
    onPress?: () => void;
    buttonText: string;
}


export type AppBarProps = {
    title: string;
    action?: React.ReactNode;
};

export interface InputProps extends TextInputProps {
    icon?: React.ReactNode;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    inputRef?: React.RefObject<TextInput>;
    //   label?: string;
    //   error?: string;
}