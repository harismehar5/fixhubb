import React, { useState } from "react";
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
} from "react-native";
import { Entypo, AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import SecondHeader from "../components/SecondHeader";

export default function HomeScreen({ navigation }) {
  const [locationPressed, isLocationPressed] = useState(false);
  const [servicePressed, isServicePressed] = useState(false);
  const [servicesList, setServicesList] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Plumber",
      icon: "car-sharp",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "Education",
      icon: "car-sharp",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "Car Wash",
      icon: "car-sharp",
    },
  ]);
  const [subServicesList, setSubServicesList] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Sub Service 1",
      icon: "car-sharp",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "Sub Service 2",
      icon: "car-sharp",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "Sub Service 3",
      icon: "car-sharp",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bn",
      name: "Sub Service 4",
      icon: "car-sharp",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f65",
      name: "Sub Service 5",
      icon: "car-sharp",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d75",
      name: "Sub Service 6",
      icon: "car-sharp",
    },
  ]);
  const ServiceItem = ({ item }) => (
    <TouchableOpacity style={styles.service_list_container} onPress={() => navigation.navigate("SubServiceList")}>
      <Ionicons name={item.icon} size={24} color="black" />
      <Text
        style={{
          ...styles.service_text,
          color: "#000000",
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  const SubServiceItem = ({ item }) => (
    <TouchableOpacity
      style={{
        height: Dimensions.get("window").height / 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F1F6FB",
        borderRadius: 15,
        paddingHorizontal: 10,
        marginVertical: 8,
      }}
    >
      <Text
        style={{
          ...styles.service_text,
          color: "#000000",
        }}
      >
        {item.name}
      </Text>
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name={item.icon} size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
  const renderServiceList = ({ item }) => <ServiceItem item={item} />;
  const renderSubServiceList = ({ item }) => <SubServiceItem item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <SecondHeader></SecondHeader>
      <View style={styles.location_container}>
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
      </View>
      <View style={styles.service_type_container}>
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
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <FlatList
          data={servicesList}
          renderItem={renderServiceList}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
      <Text style={{ marginVertical: 15, marginHorizontal: 20 }}>
        Get the best from us
      </Text>
      <ScrollView style={{ marginHorizontal: 10 }}>
        <FlatList
          data={subServicesList}
          renderItem={renderSubServiceList}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
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
    height: Dimensions.get("window").height / 7,
    width: Dimensions.get("window").width / 2.8,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F6FB",
    borderRadius: 15,
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
});
