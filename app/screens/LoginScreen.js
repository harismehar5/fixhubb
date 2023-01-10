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
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";
import { SIGN_IN } from "../config/config";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("harismehar54455@gmail.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (email === "" || email.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter User Name Or Email",
      });
    } else if (password === "" || password.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Password",
      });
    } else {
      var loginObject = {
        email: email,
        password: password,
      };
      login(loginObject);
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
  const login = (object) => {
    setLoading(true);
    axios
      .post(SIGN_IN, object, {
        headers: {
          "x-api-key": "sd4fji2378gi3urg",
        },
      })
      .then(function (response) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Welcome To Fixhubb",
        });
        setLoading(false);
        storeData(response.data);
        navigation.navigate("HomeTab");
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
            Welcome!
          </Text>
          <Text style={[styles.continue_style, styles.text_style]}>
            sign in to continue
          </Text>
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
          <Text style={[styles.forgot_style, styles.text_style]}>
            Forgot Password?
          </Text>
          <Button
            title={"Login"}
            color="#F5AC30"
            textColor={"#ffffff"}
            onPress={() => {
              // navigation.navigate("HomeTab");
              validate();
            }}
          />
          {/* <Text style={[styles.center_text_style, styles.text_style]}>
          OR LOGIN WITH
        </Text>
        <Button title={"Login via Facebook"} color="#3E89FB" /> */}
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
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={styles.signup_text_style}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  image: {
    flex: 1,
  },
  inner_container: {
    flex: 1,
    justifyContent: "center",
  },
  forgot_style: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  continue_style: {
    marginLeft: 25,
  },
  text_style: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 12,
  },
  center_text_style: {
    alignSelf: "center",
  },
  signup_text_style: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
});
