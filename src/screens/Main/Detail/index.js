import React, { useState, useRef, useCallback, useEffect } from 'react'
import { View, Text, Image, ImageBackground, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Searchbar, TextInput } from 'react-native-paper';
import styles from './styles'
import { Button } from 'react-native-elements'
import Party from '../TabView/Party'
import Review from '../TabView/Review'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import partyAPI from 'src/api/party'
import reviewAPI from 'src/api/review'

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

const initialLayout = { width: Dimensions.get('window').width };


export default Detail = (props) => {
    const pub = useSelector(state => state.pub)
    const image = { uri: pub.pic }
    const token = useSelector(state => state.authToken)
    const [index, setIndex] = React.useState(0);
    const [party, setParty] = useState([])
    const [review, setReview] = useState([])
    const navigation = useNavigation()
    const [routes] = React.useState([
        { key: 'first', title: 'Party' },
        { key: 'second', title: 'Review' },
    ]);
    const PartyRoute = () => (
        <Party party={party} />
    );
    const ReviewRoute = () => (
        <Review review={review} />
    )
    const renderScene = SceneMap({
        first: PartyRoute,
        second: ReviewRoute,
    });

    const getParty = useCallback(() => {
        partyAPI.get()
            .then((parties) => {
                setParty(parties)
            })
            .catch(error => { })
    }, [])

    const getReview = useCallback(() => {
        reviewAPI.get()
            .then((reviews) => {
                setReview(reviews)
            })
            .catch(error => { })
    }, [])
    const BtnNavigate = ({ index }) => {
        if (index === 0) {
            return <Appbar.Action icon="plus" color='white' onPress={() => {
                if (token === null) {
                    alert('Login First')
                    navigation.navigate('Login')
                } else {
                    navigation.navigate('AddParty', { pubNow: pub, dis: true })
                }
            }
            } />
        } else if (index === 1) {
            return <Appbar.Action icon="plus" color='white' onPress={() => {
                if (token === null) {
                    alert('Login First')
                    navigation.navigate('Login')
                } else {
                    navigation.navigate('AddReview')
                }
            }}
            />
        }
    }

    useEffect(() => {
        getParty()
        getReview()
    }, [getParty, getReview])

    useFocusEffect(
        React.useCallback(() => {
            getParty();
            getReview();
        }, [getParty, getReview])
    );

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#F2F1F0' }}
            style={{ backgroundColor: '#321069' }}
        />
    );

    return (
        <>
            <SafeAreaView style={styles.contentContaier}>
                <Appbar.Header>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack()}
                    />
                    <ContentTitle title={pub.title} style={styles.contentTitle} />
                    <BtnNavigate index={index} />
                </Appbar.Header>
            </SafeAreaView>
            <View style={styles.container}>
                <View style={styles.imgview}>
                    <ImageBackground source={image}
                        style={styles.img} />
                </View>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    style={styles.tabViewContainer}
                    lazy={true}
                // tabBarPosition='bottom'
                />
            </View>
        </>
    )
}
