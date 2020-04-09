import React, { useMemo } from 'react'
import { FlatList, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { Chip } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-paper'
import { fundComma, dateTime } from 'src/helpers/text'
import { Appbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AllStore() {
    
    return (
        <SafeAreaView>
            <Appbar.Header>
        <Appbar.BackAction
          onPress={() => console.log("adsad")}
        />
        <Appbar.Content
          title="Title"
          subtitle="Subtitle"
        />
        <Appbar.Action icon="magnify" onPress={() => console.log("adsad")} />
        <Appbar.Action icon="dots-vertical" onPress={() => console.log("adsad")} />
      </Appbar.Header>
        </SafeAreaView>
    )
}
