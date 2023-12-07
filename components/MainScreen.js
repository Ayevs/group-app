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
import { Dropdown } from 'react-native-element-dropdown';

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
  const [wearArray, setWearArray] = useState([false,false,false,false,false]);
  const [gun, setGun] = useState(null);

  const gunList = [
    {label: 'Glock-18', value:'Glock-18'},
    {label: 'Dual Berettas', value:'Dual Berettas'},
    {label: 'P250', value:'P250'},
    {label: 'Tec-9', value:'Tec-9'},
    {label: 'Five-SeveN', value:'Five-SeveN'},
    {label: 'CZ75-Auto', value:'CZ75-Auto'},
    {label: 'Desert Eagle', value:'Desert Eagle'},
    {label: 'R8 Revolver', value:'R8 Revolver'},
    {label: 'USP-S', value:'USP-S'},
    {label: 'AK-47', value:'AK-47'},
    {label: 'Galil AR', value:'Galil AR'},
    {label: 'SG 553', value:'SG 553'},
    {label: 'AUG', value:'AUG'},
    {label: 'FAMAS', value: 'FAMAS'},
    {label: 'SSG 08', value:'SSG 08'},
    {label: 'AWP', value:'AWP'},
    {label: 'SCAR-20', value:'SCAR-20'},
    {label: 'G3SG1', value:'G3SG1'},
    {label: 'MAC-10', value:'MAC-10'},
    {label: 'MP5-SD', value:'MP5-SD'},
    {label: 'MP7', value:'MP7'},
    {label: 'MP9', value:'MP9'},
    {label: 'PP-Bizon', value:'PP-Bizon'},
    {label: 'P90', value:'P90'},
    {label: 'UMP-45', value:'UMP-45'},
    {label: 'MAG-7', value:'MAG-7'},
    {label: 'Nova', value:'Nova'},
    {label: 'Sawed-Off', value:'Sawed-Off'},
    {label: 'XM1014', value:'XM1014'},
    {label: 'Negev', value:'M249'},
    {label: 'Bayonet', value:'Bayonet'},
    {label: 'Bowie Knife', value:'Bowie Knife'},
    {label: 'Butterfly Knife', value:'Butterfly Knife'},
    {label: 'Classic Knife', value:'Classic Knife'},
    {label: 'Falchion Knife', value:'Falchion Knife'},
    {label: 'Flip Knife', value:'Flip Knife'},
    {label: 'Gut Knife', value:'Gut Knife'},
    {label: 'Huntsman Knife', value:'Huntsman Knife'},
    {label: 'Karambit', value:'Karambit'},
    {label: 'M9 Bayonet', value:'M9 Bayonet'},
    {label: 'Navaja Knife', value:'Navaja Knife'},
    {label: 'Nomad Knife', value:'Nomad Knife'},
    {label: 'Paracord Knife', value:'Paracord Knife'},
    {label: 'Shadow Daggers', value:'Shadow Daggers'},
    {label: 'Stiletto Knife', value:'Skeleton Knife'},
    {label: 'Survival Knife', value:'Survival Knife'},
    {label: 'Ursus Knife', value:'Talon Knife'},
  ];

  const DropdownComponent = () =>{
    const [isFocus, setisFocus] = useState(null);

    const renderLabel = () =>{
      if(gun || isFocus){
        return(
          <Text>Guns:</Text>
        );
      }
      return null;
    };

    return(
      <SafeAreaView>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor:'blue'}]}
          placeholderStyle={styles.placeHolderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={gunList}
          search
          maxHeight={300}
          labelField={"label"}
          valueField={"value"}
          placeholder={!isFocus ? 'Selected item' : '...'}
          searchPlaceholder="Search..."
          value={gun}
          onFocus={()=> setisFocus(true)}
          onBlur={()=> setisFocus(false)}
          onChange={item=>{
            setGun(item.value);
            setisFocus(false);
          }}
          />
      </SafeAreaView>
    )
  }

  const toggleBooleanAtIndex = (index) =>{
    setWearArray((prevArray) =>{
      const newArr = [...prevArray];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

  const items = useSelector((state) => {
    return state.item.value;
  });

  const searchButtonHandler = () =>{
    setShowModal(!showModal);
    console.log(filterWord);
    console.log(gun);
    console.log(wearArray[0] + ' ' + wearArray[1] + ' ' + wearArray[2] + ' ' + wearArray[3] + ' ' + wearArray[4])
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
              placeholder='Enter Skin Here...'
              placeholderTextColor='#ABABAB'
            />
            <View>
              {DropdownComponent()}
              <Text>Wears:</Text>
              <View>
                <Text>Factory New</Text> 
                <Checkbox value={wearArray[0]} onValueChange={()=>toggleBooleanAtIndex(0)} />
              </View>
              <View>
                <Text>Minimal Wear</Text> 
                <Checkbox value={wearArray[1]} onValueChange={()=>toggleBooleanAtIndex(1)} />
              </View>
              <View>
                <Text>Field Tested</Text> 
                <Checkbox value={wearArray[2]} onValueChange={()=>toggleBooleanAtIndex(2)} />
              </View>
              <View>
                <Text>Well Worn</Text> 
                <Checkbox value={wearArray[3]} onValueChange={()=>toggleBooleanAtIndex(3)} />
              </View>
              <View>
                <Text>Battle Scarred</Text> 
                <Checkbox value={wearArray[4]} onValueChange={()=>toggleBooleanAtIndex(4)} />
              </View>
            </View>
            <Button title="Search" onPress={()=>searchButtonHandler()} />
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
  searchBar:{
    borderWidth:1,
    backgroundColor:'#DADADA',
    width:'75%'
  },
  checkBoxContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical:10,
  },
  dropdown:{
    height:50,
    borderColor:'gray',
    borderWidth:0.5,
    borderRadius:8,
    paddingHorizontal:8,
  },
  icon:{
    marginRight:5,
  },
  label:{
    position:'absolute',
    backgroundColor:'white',
    left:22,
    top:8,
    zIndex:999,
    paddingHorizontal:8,
    fontSize: 14,
  },
  selectedTextStyle:{
    fontSize:16,
  },
  iconStyle:{
    width:20,
    height:20,
  },
  inputSearchStyle:{
    height:40,
    fontSize:16,
  },
});
