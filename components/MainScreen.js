//React imports
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import GlobalStyles from './GlobalStyles';
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={GlobalStyles.background}>
      <View style={GlobalStyles.view}>
        {/* <Text>test</Text> */}
        <FlatList
          key={"-"}
          style={GlobalStyles.list}
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
    <SafeAreaView style={GlobalStyles.imageView}>
      <Text style={{ color: "rgb(210, 210, 210)", textAlign: "center" }}>
        {item.name}
      </Text>
      <Image
        source={{ uri: img(item.icon_url) }}
        style={[GlobalStyles.img, { borderColor: "#" + item.rarity_color }]}
      />
    </SafeAreaView>
  );
};

const img = (id) => {
  const IMGPREFIX = "https://steamcommunity-a.akamaihd.net/economy/image";
  const url = `${IMGPREFIX}/${id}`;
  return url;
};

