import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";

import Input from "../components/Input";
import { AntDesign } from "@expo/vector-icons";
import SecondHeader from "../components/SecondHeader";
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

const CheckoutScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const handleSlotChange = (slot) => {
    setSelectedSlot(slot);
  };
  const timeSlots = () => {
    const startAM = 9;
    const endAM = 11;
    const startPM = 1;
    const endPM = 7;
    const slots = [];
    for (let i = startAM; i <= endAM; i++) {
      const label = `${i.toString().padStart(2, "0")}:00 AM`;
      const value = `${i}:00:00`;
      slots.push({ label, value });
    }
    for (let i = startPM; i <= endPM; i++) {
      const label = `${i.toString().padStart(2, "0")}:00 PM`;
      const value = `${i + 12}:00:00`;
      slots.push({ label, value });
    }
    return slots;
  };
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayPress = (day) => {
    setSelectedDay(day);
    console.log(`Selected day: ${WEEKDAYS[day.getDay()]} ${day.getDate()}`);
  };

  const weekdays = [];

  for (let i = 0; i < 7; i++) {
    const weekday = new Date(today);
    weekday.setDate(today.getDate() + i);
    weekdays.push(weekday);
  }
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setIsTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setIsTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    setSelectedTime(
      time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
    hideTimePicker();
  };

  const handleCheckout = () => {
    // handle checkout logic here
  };
  return (
    <View style={styles.container}>
      <SecondHeader />
      <View style={styles.form}>
        <ScrollView
          style={styles.dayGroup}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {weekdays.map((weekday, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dayContainer}
              onPress={() => handleDayPress(weekday)}
            >
              <Text
                style={[
                  styles.weekday,
                  selectedDay === weekday && styles.selected,
                ]}
              >
                {WEEKDAYS[weekday.getDay()]}
              </Text>
              <Text
                style={[
                  styles.date,
                  selectedDay === weekday && styles.selected,
                ]}
              >
                {weekday.getDate()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.inputGroup}>
          <Picker
            selectedValue={selectedSlot}
            onValueChange={handleSlotChange}
            style={styles.picker}
            itemStyle={styles.item}
            prompt="Select a time slot"
          >
            {timeSlots().map((slot, index) => (
              <Picker.Item key={index} label={slot.label} value={slot.value} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputGroup}>
          <Input
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter address"
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", position: "absolute", bottom: 0 }}>
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
          <AntDesign name="arrowright" size={18} color="#ffffff" />
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
  summary: {
    backgroundColor: "#F8F8F8",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  form: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputGroup: {
    marginBottom: 10,
    // flexDirection: "row",
  },
  dayGroup: {
    marginBottom: 10,
    flexDirection: "row",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inputText: {
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: "#FF4500",
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  dayContainer: {
    alignItems: "center",
    backgroundColor: "#007AAF",
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 20,
  },
  weekday: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ffffff",
  },
  date: {
    fontSize: 14,
    color: "#ffffff",
  },
  selected: {
    color: "#ffffff",
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    borderRadius: 15, // Set the border radius to 15
    backgroundColor: '#ffffff', // Set the background color to white
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  item: {
    fontSize: 16,
  },
});

export default CheckoutScreen;
