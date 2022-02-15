import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Header, Icon } from 'react-native-elements'
import { RFValue } from "react-native-responsive-fontsize";
import axios from 'axios'

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            articleDetails: {}
        }
    }
    getArticles = () => {
        const url = 'http://localhost:5000/get-articles'
        axios.get(url)
            .then(response => {
                let details = response.data.data
                details['timestamp'] = this.timeConvert(details.timestamp)
                this.setState({
                    articleDetails: details
                })
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    timeConvert = (num) => {
        var hours = Math.floor(num / 60)
        var minutes = num % 60
        return `${hours} hrs ${minutes} mins`
    }
    likedArticles = () => {
        const url = 'http://localhost:5000/liked-articles'
        axios.post(url)
            .then(response => {
                this.getArticles()
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    unlikedArticles = () => {
        const url = 'http://localhost:5000/unliked-articles'
        axios.post(url)
            .then(response => {
                this.getArticles()
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    componentDidMount() {
        this.getArticles()
    }
    render() {
        const { articleDetails } = this.state
        if (articleDetails.url) {
            const { url, title, timestamp, text } = articleDetails;
            return (
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <Header
                            centerComponent={{ text: "article Recommended", style: styles.headerTitle }}
                            rightComponent={{ icon: "search", color: "#fff" }}
                            backgroundColor={"#d500f9"}
                            containerStyle={{ flex: 1 }}
                        />
                    </View>
                    <View style={styles.subContainer}>
                        <View style={styles.subTopContainer}>
                            <Image style={styles.posterImage} source={{ uri: url }} />
                        </View>
                        <View style={styles.subBottomContainer}>
                            <View style={styles.upperBottomContainer}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.subtitle}>
                                    {timestamp}
                                </Text>
                            </View>
                            <View style={styles.middleBottomContainer}>
                                <View style={{ flex: 0.7, padding: 15 }}>
                                    <Text style={styles.text}>
                                        {text}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.lowerBottomContainer}>
                                <View style={styles.iconButtonContainer}>
                                    <TouchableOpacity onPress={this.likedarticles}>
                                        <Icon reverse name={"check"} type={"entypo"} size={RFValue(30)} color={"#76ff03"} />
                                    </TouchableOpacity> <TouchableOpacity onPress={this.unlikedarticles}>
                                        <Icon reverse name={"cross"} type={"entypo"} size={RFValue(30)} color={"#ff1744"} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
        return null
    }
}
const styles = StyleSheet.create({
    container: { flex: 1 },
    headerContainer: { flex: 0.1 },
    headerTitle: { color: "#fff", fontWeight: "bold", fontSize: RFValue(18) }, subContainer: { flex: 0.9 }, subTopContainer: { flex: 0.4, justifyContent: "center", alignItems: "center" }, posterImage: { width: "60%", height: "90%", resizeMode: "stretch", borderRadius: RFValue(30), marginHorizontal: RFValue(10) }, subBottomContainer: { flex: 0.6 }, upperBottomContainer: { flex: 0.2, alignItems: "center" }, title: { fontSize: RFValue(20), fontWeight: "bold", textAlign: "center" },
    subtitle: { fontSize: RFValue(14), fontWeight: "300" }, middleBottomContainer: { flex: 0.35 }, text: { fontSize: RFValue(13), textAlign: "center", fontWeight: "300", color: "gray" }, lowerBottomContainer: { flex: 0.45 }, iconButtonContainer: { flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }, buttonCotainer: { justifyContent: "center", alignItems: "center" }, button: { width: RFValue(160), height: RFValue(50), borderRadius: RFValue(20), justifyContent: "center", alignItems: "center", borderWidth: 1, marginTop: RFValue(15) }, buttonText: { fontSize: RFValue(15), fontWeight: "bold" }
});