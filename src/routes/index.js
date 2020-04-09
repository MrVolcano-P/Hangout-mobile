import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Auth from './Auth'
import Main from './Main'
import { useSelector } from 'react-redux'

const Stack = createStackNavigator()

export default () => {
    const token = useSelector(state => state.authToken)
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    token ?
                        <Stack.Screen name="Auth" component={Auth} />
                        :
                        <Stack.Screen name="Main" component={Main} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
