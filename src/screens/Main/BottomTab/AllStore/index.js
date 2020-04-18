import React, { useMemo } from 'react'
import { FlatList, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { Chip } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-paper'
import { fundComma, dateTime } from 'src/helpers/text'
import { Appbar, Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardView from 'react-native-cardview';

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

const DATA = [
    {
        id: '1',
        title: 'ท่าช้าง',
        pic: 'http://www.zocialx.com/wp-content/uploads/2019/03/3-315.jpg',
        geolocation: {
            longtitude: "98.994780",
            latitude: "18.801800"
        }

    },
    {
        id: '2',
        title: 'ตะวันแดง',
        pic: 'https://fastly.4sqi.net/img/general/width960/9742015_lEq6GL-DCWFs6L4f7IiUOix9gWkR4Klj4zotztJZjXY.jpg',
        geolocation: {
            longtitude: "98.964002",
            latitude: "18.797269"
        }
    },
    {
        id: '3',
        title: 'Warm Up',
        pic: 'https://fastly.4sqi.net/img/general/width960/14627946_nj42T4POdU07r3XcCy9BAZkYW_Ze6cfiupQQUyvpMls.jpg',
        geolocation: {
            longtitude: "98.965086",
            latitude: "18.795148"
        }
    },
];



function Item({item }) {
    const navigation = useNavigation()
    const image = { uri: item.pic }
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Detail', {
                item: item
            })}
        >
            <View style={styles.item}>
                <CardView
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}
                    style={styles.cardViewStyle}>
                    <ImageBackground source={image} style={styles.image}>
                        <Text style={styles.title}>{item.title}</Text>
                    </ImageBackground>
                </CardView>
            </View>
        </TouchableOpacity>


    );
}

export default function AllStore() {

    console.log(DATA)
    return (
        <SafeAreaView>
            <Appbar.Header>
                <ContentTitle title={'Yark Hangout'} style={styles.contentTitle} />
            </Appbar.Header>
            <Searchbar
                placeholder="Search"
                // onChangeText={this._onChangeSearch}
                // value={searchQuery}
                style={styles.searchbar}
            />
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}
