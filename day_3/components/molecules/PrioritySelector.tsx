import { colorsMap, PriorityLevel, PriorityProps } from '@/utils/types';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Typo from './Typo';
import { colors } from '@/constants/theme';



const PrioritySelector = ({ priority, onPress }: PriorityProps) => {
    return (
        <View style={styles.container}>
            {(['high', 'medium', 'low'] as PriorityLevel[]).map((level) => {
                const isSelected = priority === level;
                return (
                    <TouchableOpacity
                        key={level}
                        style={styles.item}
                        onPress={() => onPress(level)}
                    >
                        <View
                            style={[
                                styles.circle,
                                { borderColor: '#ccc' },
                                isSelected && { backgroundColor: colorsMap[level] },
                            ]}
                        />
                        <Typo style={{ marginLeft: 8, color: colorsMap[level] }}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Typo>
                    </TouchableOpacity>
                );
            })}
        </View>
    );

}

export default PrioritySelector

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.neutral500,
    },
})