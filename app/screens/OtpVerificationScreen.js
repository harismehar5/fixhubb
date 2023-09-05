import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";

import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";
import Toast from "react-native-toast-message";
import axios from "axios";
import * as firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { SIGN_UP } from "../config/config";
const firebaseConfig = {
  apiKey: "AIzaSyAnv8NY8w7yplj2R9oM317cliJWAJnRFEs",
  authDomain: "fixhubb-be0ea.firebaseapp.com",
  projectId: "fixhubb-be0ea",
  storageBucket: "fixhubb-be0ea.appspot.com",
  messagingSenderId: "1059539864277",
  appId: "1:1059539864277:web:33834deb451ef3356d305c",
  measurementId: "G-JM1JZ05DMN",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default function OtpVerificationScreen({ navigation, route }) {
  const recaptchaVerifier = React.useRef(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");

  const [verificationId, setVerificationId] = useState(null);

  useEffect(() => {
    let phone = route.params.userDetail.phone;

    let number = "+92" + phone.substr(1);
    setPhone(number);
    setTimeout(() => {
      sendOTP(number);
    }, 3000);
  }, []);
  const sendOTP = async (number) => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        number,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
    } catch (err) {
      console.log(err);
    }
  };

  const verifyCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationCode,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        Alert.alert("Verification successful!");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  const validation = () => {
    if (name === "" || name.length === 0) {
      console.log("world");
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
        name: name,
        phone: phone,
        email: email,
        password: password,
      };
      // signUp(userObject);
    }
  };
  const signUp = (object) => {
    // console.log()
    setLoading(true);
    axios
      .post(SIGN_UP, object, {
        headers: {
          "x-api-key": "sd4fji2378gi3urg",
        },
      })
      .then(function (response) {
        // setLoading(false);
        console.log(response);
        // console.log(response)
        if (response.status === 200) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Welcome To Fixhubb",
          });
          // storeData(response);
          // navigation.navigate("Login");
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Something went wrong...!",
          });
          console.log("Registration failed");
        }
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
      <FirebaseRecaptchaVerifierModal
        firebaseConfig={firebaseConfig}
        ref={recaptchaVerifier}
        //  attemptInvisibleVerification={true}
      />
      <ImageBackground
        source={require("../assets/background_image.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Header />
        <View
          style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Enter OTP
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontWeight: "400",
              fontSize: 16,
              color: "#fff",
            }}
          >
            We have sent you OTP to your Phone{" "}
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginTop: 5,
              fontWeight: "400",
              fontSize: 16,
              color: "#fff",
            }}
          >
            number for verification
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TextInput
              maxLength={4}
              keyboardType="numeric"
              placeholder="0"
              style={styles.sectionStyle}
            />
            <TextInput
              maxLength={4}
              keyboardType="numeric"
              placeholder="0"
              style={styles.sectionStyle}
            />
            <TextInput
              maxLength={4}
              keyboardType="numeric"
              placeholder="0"
              style={styles.sectionStyle}
            />
            <TextInput
              maxLength={4}
              keyboardType="numeric"
              placeholder="0"
              style={styles.sectionStyle}
            />
          </View>
          <View style={{ marginTop: 20 }} />
          <Button
            title={"Sign up"}
            color="#F5AC30"
            textColor={"#ffffff"}
            onPress={() => {
              sendOTP(phone);
            }}
          />
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
              marginVertical: 10,
            }}
          >
            Didn't Receive the OTP?{" "}
          </Text>
          <Text
            style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
          >
            Resend Code
          </Text>
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
  sectionStyle: {
    marginTop: 25,
    width: 50,
    marginHorizontal: 20,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ecf0f1",
    height: 54,
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
  },
});
