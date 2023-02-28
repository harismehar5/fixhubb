import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import Slideshow from "react-native-image-slider-show";
import { Feather } from "@expo/vector-icons";
import SecondHeader from "../components/SecondHeader";
import SwitchSelector from "react-native-switch-selector";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HOME_SCREEN } from "../config/config";

const width = Dimensions.get("screen").width / 2.5;

export default function HomeScreen({ navigation }) {
  const [locationPressed, isLocationPressed] = useState(false);
  const [servicePressed, isServicePressed] = useState(false);
  const [accessToken, setAccessToken] = useState({});

  const [isHome, setIsHome] = useState(true);
  const options = [
    { label: "Home", value: "1" },
    { label: "Office", value: "2" },
  ];
  const [officeList, setOfficeList] = useState([]);
  const [homeList, setHomeList] = useState([]);
  const [subServicesList, setSubServicesList] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getData().then((accessObject) => {
      setAccessToken(accessObject.token);
      getHomeScreenData(accessObject.token);
    });
  }, []);
  const ServiceItem = ({ item }) => (
    <TouchableOpacity
      style={{ justifyContent: "center", alignItems: "center" }}
      onPress={() => navigation.navigate("SubServiceList")}
    >
      <View style={styles.service_list_container}>
        <Image source={{ uri: item.image }} style={{ height: 42, width: 42 }} />
      </View>
      <Text
        style={{
          // ...styles.service_text,
          color: "#000000",
          fontSize: 12,
          fontWeight: "400",
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  const SubServiceItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => {
      navigation.navigate("ServiceDetails")
    }}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.text_container}>
        <Text style={styles.service_name}>{item.name}</Text>
        <Text style={styles.service_price}>{"$" + item.price}</Text>
      </View>
      {/* <Text style={styles.service_desc} numberOfLines={2} ellipsizeMode="tail">
        {item.description}
      </Text> */}
      <TouchableOpacity
        style={styles.cart_icon}
        onPress={() => addToCart(item)}
      >
        <Feather name="shopping-cart" size={24} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  const addToCart = async (value) => {
    console.log("value", value);
    await AsyncStorage.removeItem('@cart')
    // try {
    //   const jsonCartValue = await AsyncStorage.getItem("@cart");
    //   jsonCartValue != null ? JSON.parse(jsonCartValue) : null;
    //   const cartValue = [];
    //   if (jsonCartValue !== null) {
    //     var cartArray = [];
    //     cartArray.push(value)
    //     cartValue = JSON.stringify(cartArray);
    //     console.log("Cart Value", typeof cartValue);
    //     await AsyncStorage.setItem("@cart", cartValue);
    //   } else {
    //     console.log("Cart Value", typeof cartValue);
    //     for (var i = 0; i < jsonCartValue.length; i++) {
    //       if (jsonCartValue[i].service_id === value.service_id) {
    //         console.log("already existed");
    //       } else {
    //         var cartArray = [];
    //         cartValue = JSON.stringify(cartArray.push(value));
    //         await AsyncStorage.setItem("@cart", cartValue);
    //       }
    //     }
    //   }
    // } catch (error) {
    //   // error reading value
    //   Toast.show({
    //     type: "error",
    //     text1: "Error",
    //     text2: error.toString(),
    //   });
    //   console.log(error);
    // }
  };
  const renderServiceList = ({ item }) => <ServiceItem item={item} />;
  const renderSubServiceList = ({ item }) => <SubServiceItem item={item} />;
  const getHomeScreenData = (token) => {
    axios
      .get(HOME_SCREEN + "1", {
        headers: {
          "x-api-key": "sd4fji2378gi3urg",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        var sliderArray = [];
        var homeServicesArray = [];
        var officeServicesArray = [];
        var featuredSubServiceArray = [];
        for (var i = 0; i < response.data.promotions.length; i++) {
          sliderArray.push({ url: response.data.promotions[i].image });
        }
        for (var k = 0; k < response.data.services.length; k++) {
          if (response.data.services[k].service.service_type === 1) {
            // 1 is for home
            homeServicesArray.push({
              id: response.data.services[k].id,
              name: response.data.services[k].service.name,
              image: response.data.services[k].service.icon,
              franchise_id: response.data.services[k].franchise,
            });
          } else if (response.data.services[k].service.service_type === 2) {
            // 2 is for office
            officeServicesArray.push({
              id: response.data.services[k].id,
              name: response.data.services[k].service.name,
              image: response.data.services[k].service.icon,
              franchise_id: response.data.services[k].franchise,
            });
          }
        }
        for (var j = 0; j < response.data.featured_sub_services.length; j++) {
          featuredSubServiceArray.push({
            id: response.data.featured_sub_services[j].id,
            name: response.data.featured_sub_services[j].franchise_sub_service
              .name,
            image:
              response.data.featured_sub_services[j].franchise_sub_service.icon,
            description:
              response.data.featured_sub_services[j].franchise_sub_service
                .description,
            price: response.data.featured_sub_services[j].price,
            service_id:
              response.data.featured_sub_services[j].franchise_sub_service
                .service,
          });
        }
        setHomeList(homeServicesArray);
        setOfficeList(officeServicesArray);
        setSubServicesList(featuredSubServiceArray);
        setImages(sliderArray);
      })
      .catch((error) => console.log(error));
  };
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
  return (
    <SafeAreaView style={styles.container}>
      {/* <SecondHeader></SecondHeader> */}
      <Slideshow dataSource={images} />
      <SwitchSelector
        options={options}
        initial={0}
        onPress={(value) => setIsHome(!isHome)}
        style={{ marginVertical: 10, marginHorizontal: 20 }}
        buttonColor={"#007AAF"}
        borderColor={"#cdcdcd"}
      />
      {/* <Text
        style={{ marginVertical: 8, marginHorizontal: 20, fontWeight: "600" }}
      >
        Featured Services
      </Text> */}
      {/* <View style={styles.location_container}>
        <TouchableOpacity
          style={{
            ...styles.location_inner_container,
            backgroundColor: locationPressed ? "#ffffff" : "#F5AC30",
          }}
        >
          <Text
            style={{
              ...styles.location_text,
              color: locationPressed ? "#000000" : "#ffffff",
            }}
          >
            Home
          </Text>
        </TouchableOpacity>
        <Entypo name="location" size={24} color="white" />
        <TouchableOpacity
          style={{
            ...styles.location_inner_container,
            backgroundColor: !locationPressed ? "#ffffff" : "#F5AC30",
          }}
        >
          <Text
            style={{
              ...styles.location_text,
              color: !locationPressed ? "#000000" : "#ffffff",
            }}
          >
            Office
          </Text>
        </TouchableOpacity>
      </View> */}
      {/* <View style={styles.service_type_container}>
        <TouchableOpacity
          style={{
            ...styles.service_inner_container,
            backgroundColor: servicePressed ? "#ffffff" : "#F5AC30",
          }}
        >
          <FontAwesome5 name="people-arrows" size={24} color="white" />
          <Text
            style={{
              ...styles.service_text,
              color: "#ffffff",
            }}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.service_inner_container,
            backgroundColor: !servicePressed ? "#007AAF" : "#F5AC30",
          }}
        >
          <AntDesign name="heart" size={24} color={"#ffffff"} />
          <Text
            style={{
              ...styles.service_text,
              color: "#ffffff",
            }}
          >
            Office
          </Text>
        </TouchableOpacity>
      </View> */}
      <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
        <FlatList
          data={isHome ? homeList : officeList}
          renderItem={renderServiceList}
          keyExtractor={(item) => item.id}
          numColumns={4}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      </View>
      <Text
        style={{ marginVertical: 15, marginHorizontal: 20, fontWeight: "600" }}
      >
        Get the best from us
      </Text>
      <ScrollView style={{ marginHorizontal: 10 }}>
        <FlatList
          data={subServicesList}
          renderItem={renderSubServiceList}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </ScrollView>
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
  location_container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: Dimensions.get("window").height / 12,
    backgroundColor: "#007AAF",
    marginHorizontal: 10,
    borderRadius: 15,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  location_inner_container: {
    width: "40%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  location_text: {
    fontWeight: "bold",
  },
  service_type_container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: Dimensions.get("window").height / 5,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
  },
  service_inner_container: {
    width: "48%",
    height: "95%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginHorizontal: 5,
  },
  service_text: {
    fontWeight: "bold",
  },
  service_list_container: {
    height: 70,
    width: 70,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#F1F6FB",
    // borderRadius: 35,
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
    width: width,
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
