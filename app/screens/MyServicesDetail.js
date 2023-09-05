import React, { Component } from 'react';
import { StyleSheet,FlatList, Image, ImageBackground, View, Text, SafeAreaView } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

export default function MyServicesDetail({ }) {

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ backgroundColor: '#0071a1', borderBottomLeftRadius: 40 }}>
                <Text style={{ top: 30, textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: '#fff' }} >Plumber</Text>
                <View style={styles.workContainer}>
                    <View style={styles.workProgress}>
                        <Text style={{ fontSize: 60, fontWeight: 'bold', color: '#fff' }}>20</Text>
                        <Text style={{ color: '#fff' }}>PKR</Text>
                    </View>
                    <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ borderLeftWidth: 4, borderColor: '#fff', height: 80 }} />
                        <Text style={{ marginTop: 10, color: '#fff', }}>07-02-2023</Text>
                    </View>
                    <View style={styles.workProgress}>
                        {/* <Text style={{ fontSize: 60, fontWeight: 'bold', color: '#fff' }}>3</Text> */}
                        <AntDesign name="check" size={65} color="white" />
                        <Text style={{ color: '#fff' }}>In Process</Text>
                    </View>

                </View>
            </View>
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={{marginTop:10}}/>

                <FlatList
                   
                    data={[{ },{},{},{},{}]}
                    renderItem={({ item, index, separators }) => (
                        <View style={styles.workList}>
                        <Image style={{ width: 70, height: 70, borderRadius: 100 }} source={{ uri: 'https://via.placeholder.com/150' }} />
                        <View style={{ width: '75%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ marginLeft: 10, width: '80%' }}>
                                <Text>Name Name  Name Name Name Name  Name Name</Text>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#007fb2' }}>12000 <Text style={{ color: '#000' }}>x</Text> <Text style={{ color: '#f5ac30' }}>1</Text> </Text>
    
                            </View>
                            <View style={{ backgroundColor: '#0071a1', right: 10, width: 60, padding: 8, borderRadius: 20 }}>
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>12000</Text>
                            </View>
    
                        </View>
    
                    </View>
                    )}
                />
                
            </View>
            <View style={{ backgroundColor: '#f1f6fb', marginHorizontal: 10, marginBottom: 4, borderRadius: 10 }}>
                <Text style={{ fontSize: 18, color: '#0071a1', fontWeight: 'bold', textAlign: 'center' }}>Remarks about user </Text>
            </View>

        </SafeAreaView>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
        // paddingTop: StatusBar.currentHeight || 0,
    },
    workContainer: {
        flexDirection: 'row',
        marginTop: 20,

        justifyContent: 'space-around',
    },
    workProgress: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
        borderRadius: 20,

    },
    workList: {
        width: '90%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: 10,
        height: 90,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        shadowColor: '#007fb2',
        shadowOffset: { width: 20, height: 20 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        elevation: 3
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
