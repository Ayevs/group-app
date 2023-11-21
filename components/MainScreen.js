//React imports
import {
  SafeAreaView,
  Text,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { useState, useEffect } from "react";

//Redux imports
import { itemStore } from "../stores/store";
import { addItem, resetState } from "../reducers/itemslice";
import { useSelector, useDispatch } from "react-redux";

export default function MainScreen() {
  const dispatch = useDispatch();

  const items = useSelector((state) => {
    return state.item.value;
  });
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.view}>
        {/* <Text>test</Text> */}
        <FlatList
          key={"-"}
          style={styles.list}
          data={items}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}

const renderItem = ({ item }) => {
  return (
    <SafeAreaView style={styles.imageView}>
      <Text style={{ color: "rgb(210, 210, 210)", textAlign: "center" }}>
        {item.name}
      </Text>
      <Image
        source={{ uri: img(item.icon_url) }}
        style={[styles.img, { borderColor: "#" + item.rarity_color }]}
      />
    </SafeAreaView>
  );
};

const img = (id) => {
  const IMGPREFIX = "https://steamcommunity-a.akamaihd.net/economy/image";
  const url = `${IMGPREFIX}/${id}`;
  return url;
};

const styles = StyleSheet.create({
  view: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    margin: 20,
    borderRadius: 5,
  },
  img: {
    width: "95%",
    aspectRatio: 1,
    backgroundColor: "#071215",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "transparent",
    margin: 5,
  },
  imageView: {
    flex: 1,
    flexDirection: "column",
    margin: 0,
    paddingTop: 10,
    justifyContent: "space-between",
    alignContent: "center",
  },
  background: {
    backgroundColor: "#1b2838",
  },
  list: {},
});
