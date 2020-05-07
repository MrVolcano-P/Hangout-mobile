import { StyleSheet } from "react-native"

export default StyleSheet.create({
    contentTitle: {
        fontFamily: 'Roboto',
        // color: 'white',
        fontSize: 26,
        color: '#fff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textShadowColor: '#000',
        fontFamily: 'System'
        // height:40
    },content: {
        flex: 1,
        width: '100%',
        flexDirection: 'row'
    },
    contentView1: {
        flex: 0.5,
        borderRightColor: 'black',
        borderRightWidth: 2,
        alignItems: 'center',
        backgroundColor:'#464646',
        justifyContent: 'center',
        height:'100%'
    },
    contentView2: {
        flex: 3,
        backgroundColor:'#8A93E2',
        justifyContent: 'center',
        height:'100%'
    },title: {
        fontSize: 20,
        color: '#fff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textShadowColor: '#000',
        fontFamily: 'System',
    },title2:{
        fontSize: 20,
        color: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textShadowColor: '#fff',
        fontFamily: 'System',
        marginLeft: 10,
        textAlign:'center'
    },title3: {
        fontSize: 20,
        color: '#fff',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        textShadowColor: '#000',
        fontFamily: 'System',
    }
})