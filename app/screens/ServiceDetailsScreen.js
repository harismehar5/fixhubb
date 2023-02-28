import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import ReviewList from "../components/ReviewList";
import { AntDesign } from "@expo/vector-icons";
const ServiceDetailsScreen = () => {
  const [followed, isFollowed] = useState(false);
  const reviews = [
    {
      id: 1,
      name: "Customer A",
      image: "https://picsum.photos/id/1/200/200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel augue sed est lacinia tincidunt. Fusce sit amet velit dolor.",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Customer B",
      image: "https://picsum.photos/id/2/200/200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel augue sed est lacinia tincidunt. Fusce sit amet velit dolor.",
      rating: 3,
    },
    {
      id: 3,
      name: "Customer C",
      image: "https://picsum.photos/id/3/200/200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel augue sed est lacinia tincidunt. Fusce sit amet velit dolor.",
      rating: 5,
    },
    {
      id: 4,
      name: "Customer D",
      image: "https://picsum.photos/id/4/200/200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel augue sed est lacinia tincidunt. Fusce sit amet velit dolor.",
      rating: 2.5,
    },
    {
      id: 5,
      name: "Customer E",
      image: "https://picsum.photos/id/5/200/200",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel augue sed est lacinia tincidunt. Fusce sit amet velit dolor.",
      rating: 4,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://picsum.photos/200" }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Name of Product</Text>
        <Text style={styles.price}>Price of Product</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <ReviewList reviews={reviews} />
      </View>
      <View style={{ flexDirection: "row",}}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
          onPress={() => isFollowed(!followed)}
        >
          {followed ? (
            <AntDesign name="heart" size={24} color="#007AAF" />
          ) : (
            <AntDesign name="hearto" size={24} color="#007AAF" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add to Cart</Text>
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
  imageContainer: {
    height: "30%",
    flexDirection: "column",
    marginBottom: 20,
  },
  image: {
    height: "100%",
  },
  detailsContainer: {
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "7%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: "gray",
  },
  descriptionContainer: {
    marginBottom: 20,
    height: "15%",
    paddingHorizontal: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007AAF",
    padding: 10,
    alignItems: "center",
    width: "50%",
    borderTopLeftRadius:30
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ServiceDetailsScreen;
