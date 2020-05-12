import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-elements'
import styles from './styles'
import reviewAPI from 'src/api/review'
import moment from 'moment'
import CardView from 'react-native-cardview';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'
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
    const pub = useSelector(state => state.pub)
    const [review, setReview] = useState([])
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState('')
    const [isLoadingAddReview, setIsLoadingAddReview] = useState(false)
    const [profile, setProfile] = useState({
        username: 'Boy',
        img: "http://cdn30.us1.fansshare.com/image/loverwallpapers/love-paint-wide-950279070.jpg"
    })
    const getReview = useCallback(() => {
        reviewAPI.get()
            .then((reviews) => {
                setReview(reviews)
            })
            .catch(error => { })
    }, [])
    const addReview = useCallback(() => {
        if (text) {
            const unixDate = new Date().getTime()
            setIsLoadingAddReview(true)
            reviewAPI.add(text, profile, pub.id, unixDate.toString())
                .then(() => {
                    console.log('success')
                    setVisible(false)
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setIsLoadingAddReview(false)
                    setText('')
                })
        }
    }, [text])
    useEffect(() => {
        getReview()
    }, [getReview, addReview])
    console.log('review', review)
    reviewFilter = review.filter(data => data.pubID === pub.id)
    return (
        <>
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Button title='Add Review' onPress={() => setVisible(true)} />
                </View>
                <View style={{ flex: 5 }}>
                    <FlatList
                        data={reviewFilter}
                        renderItem={({ item }) => <Item item={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            <Modal isVisible={visible}
                backdropColor='rgba(255, 253, 253, 0.5)'
                backdropOpacity={2}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <View style={styles.modalTop}>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={{ flex: 1 }}></View>
                                <View style={{ flex: 4, alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={styles.modaltitle}>Add Review</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'baseline', justifyContent: 'center', }}>
                                    <TouchableOpacity onPress={() => setVisible(false)}>
                                        <Icon name="times" size={30} color="#000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.formContainer}>
                            <TextInput
                                label="Text"
                                mode="outlined"
                                style={styles.input}
                                value={text}
                                onChangeText={setText}
                                multiline
                                maxLength={123}
                            />
                            <View style={styles.textLength}>
                                {text.length === 123 ?
                                    <Text style={{ color: 'red' }}>
                                        {text.length}/123
                                    </Text> :
                                    <Text >
                                        {text.length}/123
                                    </Text>
                                }

                            </View>

                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
                            <Button
                                title="Add"
                                onPress={addReview}
                                loading={isLoadingAddReview}
                            />
                        </View>
                    </View>

                </View>
            </Modal>
        </>
    )
}
