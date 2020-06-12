import React, { useCallback, useState, useEffect } from 'react'
import { View, FlatList, Image, TouchableOpacity } from 'react-native'
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
import {
    Avatar,
    Card,
    CardHeaderElement,
    List,
    ListProps,
    Text,
} from '@ui-kitten/components';
function Item({ item }) {
    console.log(item)
    const Header = (props) => (
        <View {...props} style={styles.commentHeader}>
            <Avatar shape='square' source={item.user.image === "" ? require('src/assets/no-avatar.jpg') : { uri: item.user.image }} />
            <View style={styles.commentAuthorContainer}>
                <Text category='s2'>{item.user.name}</Text>
                <Text appearance='hint' category='c1'>{moment(item.date).startOf('seconds').fromNow()}</Text>
            </View>
        </View>
    );
    return (
        <View style={styles.item}>
            <Card style={styles.commentItem} header={Header}>
                <Text>{item.text}</Text>
            </Card>
        </View>

    )
}

export default Review = (props) => {
    const navigation = useNavigation()
    const pub = useSelector(state => state.pub)
    const [review, setReview] = useState([])
    const [loading, setLoading] = useState(true)
    const getReview = useCallback(() => {
        console.log('fetch')
        reviewAPI.get(pub.id)
            .then(res => {
                // console.log(res)
                setReview(res)
                setLoading(false)
            })
            .catch(error => { })
    }, [])

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
                <>
                    {
                        review.length === 0 ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <Text>No Review</Text>
                            </View>
                            :
                            <View style={{ flex: 1, }}>
                                <FlatList
                                    data={review.reverse()}
                                    renderItem={({ item }) => <Item item={item} />}
                                    keyExtractor={item => item.id}
                                    refreshing={review.networkStatus === 4}
                                    onRefresh={() => getReview()}
                                />
                            </View>
                    }
                </>
            }
        </>
    )
}
