import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from 'src/screens/Auth/Login'
import Register from 'src/screens/Auth/Register'

const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}