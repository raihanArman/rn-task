import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FavoriteProps } from '@/utils/types'
import * as Icons from 'phosphor-react-native'
import { colors } from '@/constants/theme'

const Favorite = ({ isFavorite, size }: FavoriteProps) => {
    return (
        <View>
            <Icons.HeartIcon color={isFavorite ? colors.red : colors.neutral500} size={size ? size : 24} weight={isFavorite ? 'fill' : 'regular'} />
        </View>
    )
}

export default Favorite

const styles = StyleSheet.create({})