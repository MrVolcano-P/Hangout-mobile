import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
    // container: {
    //     flex: 4,
    //     // ...StyleSheet.absoluteFillObject,
    //     justifyContent: 'flex-end',
    //     alignItems: 'center',
    // },
    // map: {
    //     ...StyleSheet.absoluteFillObject,
    // },
    container: {
        display: "flex",
        flex: 1,
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width
    },
    map: {
        flex: 1
    },
    mapMarkerContainer: {
        left: '47%',
        position: 'absolute',
        top: '42%'
    },
    mapMarker: {
        fontSize: 40,
        color: "red"
    },
    deatilSection: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        display: "flex",
        // justifyContent: "flex-start"
    },
    spinnerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    btnContainer: {
        flex: 1
    }, btn: {
        backgroundColor: '#321069',
    }
});