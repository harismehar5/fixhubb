import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SignUp } from "../config/api";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("Tester2");
  const [phone, setPhone] = useState("03144783478");
  const [email, setEmail] = useState("tester2@gmail.com");
  const [password, setPassword] = useState("easypassword");
  const [loading, setLoading] = useState(false);

  const validation = () => {
    if (name === "" || name.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Name",
      });
    } else if (phone === "" || phone.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Phone Number",
      });
    } else if (password === "" || password.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Password",
      });
    } else {
      var userObject = {
        Name: name,
        Phone: phone,
        Email: email,
        Password: password,
        Token: "123456",
      };
      // navigation.navigate("OtpVerificationScreen", { userDetail: userObject });
      signUp(userObject);
    }
  };
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@access_Key", jsonValue);
    } catch (e) {
      // saving error
      console.log(e.toString());
    }
  };
  const signUp = (object) => {
    setLoading(true);
    SignUp(object)
      .then(function (response) {
        setLoading(false);
        console.log(response);
        // if (response.status === 200) {
        //   Toast.show({
        //     type: "success",
        //     text1: "Success",
        //     text2: "Welcome To Fixhubb",
        //   });
        storeData(response);
        navigation.navigate("Login");
        // } else {
        //   Toast.show({
        //     type: "error",
        //     text1: "Error",
        //     text2: "Something went wrong...!",
        //   });
        // }
      })
      .catch(function (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.toString(),
        });
        setLoading(false);
        console.log("error: " + error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/background_image.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Header />
        <View style={styles.inner_container}>
          <Text
            style={{
              marginHorizontal: 25,
              marginVertical: 5,
              fontSize: 18,
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            Sign Up
          </Text>
          <Text style={styles.continue_style}>create a new account</Text>
          <Input
            placeholder={"Full Name"}
            image={"user"}
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder={"Phone Number"}
            image={"mobile"}
            value={phone}
            onChangeText={setPhone}
          />
          <Input
            placeholder={"Email"}
            image={"envelope-o"}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder={"Password"}
            image={"lock"}
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.forgot_style}>Forgot Password?</Text>
          <Button
            title={"Next"}
            color="#F5AC30"
            textColor={"#ffffff"}
            onPress={() => {
              // navigation.navigate("OtpVerificationScreen");
              validation();
            }}
          />
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              marginBottom: 20,
              justifyContent: "center",
            }}
          >
            <Text style={[styles.forgot_style, styles.text_style]}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.signup_text_style}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight || 0,
  },
  image: {
    flex: 1,
  },
  inner_container: {
    flex: 1,
    justifyContent: "center",
  },
  forgot_style: {
    color: "#ffffff",
    alignSelf: "flex-end",
    marginVertical: 10,
    marginRight: 20,
    fontSize: 12,
  },
  continue_style: {
    color: "#ffffff",
    marginVertical: 10,
    marginLeft: 25,
    fontSize: 12,
  },
  signup_text_style: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
});
