import React from 'react'
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
import CardView from 'react-native-cardview';

const DATA = [
    {
        id: '1',
        title: 'ใจเหงาๆ',
        member: [{ username: 'boy' }, { username: 'poom' }],
        amount: '5'

    },
    {
        id: '2',
        title: 'โซน U คับ',
        member: [{ username: 'boy' }, { username: 'poom' }, { username: 'boy' }, { username: 'boy' },
        { username: 'boy' }, { username: 'boy' },
        ],
        amount: '12'
    },
    {
        id: '3',
        title: 'ตี้สาวโสด',
        member: [{ username: 'boy' },],
        amount: '7'
    },
    {
        id: '4',
        title: 'หาสาวโสดนั่งเล่นกันครับ',
        member: [{ username: 'boy' }],
        amount: '2'
    },
];



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
                    <View style={styles.content}>
                        <View style={{ flex: 0.5,borderRightColor:'black',borderRightWidth:2,alignItems:'center' }}>
                            <Text style={styles.title}>{item.member.length}/{item.amount}</Text>
                        </View>
                        <View style={{ flex: 3,marginLeft:10 }}>
                            <Text style={styles.title}>{item.title}</Text>
                        </View>
                    </View>
                </CardView>
            </View>
        </TouchableOpacity>


    );
}
export default Party = () => {
    return (
        <>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.id}
            />
        </>
    )
}
