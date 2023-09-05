import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SecondHeader from "../components/SecondHeader";
import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, RemoveItemFromCart } from "../redux/Actions";
import { GetCartByCustomerId } from "../config/api";
import DateTimePicker from "@react-native-community/datetimepicker";

const CartScreen = ({ navigation }) => {
  const [quantities, setQuantities] = useState({});
  const [items, setItems] = useState([]);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const ServiceItem = ({ item, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(0);
    const dispatcher = useDispatch();

    const handleAdd = (obj) => {
      dispatcher(addItemToCart(obj));
    };

    const handleMinus = (obj) => {
      dispatcher(RemoveItemFromCart(obj));
    };

    return (
      <View style={styles.item}>
        <View style={styles.info}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.name}>{item.Name}</Text>
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
                onPress={() => handleMinus(item)}
              >
                <AntDesign name="minus" size={14} color="#ffffff" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.Quantity}</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#007AAF",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                }}
                onPress={() => handleAdd(item)}
              >
                <AntDesign name="plus" size={14} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.price}>{item.Rate + " RS"}</Text>
          {/* <Text style={{ fontWeight: "bold" }}>Total : {item.subtotal}</Text> */}
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

  useEffect(() => {
    getCartByCustomerId(6);
  }, []);
  const getCartByCustomerId = (id) => {
    GetCartByCustomerId(id)
      .then((response) => {
        console.log(response);
        setItems(response);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.toString(),
        });
      });
  };
  const renderItem = ({ item }) => (
    <ServiceItem item={item} onQuantityChange={handleQuantityChange} />
  );
  function showDatePicker() {
    setDatePicker(true);
  }
  function showTimePicker() {
    setTimePicker(true);
  }
  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }
  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  return (
    <View style={styles.container}>
      <SecondHeader />
      <Text style={{ fontSize: 20, marginLeft: 20 }}>My Cart</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id}
        contentContainerStyle={styles.list}
      />
      {/* <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TextInput placeholder="Enter Code" style={styles.InputStyle} />
        <TouchableOpacity style={styles.ApplyButton}>
          <Text style={{ textAlign: "center", color: "#fff" }}>Apply Code</Text>
        </TouchableOpacity>
      </View> */}
      {/* <Text style={styles.text}>Time</Text> */}
      {/* <Input placeholder={"Date"} /> */}
      <TouchableOpacity style={styles.date_style} onPress={showTimePicker}>
        <Text>{time.toLocaleTimeString("en-US")}</Text>
      </TouchableOpacity>
      {/* <Text style={styles.text}>Date</Text> */}
      <TouchableOpacity style={styles.date_style} onPress={showDatePicker}>
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>
      {datePicker && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          onChange={onDateSelected}
          style={styles.date_picker}
        />
      )}

      {timePicker && (
        <DateTimePicker
          value={time}
          mode={"time"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={false}
          onChange={onTimeSelected}
          style={styles.date_picker}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Total</Text>
        <Text style={{ fontWeight: "bold" }}>Rs 10500</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Visit</Text>
        <Text style={{ fontWeight: "bold" }}>Rs 500</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Total Amount</Text>
        <Text style={{ fontWeight: "bold" }}>
          Rs{" "}
          {items.map((item, index) => {
            let s = 0;
            return item.subtotal;
          })}
        </Text>
      </View>
      <View style={{ alignSelf: "flex-end" }}>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Checkout")}
        >
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
  InputStyle: {
    borderWidth: 1,
    // backgroundColor: "#007AAF",
    backgroundColor: "#F1f6fb",
    borderColor: "#007AAF",
    width: 220,
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  ApplyButton: {
    backgroundColor: "#007fb2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 120,
    height: 45,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#F1f6fb",
    borderWidth: 1,
    borderColor: "#007fb2",
    padding: 10,
    borderRadius: 10,
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
    top: 15,
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
    width: 200,
    padding: 10,
    borderTopLeftRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 20,
  },
  text: {
    color: "#000000",
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  date_style: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#007AAF",
    height: 54,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 10,
  },
  date_picker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
});

export default CartScreen;
