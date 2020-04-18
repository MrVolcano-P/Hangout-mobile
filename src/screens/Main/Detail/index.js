import React, { useState } from 'react'
import { View, Text, Image, ImageBackground, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Searchbar } from 'react-native-paper';
import styles from './styles'
import { ScrollableTabView, ScrollableTabBar } from '@valdio/react-native-scrollable-tabview'
import Party from '../TabView/Party'
import Review from '../TabView/Review'
import { TabView, SceneMap } from 'react-native-tab-view';

const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

const initialLayout = { width: Dimensions.get('window').width };

export default Detail = (props) => {
    const [item, setItem] = useState(props.route.params.item)
    console.log(item)
    const image = { uri: item.pic }
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Party' },
        { key: 'second', title: 'Review' },
    ]);

    const renderScene = SceneMap({
        first: Party,
        second: Review,
    });
    return (
        <>
            <SafeAreaView>
                <Appbar.Header>
                    <ContentTitle title={item.title} style={styles.contentTitle} />
                </Appbar.Header>
            </SafeAreaView>
            <View style={styles.imgview}>
                <ImageBackground source={image}
                    style={styles.img} />
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                style={styles.container}
            />
        </>

    )
}
