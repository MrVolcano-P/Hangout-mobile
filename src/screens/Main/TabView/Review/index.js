import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-elements'
import styles from './styles'

import moment from 'moment'
import CardView from 'react-native-cardview';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { dateTime } from 'src/helpers/text'
import Spinner from 'react-native-spinkit'
import reviewAPI from 'src/api/review'

function Item({ item }) {
    return (
        <View style={styles.item}>
            <CardView
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={5}>
                <View style={{ flex: 1 }}>
                    <View style={styles.headReview}>
                        <View style={{ flex: 1 }}>
                            <Image
                                style={styles.imgProfile}
                                resizeMode="contain"
                                source={{ uri: item.profile.img }}
                            />
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text>{item.profile.username}</Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={{ textAlign: "right", marginRight: 10 }} >{moment(parseInt(item.date)).startOf('seconds').fromNow()}</Text>
                        </View>
                    </View>
                    <View style={styles.hr} />
                    <View style={styles.contentReview}>
                        <View style={{ flex: 1 }}>

                        </View>
                        <View style={{ flex: 4 }}>
                            <Text >{item.text}</Text>
                        </View>
                    </View>
                </View>
            </CardView>
        </View>
    );
}

export default Review = (props) => {
    const navigation = useNavigation()
    const pub = useSelector(state => state.pub)
    const [review, setReview] = useState([])
    const [loading, setLoading] = useState(true)
    const getReview = useCallback(() => {
        console.log('fetch')
        reviewAPI.get()
            .then((reviews) => {
                setReview(reviews)
                setLoading(false)
            })
            .catch(error => { })
    }, [])

    reviewFilter = review.filter(data => data.pubID === pub.id)

    useEffect(() => {
        getReview()
    }, [getReview, navigation])

    return (
        <>
            {loading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F1F0' }}>
                    <Spinner color="#321069" type="9CubeGrid" />
                </View>
                :
                <View style={{ flex: 1, }}>
                    <FlatList
                        data={reviewFilter.reverse()}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={item => item.id}
                        refreshing={reviewFilter.networkStatus === 4}
                        onRefresh={() => getReview()}
                    />
                </View>
            }
        </>
    )
}
