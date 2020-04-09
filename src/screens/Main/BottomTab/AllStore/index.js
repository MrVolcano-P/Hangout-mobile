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
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        pic: 'http://www.zocialx.com/wp-content/uploads/2019/03/3-315.jpg'

    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];
function Item({ title, pic }) {
    const image = { uri: pic }
    return (
        <View style={styles.item}>
            <CardView
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={5}
                style={styles.cardViewStyle}>
                <ImageBackground source={image} style={styles.image}>
                    <Text style={styles.title}>{title}</Text>
                </ImageBackground>
            </CardView>
        </View>

    );
}

export default function AllStore() {

    return (
        <SafeAreaView>
            <Appbar.Header>
                <ContentTitle title={'Title'} style={styles.contentTitle} />
            </Appbar.Header>
            <Searchbar
                placeholder="Search"
                // onChangeText={this._onChangeSearch}
                // value={searchQuery}
                style={styles.searchbar}
            />
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item title={item.title} pic={item.pic} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}
