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
import { SliderBox } from "react-native-image-slider-box";
import { Feather } from "@expo/vector-icons";
import SecondHeader from "../components/SecondHeader";
import SwitchSelector from "react-native-switch-selector";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HOME_SCREEN } from "../config/config";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/Actions";
import { GetHomeData } from "../config/api";
const width = Dimensions.get("screen").width / 2.5;
var height = Dimensions.get("screen").height;

export default function HomeScreen({ navigation }) {
  const [locationPressed, isLocationPressed] = useState(false);
  const [servicePressed, isServicePressed] = useState(false);
  const [accessToken, setAccessToken] = useState({});
  const dispatcher = useDispatch();
  const [isHome, setIsHome] = useState(true);
  const options = [
    { label: "Handy Man", value: "1" },
    { label: "Person Care", value: "2" },
  ];
  const [officeList, setOfficeList] = useState([]);
  const [homeList, setHomeList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [subServicesList, setSubServicesList] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // getData().then((accessObject) => {
    //   setAccessToken(accessObject.token);
    // });
    getHomeScreenData(3);
  }, []);
  const ServiceItem = ({ item }) => (
    <TouchableOpacity
      style={{ justifyContent: "center", alignItems: "center" }}
      onPress={() =>
        navigation.navigate("SubServiceList", { ServiceName: item.Name })
      }
    >
      <View style={styles.service_list_container}>
        <Image source={{ uri: item.Icon }} style={{ height: 58, width: 58 }} />
      </View>
      <Text
        style={{
          // ...styles.service_text,
          color: "#000000",
          fontSize: 12,
          fontWeight: "400",
        }}
      >
        {item.Name}
      </Text>
    </TouchableOpacity>
  );
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
        <Text style={styles.service_price}>{"$" + item.Rate}</Text>
      </View>
      <TouchableOpacity
        style={styles.cart_icon}
        onPress={() => addToCart(item)}
      >
        <Feather name="shopping-cart" size={24} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  const addToCart = async (value) => {
    value["subtotal"] = value.price;
    value["quantity"] = 1;

    dispatcher(addItemToCart(value));

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
  const getHomeScreenData = (id) => {
    GetHomeData(id)
      .then((response) => {
        var sliderImages = [];
        for (var i = 0; i < response.Sliders.length; i++) {
          sliderImages.push(response.Sliders[i].SliderPath);
        }

        console.log("Images", sliderImages);
        setSubServicesList(response.Featured);
        setServicesList(response.Services);
        setImages(sliderImages);
      })
      .catch((error) => console.log("error", error));
  };
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
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.slider}>
          <SliderBox
            images={images}
            ImageComponentStyle={{
              width: "95%",
              height: "100%",
              // ...styles.image,
            }}
            autoplay={true}
          />
        </View>
        <Text
          style={{
            marginVertical: 15,
            marginHorizontal: 20,
            fontWeight: "600",
          }}
        >
          Services we offer
        </Text>
        <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
          <FlatList
            data={servicesList}
            renderItem={renderServiceList}
            keyExtractor={(item) => item.Id}
            numColumns={4}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </View>
        <Text
          style={{
            marginVertical: 15,
            marginHorizontal: 20,
            fontWeight: "600",
          }}
        >
          Get the best from us
        </Text>
        <ScrollView style={{ marginHorizontal: 10 }}>
          <FlatList
            data={subServicesList}
            renderItem={renderSubServiceList}
            keyExtractor={(item) => item.Id}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        </ScrollView>
      </ScrollView>
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
  slider: {
    // width: width / 1.1,
    height: height / 4,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
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
    borderWidth: 0.5,
    borderColor: "#cdcdcd",
    height: 210,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 7.5,
  },
  text_container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 8,
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
    top: 125,
    right: -10,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#007AAF",
  },
});
