//React imports
import {
  SafeAreaView,
  Text,
  FlatList,
  Image,
  StyleSheet,
  View,
  Button,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";

//Redux imports
import { itemStore } from "../stores/store";
import { addItem, resetState } from "../reducers/itemslice";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from 'expo-checkbox';

export default function MainScreen() {
  const dispatch = useDispatch();

  //testing using useState
  const [showModal, setShowModal] = useState(false);
  const [filterWord, setFilterWord] = useState("");
  const [isFN, setFN] = useState(false);

  const items = useSelector((state) => {
    return state.item.value;
  });

  const searchButtonHandler = () =>{
    setShowModal(!showModal);
    console.log(filterWord);
  };
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.view}>
        {/* <Text>test</Text> */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={showModal}
          onRequestClose={()=>{setShowModal(!showModal)}}
        >
          <SafeAreaView>
            <Text>
              filters.
            </Text>
            <TextInput 
              editable
              multiline
              onChangeText={value => setFilterWord(value)}
              style={styles.searchBar}
            />
            <View>
              <Text>Wear</Text>
                <Checkbox value={isFN} onValueChange={setFN} />
                <Text>Factory New</Text>
                <Checkbox value={isFN} onValueChange={setFN} />
                <Text>Minimal Wear</Text>
                <Checkbox value={isFN} onValueChange={setFN} />
                <Text>Field Tested</Text>
                <Checkbox value={isFN} onValueChange={setFN} />
                <Text>Well Worn</Text>
                <Checkbox value={isFN} onValueChange={setFN} />
                <Text>Battle Scarred</Text>
            </View>
            <Button title="Search" onPress={()=>{console.log(filterWord); setShowModal(!showModal)}} />
            <Button title="Close" onPress={()=> setShowModal(!showModal)} />
          </SafeAreaView>
        </Modal>
        <Button title="Filters" onPress={()=> setShowModal(!showModal)} />
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

const renderItem = ({ item, filterWord }) => {
  if(filterWord == null){
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
  }else{
    if(item.name.toLowerCase() == filterWord){
      return(
        <SafeAreaView>
          <Text style={{ color: "rgb(210, 210, 210)", textAlign: "center" }}>
            {item.name}
          </Text>
          <Image
            source={{ uri: img(item.icon_url) }}
            style={[styles.img, { borderColor: "#" + item.rarity_color }]}
          />
        </SafeAreaView>
      );
    }else{
      return(
        <SafeAreaView>
          <Text>Rut roh</Text>
        </SafeAreaView>
      )
    }
  }
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
  searchBar:{borderWidth:1},
  checkBoxContainer:{
    flexDirection:'row',
  }
});
