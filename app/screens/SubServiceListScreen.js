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
import { GET_SUB_SERVICES } from "../config/config";

const height = Dimensions.get("window").height / 4.5;
// const width = Dimensions.get("screen").width / 2.2;

export default function SubServiceListScreen({ navigation }) {
  const [subServiceList, setSubServiceList] = useState([]);
  const [accessToken, setAccessToken] = useState({});

  useEffect(() => {
    getData().then((accessObject) => {
      setAccessToken(accessObject.token);
      getSubServices(accessObject.token);
    });
  }, []);
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@access_Key");
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
  const getSubServices = (token) => {
    axios
      .get(GET_SUB_SERVICES + "?franchise=1&service=2", {
        headers: {
          "x-api-key": "sd4fji2378gi3urg",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        var subServicesArray = [];
        for (var i = 0; i < response.data.length; i++) {
          subServicesArray.push({
            id: response.data[i].id,
            name: response.data[i].franchise_sub_service.name,
            image: response.data[i].franchise_sub_service.icon,
            description: response.data[i].franchise_sub_service.description,
            price: response.data[i].price,
          });
        }
        setSubServiceList(subServicesArray);
      })
      .catch((error) => console.log(error));
  };
  const SubServiceItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => console.log("hello")}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.text_container}>
        <Text style={styles.service_name}>{item.name}</Text>
        <Text style={styles.service_price}>{"$" + item.price}</Text>
      </View>
      {/* <Text style={styles.service_desc} numberOfLines={2} ellipsizeMode="tail">
        {item.description}
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
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#007AAF",
          color: "#ffffff",
          flexDirection: "row",
        }}
      >
        <Text style={styles.name_text}>Sub Services</Text>
      </View>

      <FlatList
        data={subServiceList}
        renderItem={renderSubServiceList}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between", marginHorizontal:10 }}
      />
      <TouchableOpacity
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
      </TouchableOpacity>
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
