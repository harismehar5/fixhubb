import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SecondHeader from "../components/SecondHeader";
import SmallButton from "../components/SmallButton";

const height = Dimensions.get("window").height / 4.5;

export default function SubServiceListScreen({ navigation }) {
  const [subServiceList, setSubServiceList] = useState([
    {
      id: 1,
      heading: "AC Installations",
      description:
        "Non amet esse non nisi do sint qui irure labore incididunt sint. Quis pariatur commodo dolore deserunt ullamco. Reprehenderit esse consectetur aliqua ullamco ullamco id esse velit officia deserunt ea. Fugiat id velit enim occaecat quis exercitation reprehenderit Lorem excepteur.",
      price: "500",
      icon: "ios-trash-bin-outline",
    },
    {
      id: 2,
      heading: "AC Installations",
      description:
        "Non amet esse non nisi do sint qui irure labore incididunt sint. Quis pariatur commodo dolore deserunt ullamco. Reprehenderit esse consectetur aliqua ullamco ullamco id esse velit officia deserunt ea. Fugiat id velit enim occaecat quis exercitation reprehenderit Lorem excepteur.",
      price: "500",
      icon: "ios-trash-bin-outline",
    },
    {
      id: 3,
      heading: "AC Installations",
      description:
        "Non amet esse non nisi do sint qui irure labore incididunt sint. Quis pariatur commodo dolore deserunt ullamco. Reprehenderit esse consectetur aliqua ullamco ullamco id esse velit officia deserunt ea. Fugiat id velit enim occaecat quis exercitation reprehenderit Lorem excepteur.",
      price: "500",
      icon: "ios-trash-bin-outline",
    },
    {
      id: 4,
      heading: "AC Installations",
      description:
        "Non amet esse non nisi do sint qui irure labore incididunt sint. Quis pariatur commodo dolore deserunt ullamco. Reprehenderit esse consectetur aliqua ullamco ullamco id esse velit officia deserunt ea. Fugiat id velit enim occaecat quis exercitation reprehenderit Lorem excepteur.",
      price: "500",
      icon: "ios-trash-bin-outline",
    },
  ]);
  const SubServiceItem = ({ item }) => (
    <TouchableOpacity
      style={{
        height: height,
        flexDirection: "column",
        backgroundColor: "#F1F6FB",
        borderRadius: 15,
        paddingHorizontal: 10,
        marginVertical: 8,
      }}
      onPress={() => navigation.navigate("ServiceDetails")}
    >
      <Text style={styles.bold_text}>{item.heading}</Text>
      <Text>{item.description}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.bold_text}>
          {"Rate: "}
          {item.price}
          {"/-"}
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
          <MaterialCommunityIcons name="cart-variant" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderSubServiceList = ({ item }) => <SubServiceItem item={item} />;
  return (
    <SafeAreaView style={styles.container}>
      <SecondHeader></SecondHeader>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.heading_text}>Sub Services</Text>
        <View style={{ marginRight: 20 }}>
          <SmallButton
            title={"Custom Query"}
            color={"#007AAF"}
            textColor={"#ffffff"}
          />
        </View>
      </View>
      <FlatList
        data={subServiceList}
        renderItem={renderSubServiceList}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginHorizontal: 20 }}
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
  heading_text: {
    fontSize: 22,
    marginHorizontal: 20,
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
  bold_text: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
});
