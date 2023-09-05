import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import Button from "../components/Button";
import Header from "../components/Header";
import DropDownPicker from "react-native-dropdown-picker";
import { GetCitiesList, GetSectorsByCityID } from "../config/api";

export default function SelectAreaScreen({ navigation }) {
  const [openCity, setOpenCity] = useState(false);
  const [cityValue, setCityValue] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [openArea, setOpenArea] = useState(false);
  const [areaValue, setAreaValue] = useState(null);
  const [areaList, setAreaList] = useState([]);

  useEffect(() => {
    getCitiesList();
  }, []);

  const getCitiesList = async () => {
    await GetCitiesList()
      .then((response) => {
        var cityArray = [];
        for (var i = 0; i < response.length; i++) {
          cityArray.push({
            label: response[i].Name,
            value: response[i].Id,
          });
        }
        setCityList(cityArray);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.toString(),
        });
      });
  };
  const getAreasList = async (id) => {
    await GetSectorsByCityID(id)
      .then((response) => {
        var areaArray = [];
        console.log("Response", response);
        for (var k = 0; k < response.length; k++) {
          areaArray.push({
            label: response[k].Name,
            value: response[k].Id,
          });
        }
        console.log("Area", areaArray);
        setAreaList(areaArray);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.toString(),
        });
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
          <DropDownPicker
            open={openCity}
            value={cityValue}
            items={cityList}
            setOpen={setOpenCity}
            setValue={setCityValue}
            setItems={setCityList}
            style={{ marginVertical: 8 }}
            zIndex={2000}
            zIndexInverse={2000}
            onSelectItem={(item) => {
              setCityValue(item.value);
              getAreasList(item.value);
            }}
          />
          <DropDownPicker
            open={openArea}
            value={areaValue}
            items={areaList}
            setOpen={setOpenArea}
            setValue={setAreaValue}
            setItems={setAreaList}
            style={{ marginTop: 8, marginBottom: 16 }}
            zIndex={1000}
            zIndexInverse={3000}
            onSelectItem={(item) => {
              setAreaValue(item.value);
            }}
          />
          <Button
            title={"Continue"}
            color="#F5AC30"
            textColor={"#ffffff"}
            onPress={() => {
              navigation.navigate("HomeTab", {
                city_id: cityValue,
                area_id: areaValue,
              });
              // validate();
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  inner_container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },
});
