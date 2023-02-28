import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

const ReviewList = ({ reviews }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={{flexDirection:"row", justifyContent:"space-between"}}>

          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.rating}>{item.rating}/5</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text numberOfLines={2} style={styles.description}>
              {item.description}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const keyExtractor = (item) => item.id.toString();

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 3,
  },
  imageContainer: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    borderRadius: 24,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700", // gold color
    marginLeft: 5,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
});

export default ReviewList;
