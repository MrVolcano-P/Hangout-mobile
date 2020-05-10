import React, { useMemo, useCallback, useEffect, useState } from 'react'
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
import pubAPI from 'src/api/pub'
const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

function Item({ item }) {
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
    const [pub, setPub] = useState([])
    const getPub = useCallback(() => {
        pubAPI.get()
            .then((pubs) => {
                setPub(pubs)
            })
            .catch(error => { })
    }, [])

    useEffect(() => {
        getPub()
    }, [ getPub ])

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
                data={pub}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}
