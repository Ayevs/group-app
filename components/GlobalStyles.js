import { StyleSheet, Platform, StatusBar } from "react-native-web";
export default StyleSheet.create({
    view: {
        padding: 10,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        margin: 20,
        marginTop: -8,
        borderRadius: 5,
    },
    img: {
        width: "95%",
        aspectRatio: 1,
        backgroundColor: "#071215",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "transparent",
        margin: 5,
    },
    imageView: {
        flex: 1,
        flexDirection: "column",
        margin: 0,
        justifyContent: "space-between",
        alignContent: "center",
    },
    background: {
        backgroundColor: "#1b2838",
    },
    list: {},
});
