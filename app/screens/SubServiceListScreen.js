import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import SecondHeader from "../components/SecondHeader";
import SmallButton from "../components/SmallButton";

import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Get_SubServices_by_Service_ID } from "../config/api";

const height = Dimensions.get("window").height / 4.5;
// const width = Dimensions.get("screen").width / 2.2;

export default function SubServiceListScreen({ navigation, route }) {
  const [subServiceList, setSubServiceList] = useState([]);
  const [accessToken, setAccessToken] = useState({});

  useEffect(() => {
    // getData().then((accessObject) => {
    //   setAccessToken(accessObject.token);
    // });
    getSubServices(10);
  }, []);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@access_Key");
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.toString(),
      });
      console.log(e.toString());
    }
  };
  const getSubServices = (id) => {
    Get_SubServices_by_Service_ID(id)
      .then((response) => {
        setSubServiceList(response);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.toString(),
        });
      });
  };
  const SubServiceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate("ServiceDetails", {
          ProductImage: item.Image,
          ProductName: item.Name,
          ProductPrice: item.Rate,
          ProductDescription: item.Description,
          ProductId: item.Id,
        });
      }}
    >
      <Image style={styles.image} source={{ uri: item.Image }} />
      <View style={styles.text_container}>
        <Text style={styles.service_name}>{item.Name}</Text>
        <Text style={styles.service_price}>{item.Rate + " RS"}</Text>
      </View>
      {/* <Text style={styles.service_desc} numberOfLines={2} ellipsizeMode="tail">
        {item.Description}
      </Text> */}
      <View style={styles.cart_icon}>
        <Feather name="shopping-cart" size={24} color="white" />
      </View>
    </TouchableOpacity>
  );
  const renderSubServiceList = ({ item }) => <SubServiceItem item={item} />;
  return (
    <SafeAreaView style={styles.container}>
      {/* <SecondHeader></SecondHeader> */}
      <View
        style={{
          width: "100%",
          height: 60,
          marginBottom: 10,
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "#007AAF",
          color: "#ffffff",
          // flexDirection: "row",
        }}
      >
        <Text style={styles.name_text}>{route.params.ServiceName}</Text>
      </View>

      <FlatList
        data={subServiceList}
        renderItem={renderSubServiceList}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      />
      {/* <TouchableOpacity
        style={styles.cart_section}
        onPress={() => navigation.navigate("Cart")}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.cart_text_section}>
            <Text>1</Text>
          </View>
          <Text style={styles.cart_text}>View Your Cart</Text>
        </View>
        <Text style={{ ...styles.cart_text }}>RS. 1500/-</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "#ffffff",
  },
  name_text: {
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: "center",
  },
  cart_section: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    height: 60,
    marginHorizontal: 20,
    backgroundColor: "#007AAF",
    // paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    color: "#ffffff",
    justifyContent: "space-between",
  },
  cart_text_section: {
    backgroundColor: "#ffffff",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  cart_text: {
    color: "#ffffff",
  },
  item: {
    width: "45%",
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 5,
    // borderWidth: 0.5,
    // borderColor: "#cdcdcd",
    height: 210,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 5,
  },
  text_container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
    paddingHorizontal: 5,
  },
  service_name: {
    fontWeight: "600",
    fontSize: 14,
  },
  service_price: {
    marginTop: 5,
  },
  service_desc: {
    color: "gray",
    width: "100%",
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  cart_icon: {
    position: "absolute",
    top: 100,
    right: -10,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#007AAF",
  },
});
