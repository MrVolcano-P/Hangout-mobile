import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-elements'
import styles from './styles'
import reviewAPI from 'src/api/review'
import moment from 'moment'
import CardView from 'react-native-cardview';

function Item({ item }) {
    console.log(item)
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
                        <View style={{ flex: 3 }}>
                            <Text>{item.profile.username}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ marginHorizontal: 10, }}>{moment(parseInt(item.date)).format('DD-MM')}</Text>
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
    const [item, setItem] = useState(props.nowData)
    const [review, setReview] = useState([])
    const getReview = useCallback(() => {
        reviewAPI.get()
            .then((reviews) => {
                setReview(reviews)
            })
            .catch(error => { })
    }, [])

    useEffect(() => {
        getReview()
    }, [getReview])
    console.log('review', review)
    reviewFilter = review.filter(data => data.pubID === item.id)
    return (
        <>
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Button title='Add Review' onPress={() => console.log('add review')} />
                </View>
                <View style={{ flex: 5 }}>
                    <FlatList
                        data={reviewFilter}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </>
    )
}
