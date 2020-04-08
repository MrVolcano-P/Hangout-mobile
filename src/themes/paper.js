import { DefaultTheme } from 'react-native-paper'
import colors from './colors'

export default {
    ...DefaultTheme,
    roundness: 4,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFF',
        primary: colors.primary,
        accent: '#f1c40f',
    },
}