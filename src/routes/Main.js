/* eslint-disable prettier/prettier */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTab from './BottomTab'
import Detail from '../screens/Main/Detail'
import Login from 'src/screens/Auth/Login'
import Register from 'src/screens/Auth/Register'
import EditProfile from '../screens/Main/EditProfile'
import AddParty from '../screens/Main/Add/AddParty'
import AddReview from '../screens/Main/Add/AddReview'
import DetailParty from '../screens/Main/DetailParty'
import ChangePassword from '../screens/Main/ChangePassword'
import PubRegister from '../screens/Auth/PubRegister'
import Pubdata from '../screens/Auth/Pubdata'
const Stack = createStackNavigator()

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="BottomTab">
            <Stack.Screen name="BottomTab" component={BottomTab} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="PubRegister" component={PubRegister} />
            <Stack.Screen name="Pubdata" component={Pubdata} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="DetailParty" component={DetailParty} />
            <Stack.Screen name="AddParty" component={AddParty} />
            <Stack.Screen name="AddReview" component={AddReview} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
    )
}
