import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";
import { SIGN_IN } from "../config/config";
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("harismehar54455@gmail.com");

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require("../assets/background_image.png")}
                resizeMode="cover"
                style={styles.image}
            >
                <Text style={{top:30,left:30,fontSize:25,color:'#fff',fontWeight:'bold'}} >My Services</Text>
                <View style={styles.workContainer}>
                    <View style={styles.workProgress}>
                        <Text style={{ fontSize: 60, fontWeight: 'bold',color:'#007fb2' }}>20</Text>
                        <Text>Completed</Text>
                    </View>
                    <View style={styles.workProgress}>
                        <Text style={{ fontSize: 60, fontWeight: 'bold',color:'#007fb2' }}>3</Text>
                        <Text>In Process</Text>
                    </View>

                </View>
                <ScrollView style={{flex:1,backgroundColor:'#fff',marginHorizontal:10,marginTop:20,padding:10,borderTopLeftRadius:20,borderTopRightRadius:20}}>
                    <View>
                        <Text style={{textAlign:'center',fontWeight:'bold'}}>Summary</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('MyServicesDetail')} style={styles.workList}>
                            <Text style={{fontWeight:'bold'}}>Plumber</Text>
                            <View style={{marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                                <Text>Qty : 12 </Text>
                                <Text style={{fontWeight:'bold'}}>Rs : 40000 </Text>

                            </View>
                            
                            <View style={{marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                                <Text>{JSON.stringify(new Date().toString().substring(0,15))}</Text>
                                <Text style={{color:'#f5ac30',fontWeight:'bold'}}>In Progress </Text>

                            </View>
                        </TouchableOpacity>
                        <View style={styles.workList}>
                            <Text style={{fontWeight:'bold'}}>Plumber</Text>
                            <View style={{marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                                <Text>Qty : 12 </Text>
                                <Text style={{fontWeight:'bold'}}>Rs : 40000 </Text>

                            </View>
                            
                            <View style={{marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                                <Text>{JSON.stringify(new Date().toString().substring(0,15))}</Text>
                                <Text style={{color:'#f5ac30',fontWeight:'bold'}}>In Progress </Text>

                            </View>
                        </View>
                        <View style={styles.workList}>
                            <Text style={{fontWeight:'bold'}}>Plumber</Text>
                            <View style={{marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                                <Text>Qty : 12 </Text>
                                <Text style={{fontWeight:'bold'}}>Rs : 40000 </Text>

                            </View>
                            
                            <View style={{marginVertical:5,flexDirection:'row',justifyContent:'space-between'}}>
                                <Text>{JSON.stringify(new Date().toString().substring(0,15))}</Text>
                                <Text style={{color:'#f5ac30',fontWeight:'bold'}}>In Progress </Text>

                            </View>
                        </View>
                    </View>
                </ScrollView>

            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight || 0,
    },
    workContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-around',
    },
    workProgress: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        
    },
    workList:{
        width:'90%',
        alignSelf:'center',
        marginVertical:10,
        height:90,
        padding:10,
        borderRadius:5,
        backgroundColor:'#fff',
        shadowColor:'#007fb2',
        shadowOffset:{width:20,height:20},
        shadowRadius:10,
       shadowOpacity:0.1,
        elevation:3
    },
    image: {
        flex: 1,
    },
    inner_container: {
        flex: 1,
        justifyContent: "center",
    },
    forgot_style: {
        alignSelf: "flex-end",
        marginRight: 20,
    },
    continue_style: {
        marginLeft: 25,
    },
    text_style: {
        color: "#ffffff",
        marginVertical: 10,
        fontSize: 12,
    },
    center_text_style: {
        alignSelf: "center",
    },
    signup_text_style: {
        color: "#ffffff",
        marginVertical: 10,
        fontSize: 12,
        fontWeight: "bold",
    },
});
