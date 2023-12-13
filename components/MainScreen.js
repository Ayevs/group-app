//React imports
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  View,
  Button,
  Modal,
  TextInput,
  Pressable,
  TouchableOpacity,
  ToastAndroid,
  Animated,
  Easing,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Dropdown } from "react-native-element-dropdown";
import GlobalStyles from "./GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

//Redux imports
import { itemStore } from "../stores/store";
import { addItem, resetState } from "../reducers/itemslice";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "expo-checkbox";

//navbar
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { addToWishlist } from "../reducers/wishlistslice";

const Tab = createBottomTabNavigator();

export default function Tabs({ filter }) {
  return (
    <SafeAreaView style={GlobalStyles.background}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconSource;

            if (route.name === "Home") {
              iconSource = focused
                ? require("../assets/homeIconSelected.png")
                : require("../assets/homeIconNotSelected.png");
            } else if (route.name === "Wishlist") {
              iconSource = focused
                ? require("../assets/wishlistIconSelected.png")
                : require("../assets/wishlistIconNotSelected.png");
            }

            return (
              <Image source={iconSource} style={{ width: 35, height: 35 }} />
            );
          },
          headerShown: false,
          tabBarStyle: { backgroundColor: "rgba(0, 0, 0, 1)" },
        })}
      >
        <Tab.Screen name="Home">
          {() => <MainScreen filter={filter} />}
        </Tab.Screen>
        <Tab.Screen name="Wishlist" component={WishlistScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

function MainScreen({ route, navigation, filter }) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false); //Modal state
  const [wishlistItems, setWishListItems] = useState([]);

  //Filter dependencies
  const [skinName, setSkinName] = useState(""); //filtered word state
  const [wearObj, setWearObj] = useState({
    "Factory New": true,
    "Minimal Wear": true,
    "Field-Tested": true,
    "Well-Worn": true,
    "Battle-Scarred": true,
  });
  const [gun, setGun] = useState(null);
  const [resetFilters, setResetFilters] = useState(true);
  const [filteredList, setFilteredList] = useState([]);

  //Loads items from store and stores it in useEffect. This is so that the useEffect value can be altered based therefore making the store immutable
  const items = useSelector((state) => state.item.value);

  const guns = [
    { label: "Glock-18", value: "Glock-18" },
    { label: "Dual Berettas", value: "Dual Berettas" },
    { label: "P250", value: "P250" },
    { label: "Tec-9", value: "Tec-9" },
    { label: "Five-SeveN", value: "Five-SeveN" },
    { label: "CZ75-Auto", value: "CZ75-Auto" },
    { label: "Desert Eagle", value: "Desert Eagle" },
    { label: "R8 Revolver", value: "R8 Revolver" },
    { label: "USP-S", value: "USP-S" },
    { label: "AK-47", value: "AK-47" },
    { label: "Galil AR", value: "Galil AR" },
    { label: "SG 553", value: "SG 553" },
    { label: "AUG", value: "AUG" },
    { label: "FAMAS", value: "FAMAS" },
    { label: "SSG 08", value: "SSG 08" },
    { label: "AWP", value: "AWP" },
    { label: "SCAR-20", value: "SCAR-20" },
    { label: "G3SG1", value: "G3SG1" },
    { label: "MAC-10", value: "MAC-10" },
    { label: "MP5-SD", value: "MP5-SD" },
    { label: "MP7", value: "MP7" },
    { label: "MP9", value: "MP9" },
    { label: "PP-Bizon", value: "PP-Bizon" },
    { label: "P90", value: "P90" },
    { label: "UMP-45", value: "UMP-45" },
    { label: "MAG-7", value: "MAG-7" },
    { label: "Nova", value: "Nova" },
    { label: "Sawed-Off", value: "Sawed-Off" },
    { label: "XM1014", value: "XM1014" },
    { label: "Negev", value: "M249" },
    { label: "Bayonet", value: "Bayonet" },
    { label: "Bowie Knife", value: "Bowie Knife" },
    { label: "Butterfly Knife", value: "Butterfly Knife" },
    { label: "Classic Knife", value: "Classic Knife" },
    { label: "Falchion Knife", value: "Falchion Knife" },
    { label: "Flip Knife", value: "Flip Knife" },
    { label: "Gut Knife", value: "Gut Knife" },
    { label: "Huntsman Knife", value: "Huntsman Knife" },
    { label: "Karambit", value: "Karambit" },
    { label: "M9 Bayonet", value: "M9 Bayonet" },
    { label: "Navaja Knife", value: "Navaja Knife" },
    { label: "Nomad Knife", value: "Nomad Knife" },
    { label: "Paracord Knife", value: "Paracord Knife" },
    { label: "Shadow Daggers", value: "Shadow Daggers" },
    { label: "Stiletto Knife", value: "Skeleton Knife" },
    { label: "Survival Knife", value: "Survival Knife" },
    { label: "Ursus Knife", value: "Ursus Knife" },
    { label: "Talon Knife", value: "Talon Knife" },
  ];

  const wears = {
    factorynew: "Factory New",
    minimalwear: "Minimal Wear",
    fieldtested: "Field-Tested",
    wellworn: "Well-Worn",
    battlescarred: "Battle-Scarred",
  };

  const searchMenu = () => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <SafeAreaView style={GlobalStyles.modalBackground}>
          <SafeAreaView style={GlobalStyles.modalSearch}>
            <TextInput
              editable
              multiline
              onChangeText={(value) =>
                setSkinName(value == "" ? null : value.toLowerCase())
              }
              style={GlobalStyles.searchBar}
              placeholder=" Enter Skin Here..."
              placeholderTextColor="#ABABAB"
            />
            {/* <Dropdown
              data={guns}
              search
              maxHeight={300}
              searchField={guns}
              labelField="label"
              valueField="value"
              value={gun}
              placeHolderStyle={{
                color: "white",
                fontWeight: "bold",
              }}
              placeholder="test"
              onChange={(item) => {
                setGun(item.value);
              }}
            /> */}
            <View>
              <Text style={{ color: "white", marginTop: 20 }}>Wears:</Text>
              <View>
                <Text style={{ color: "white" }}>Factory New</Text>
                <Checkbox
                  value={wearObj["Factory New"]}
                  onValueChange={() =>
                    setWearObj({
                      ...wearObj,
                      "Factory New": !wearObj["Factory New"],
                    })
                  }
                />
              </View>
              <View>
                <Text style={{ color: "white" }}>Minimal Wear</Text>
                <Checkbox
                  value={wearObj["Minimal Wear"]}
                  onValueChange={() =>
                    setWearObj({
                      ...wearObj,
                      "Minimal Wear": !wearObj["Minimal Wear"],
                    })
                  }
                />
              </View>
              <View>
                <Text style={{ color: "white" }}>Field Tested</Text>
                <Checkbox
                  value={wearObj["Field-Tested"]}
                  onValueChange={() =>
                    setWearObj({
                      ...wearObj,
                      "Field-Tested": !wearObj["Field-Tested"],
                    })
                  }
                />
              </View>
              <View>
                <Text style={{ color: "white" }}>Well Worn</Text>
                <Checkbox
                  value={wearObj["Well-Worn"]}
                  onValueChange={() =>
                    setWearObj({
                      ...wearObj,
                      "Well-Worn": !wearObj["Well-Worn"],
                    })
                  }
                />
              </View>
              <View>
                <Text style={{ color: "white" }}>Battle Scarred</Text>
                <Checkbox
                  value={wearObj["Battle-Scarred"]}
                  onValueChange={() =>
                    setWearObj({
                      ...wearObj,
                      "Battle-Scarred": !wearObj["Battle-Scarred"],
                    })
                  }
                />
              </View>
            </View>
            <View style={GlobalStyles.modalButtons}>
              <Button
                title="Search"
                onPress={() => {
                  setShowModal(!showModal);
                  filter(gun, wearObj, skinName);
                  console.log(gun, wearObj, skinName);
                }}
              />
            </View>
            <View style={GlobalStyles.modalButtons}>
              <Button
                title="Clear"
                onPress={() => {
                  setShowModal(!showModal);
                  filter(setGun(null), setSkinName(" "));
                  setWearObj({
                    "Factory New": true,
                    "Minimal Wear": true,
                    "Field-Tested": true,
                    "Well-Worn": true,
                    "Battle-Scarred": true,
                  });
                }}
              />
            </View>
            <View style={GlobalStyles.modalButtons}>
              <Button title="Close" onPress={() => setShowModal(!showModal)} />
            </View>
          </SafeAreaView>
        </SafeAreaView>
      </Modal>
    );
  };

  const FlyingImageAnimation = () => {
    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const rotation = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
      Animated.parallel([
        Animated.timing(position, {
          toValue: { x: 300, y: 4000 }, // Adjust these values as needed
          duration: 3000, // Animation duration in milliseconds
          useNativeDriver: false, // To prevent "Animated: `useNativeDriver` is not supported" warning
        }),
        Animated.timing(rotation, {
          toValue: 360,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start();
    };

    useEffect(() => {
      startAnimation();
    }, []); // Run the animation once when the component mounts

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.Image
          source={require("../assets/rocky1.png")}
          style={{
            width: 500, // Adjust the width as needed
            height: 500, // Adjust the height as needed
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          }}
        />
      </View>
    );
  };

  // const dropdownComponent = () => {
  //   const [isFocus, setisFocus] = useState(null);

  //   const renderLabel = () => {
  //     if (gun || isFocus) {
  //       return <Text>Guns:</Text>;
  //     }
  //     return null;
  //   };

  //   return (
  //     <SafeAreaView>
  //       {renderLabel()}
  //       <Dropdown
  //         style={[GlobalStyles.dropdown, isFocus && { borderColor: "blue" }]}
  //         placeholderStyle={GlobalStyles.placeHolderStyle}
  //         selectedTextStyle={GlobalStyles.selectedTextStyle}
  //         inputSearchStyle={GlobalStyles.inputSearchStyle}
  //         iconStyle={GlobalStyles.iconStyle}
  //         data={guns}
  //         search
  //         maxHeight={300}
  //         labelField={"label"}
  //         valueField={"value"}
  //         placeholder={!isFocus ? "Selected item" : "..."}
  //         placeholderTextColor="white"
  //         searchPlaceholder="Search..."
  //         value={gun}
  //         onFocus={() => setisFocus(true)}
  //         onBlur={() => setisFocus(false)}
  //         onChange={(item) => {
  //           setGun(item.value);
  //           setisFocus(false);
  //         }}
  //       />
  //     </SafeAreaView>
  //   );
  // };

  const addToWishList = (item) => {
    dispatch(addToWishlist(item));
    console.log("adding to wishlist", wishlistItems);
  };

  const renderMainItem = ({ item }) => {
    return (
      <SafeAreaView style={GlobalStyles.imageView}>
        <TouchableOpacity
          onLongPress={() => {
            console.log("longpressed", item);
            addToWishList(item);
            ToastAndroid.show("Added To Your Wishlist!", ToastAndroid.SHORT);
          }}
          style={GlobalStyles.imageView}
        >
          <Text style={{ color: "rgb(210, 210, 210)", textAlign: "center" }}>
            {item.name}
          </Text>
          <Image
            source={{ uri: img(item.icon_url) }}
            style={[GlobalStyles.img, { borderColor: "#" + item.rarity_color }]}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.background}>
      {searchMenu()}
      <View style={GlobalStyles.view}>
        <FlyingImageAnimation />
        <View style={{ paddingTop: 10, paddingBottom: 20 }}>
          <Button
            title="Search"
            onPress={() => {
              setShowModal(true);
            }}
          />
        </View>
        <FlatList
          key={"-"}
          style={GlobalStyles.list}
          data={items}
          renderItem={renderMainItem}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}

const img = (id) => {
  const IMGPREFIX = "https://steamcommunity-a.akamaihd.net/economy/image";
  const url = `${IMGPREFIX}/${id}`;
  return url;
};

const WishlistScreen = () => {
  const dispatch = useDispatch();
  const wishListItems = useSelector((state) => state.wishlist.wishlistItems);
  console.log("wishlist items in wishlist screen: ", wishListItems);

  const renderItemWishList = ({ item }) => {
    console.log("rendering wishlist Item:", item);

    const removeFromWishlist = () => {
      dispatch(removeFromWishlist(item.id));
    };

    return (
      <SafeAreaView style={GlobalStyles.imageView}>
        <TouchableOpacity onLongPress={removeFromWishlist}>
          <Text style={{ color: "rgb(210, 210, 210)", textAlign: "center" }}>
            {item.name}
          </Text>
          <Image
            source={{ uri: img(item.icon_url) }}
            style={[GlobalStyles.img, { borderColor: "#" + item.rarity_color }]}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.background}>
      <View style={GlobalStyles.view}>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            paddingBottom: 20,
            textAlign: "center",
            paddingTop: 10,
          }}
        >
          Your Wishlist
        </Text>
        <FlatList
          data={wishListItems}
          renderItem={renderItemWishList}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};
