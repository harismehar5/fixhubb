import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SecondHeader from "../components/SecondHeader";

const CartScreen = ({ navigation }) => {
  const [quantities, setQuantities] = useState({});
  const services = [
    {
      id: "1",
      name: "Service 1",
      price: 10,
      image: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Service 2",
      price: 15,
      image: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Service 3",
      price: 20,
      image: "https://via.placeholder.com/150",
    },
  ];

  const ServiceItem = ({ item, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(0);

    const handleAdd = () => {
      setQuantity(quantity + 1);
      onQuantityChange(item.id, quantity + 1);
    };

    const handleMinus = () => {
      if (quantity > 0) {
        setQuantity(quantity - 1);
        onQuantityChange(item.id, quantity - 1);
      }
    };

    return (
      <View style={styles.item}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#007AAF",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                }}
                onPress={handleMinus}
              >
                <AntDesign name="minus" size={14} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#007AAF",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                }}
                onPress={handleAdd}
              >
                <AntDesign name="plus" size={14} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>
    );
  };
  const handleQuantityChange = (serviceId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [serviceId]: quantity,
    }));
  };

  const renderItem = ({ item }) => (
    <ServiceItem item={item} onQuantityChange={handleQuantityChange} />
  );

  return (
    <View style={styles.container}>
      <SecondHeader />
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            // flexDirection:"row",
            justifyContent: "center",
            // alignItems: "center",
            paddingHorizontal: 20,
            width: "50%",
          }}
          // onPress={() => isFollowed(!followed)}
        >
          <Text style={styles.price}>{"Total Amount"}</Text>
          <Text style={styles.name}>{"Rs 1000/-"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Checkout")}>
          <Text style={styles.buttonText}>Continue</Text>
          {/* <AntDesign name="arrowright" size={18} color="#ffffff" /> */}
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
  list: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 5,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    fontSize: 20,
    color: "#ffffff",
    paddingHorizontal: 10,
  },
  quantity: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007AAF",
    // padding: 10,
    width: "50%",
    borderTopLeftRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
});

export default CartScreen;
