import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTab from './BottomTab'
import Detail from '../screens/Main/Detail'
import Login from 'src/screens/Auth/Login'
import Register from 'src/screens/Auth/Register'

const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTab">
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}
