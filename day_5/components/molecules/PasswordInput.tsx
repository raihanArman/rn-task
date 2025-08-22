import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, Pressable, TextInputProps, ViewStyle, TextStyle } from 'react-native'
import { colors } from '@/constants/theme'
import Typo from '@/components/molecules/Typo'
import * as Icons from 'phosphor-react-native'
import { InputPasswordProps } from '@/utils/types'


const PasswordInput = ({
    value,
    onChangeText,
    required,
    validator,
    containerStyle,
    inputStyle,
    fontSize,
    height,
    inputRef,
    ...props
}: InputPasswordProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [inputKey, setInputKey] = useState(0);

    useEffect(() => {
        if (!value || value.trim() === '') {
            setError(null);
            return;
        }

        if (required && value.trim() === '') {
            setError('This field is required');
        } else if (validator) {
            setError(validator(value));
        } else {
            setError(null);
        }
    }, [value, required, validator]);

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
        setInputKey(prev => prev + 1);
    };

    return (
        <View style={containerStyle}>
            <View style={[
                styles.container,
                containerStyle,
                isFocused && styles.primaryBorder,
                error && styles.errorBorder
            ]}>
                <TextInput
                    key={inputKey}
                    style={[styles.input, inputStyle, { fontSize, height }]}
                    placeholderTextColor={colors.neutral500}
                    ref={inputRef}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    multiline={false}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={!showPassword}
                    {...props}
                />
                <Pressable onPress={toggleShowPassword}>
                    {showPassword
                        ? <Icons.Eye size={24} color={colors.neutral500} weight="bold" />
                        : <Icons.EyeSlash size={24} color={colors.neutral500} weight="bold" />}
                </Pressable>
            </View>
            {error && <Typo style={styles.errorText}>{error}</Typo>}
        </View>
    );
};


export default PasswordInput

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral300,
        paddingHorizontal: 16,
        height: 60,
    },
    primaryBorder: {
        borderBottomColor: colors.primary,
    },
    errorBorder: {
        borderBottomColor: colors.red,
    },
    input: {
        flex: 1,
        color: colors.text,
    },
    errorText: {
        color: colors.red,
        fontSize: 12,
        marginTop: 4,
    }
})