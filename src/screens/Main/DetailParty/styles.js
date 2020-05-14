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
    },
    chat:{
        flex:1,
        margin:20
    },
    headChat:{
        flex:1,
        backgroundColor: '#464646',
        alignItems:'center',
        justifyContent: 'center',
    },
    headChatText:{
        fontSize: 18,
        color: '#fff',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: '#000',
        fontFamily: 'System',
    },
    chatContent:{
        flex:7,
        backgroundColor:'rgba(255, 253, 253, 0.5)'
    },
})
