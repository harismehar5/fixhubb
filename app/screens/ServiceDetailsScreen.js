import React from "react";
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
import SecondHeader from "../components/SecondHeader";
import SmallButton from "../components/SmallButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const height = Dimensions.get("window").height / 2;

export default function ServiceDetailsScreen() {
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
        <Text style={styles.heading_text}>AC Technician</Text>
        <View style={{ marginRight: 20 }}>
          <SmallButton
            title={"Custom Query"}
            color={"#007AAF"}
            textColor={"#ffffff"}
          />
        </View>
      </View>
      <View
        style={{
          height: "68%",
          justifyContent: "space-between",
          flexDirection: "column",
          backgroundColor: "#F1F6FB",
          marginVertical: 5,
          marginHorizontal: 20,
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <View>
          <Text style={styles.bold_text}>AC INSTALLATIONS</Text>
          <Text>
            Voluptate qui occaecat minim id et. Ad mollit fugiat sit est laborum
            in id. Culpa dolor laborum fugiat eu. Voluptate elit minim laboris
            veniam dolor dolore.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.bold_text}>Rate: 10500/-</Text>
          <View style={styles.cart_text_section}>
            <MaterialCommunityIcons
              name="cart-variant"
              size={24}
              color="black"
            />
          </View>
        </View>
      </View>
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
  heading_text: {
    fontSize: 22,
    marginHorizontal: 20,
  },
  bold_text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
