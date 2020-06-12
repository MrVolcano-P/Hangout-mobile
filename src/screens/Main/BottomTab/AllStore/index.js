import React, { useMemo, useCallback, useEffect, useState } from 'react'
import { FlatList, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { Chip } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Avatar } from 'react-native-paper'
import { fundComma, dateTime } from 'src/helpers/text'
import { Appbar, Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardView from 'react-native-cardview';
import pubAPI from 'src/api/pub'
import { setPub } from 'src/actions/pub'
import SearchInput, { createFilter } from 'react-native-search-filter';
import Spinner from 'react-native-spinkit'

const KEYS_TO_FILTERS = ['title'];

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

function Item({ item }) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const image = { uri: item.image }
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                dispatch(setPub(item))
                navigation.navigate('Detail')

            }}
        >
            <View style={styles.item}>
                <CardView
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={5}
                    style={styles.cardViewStyle}>
                    <ImageBackground source={image} style={styles.image}>
                        <Text style={styles.title}>{item.name}</Text>
                    </ImageBackground>
                </CardView>
            </View>
        </TouchableOpacity>


    );
}

export default function AllStore() {
    const [pub, setPub] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)
    const getPub = useCallback(() => {
        console.log('fetch')
        pubAPI.get()
            .then(res => {
                setPub(res)
                // console.log(res)
                setLoading(false)
            })
            .catch(error => { })
    }, [])

    useEffect(() => {
        getPub()
    }, [getPub])

    useFocusEffect(
        React.useCallback(() => {
            getPub();
        }, [getPub])
    );

    return (
        <>
            <SafeAreaView >
                <Appbar.Header>
                    <ContentTitle title={'Yark Hangout'} style={styles.contentTitle} />
                </Appbar.Header>
            </SafeAreaView>
            {loading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F1F0' }}>
                    <Spinner color="#321069" type="9CubeGrid" />
                </View>
                :
                <View style={styles.container}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={setSearchTerm}
                        value={searchTerm}
                        style={styles.searchbar}
                    />
                    <FlatList
                        data={searchTerm === '' ? pub : pub.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={item => item.id}
                        refreshing={pub.networkStatus === 4}
                        onRefresh={() => getPub()}
                    />
                </View>
            }
        </>
    )
}
