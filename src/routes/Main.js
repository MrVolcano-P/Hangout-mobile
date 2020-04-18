import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTab from './BottomTab'
import Detail from '../screens/Main/Detail'


const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTab">
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    )
}
