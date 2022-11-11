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
import Modal from "react-native-modal";

const height = Dimensions.get("window").height / 2.2;
const modalHeight = Dimensions.get("window").height / 3.5;


import SecondHeader from "../components/SecondHeader";
import CartListItem from "../components/CartListItem";
import Button from "../components/Button";
import Input from "../components/Input";
import SmallButton from "../components/SmallButton";

export default function CartScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [cartList, setCartList] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      name: "Sub Service 1",
      icon: "trash-bin",
      image: "https://picsum.photos/200",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      name: "Sub Service 2",
      icon: "trash-bin",
      image: "https://picsum.photos/200",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      name: "Sub Service 3",
      icon: "trash-bin",
      image: "https://picsum.photos/200",
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bn",
      name: "Sub Service 4",
      icon: "trash-bin",
      image: "https://picsum.photos/200",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f65",
      name: "Sub Service 5",
      icon: "trash-bin",
      image: "https://picsum.photos/200",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d75",
      name: "Sub Service 6",
      icon: "trash-bin",
      image: "https://picsum.photos/200",
    },
  ]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const renderCartList = ({ item }) => <CartListItem item={item} />;
  return (
    <SafeAreaView style={styles.container}>
      <SecondHeader></SecondHeader>
      <Text style={styles.cart_text}>My Cart</Text>
      <View style={styles.list_section}>
        <FlatList
          data={cartList}
          renderItem={renderCartList}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          // marginHorizontal: 20,
          marginVertical: 5,
        }}
      >
        <View style={{ width: "70%", justifyContent: "center" }}>
          <Input placeholder={"Promo Code"} />
        </View>
        <View style={{ width: "25%", justifyContent: "center" }}>
          <SmallButton
            title={"Apply"}
            color="#007FB2"
            textColor={"#ffffff"}
            onPress={() => {
              navigation.navigate("HomeTab");
            }}
          />
        </View>
      </View>
      <View style={styles.text_section}>
        <Text style={styles.text_style}>Sub Total</Text>
        <Text style={styles.text_style}>RS. 10500/-</Text>
      </View>
      <View style={styles.text_section}>
        <Text style={styles.text_style}>Sub Total</Text>
        <Text style={styles.text_style}>RS. 10500/-</Text>
      </View>
      <View style={styles.text_section}>
        <Text style={styles.text_style}>Sub Total</Text>
        <Text style={styles.text_style}>RS. 10500/-</Text>
      </View>
      <Button
        title={"Place Order"}
        color="#007FB2"
        textColor={"#ffffff"}
        onPress={toggleModal}
      />
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} >
        <View style={{ backgroundColor:"#0093C0", height: modalHeight, justifyContent:"center", alignItems:"center", borderRadius:10, }}>
          <Text style={{color:"#ffffff", fontWeight:"800", fontSize: 22, marginBottom:20}}>ORDER CONFIRMED</Text>
          <Text style={{color:"#ffffff", fontSize: 18, marginVertical:5}}>Your order has been sent</Text>
          <Text style={{color:"#ffffff", fontSize: 18, marginVertical:5, textAlign:"center"}} >Our representative will be there at mean time</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "#ffffff",
  },
  cart_text: {
    fontSize: 22,
    marginHorizontal: 20,
  },
  list_section: {
    height: height,
    marginHorizontal: 20,
  },
  text_section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 15,
  },
  text_style: {
    fontWeight: "bold",
  },
});
