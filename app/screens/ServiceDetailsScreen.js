import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ReviewList from "../components/ReviewList";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AddToCart, Get_SubServices_by_Service_ID } from "../config/api";

const ServiceDetailsScreen = ({ navigation, route }) => {
  const [followed, isFollowed] = useState(false);
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
  const addToCart = (id) => {
    const data = {
      Id: 0,
      Quantity: 1,
      SubServiceId: 27,
      CustomerId: 6,
    };

    AddToCart(data)
      .then((response) => {
        console.log(response);
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
      <Image style={styles.cardImage} source={{ uri: item.Image }} />
      <View style={styles.text_container}>
        <Text style={styles.service_name}>{item.Name}</Text>
        <Text style={styles.service_price}>{item.Rate + " RS"}</Text>
      </View>
      {/* <Text style={styles.service_desc} numberOfLines={2} ellipsizeMode="tail">
        {item.description}
      </Text> */}
      {/* <View style={styles.cart_icon}>
        <Feather name="shopping-cart" size={24} color="white" />
      </View> */}
    </TouchableOpacity>
  );
  const renderSubServiceList = ({ item }) => <SubServiceItem item={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: route.params.ProductImage }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{route.params.ProductName}</Text>
        <Text style={styles.price}>{route.params.ProductPrice} PKR</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {route.params.ProductDescription}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", marginLeft: 15, marginBottom: 5 }}>
          Similar Services
        </Text>
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
        {/* <ReviewList reviews={reviews} /> */}
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
          onPress={() => isFollowed(!followed)}
        >
          {followed ? (
            <AntDesign name="heart" size={24} color="#007AAF" />
          ) : (
            <AntDesign name="hearto" size={24} color="#007AAF" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addToCart();
          }}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // paddingHorizontal: 10,
    paddingTop: 20,
  },
  imageContainer: {
    height: "30%",
    flexDirection: "column",
    marginBottom: 20,
  },
  image: {
    height: "100%",
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 5,
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
  detailsContainer: {
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "7%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "gray",
  },
  descriptionContainer: {
    marginBottom: 20,
    height: "15%",
    paddingHorizontal: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007AAF",
    padding: 10,
    alignItems: "center",
    width: "50%",
    borderTopLeftRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServiceDetailsScreen;
