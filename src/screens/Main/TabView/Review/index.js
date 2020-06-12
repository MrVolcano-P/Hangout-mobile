import React, { useCallback, useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import styles from './styles'
import moment from 'moment'
import { useSelector } from 'react-redux'
import {  useNavigation } from '@react-navigation/native'
import Spinner from 'react-native-spinkit'
import reviewAPI from 'src/api/review'
import {
    Avatar,
    Card,
    Text,
} from '@ui-kitten/components';
function Item({ item }) {
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
        reviewAPI.get(pub.id)
            .then(res => {
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
