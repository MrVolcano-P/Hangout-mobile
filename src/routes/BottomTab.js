import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AllStore from 'src/screens/Main/BottomTab/AllStore'
import Profile from 'src/screens/Main/BottomTab/Profile'
import colors from 'src/themes/colors'
import Icon from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

export default () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: colors.primary,
            }}
            initialRouteName="AllStore"
        >
            <Tab.Screen
                name="AllStore"
                component={AllStore}
                options={{
                    title: 'All Store',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="ios-home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="ios-contact" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
