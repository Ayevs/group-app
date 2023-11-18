//React imports
import { SafeAreaView, Text, FlatList, Image} from 'react-native';
import { useState, useEffect } from 'react'

//Redux imports
import { itemStore } from '../stores/store'
import { addItem, resetState } from '../reducers/itemslice'
import { useSelector, useDispatch } from 'react-redux';


export default function MainScreen() {
    const dispatch = useDispatch();

    const items = useSelector((state) => {
        return state.item.value
    })
    return (
      <SafeAreaView>
        <Text>test</Text>
        <FlatList 
            data = {items}
            renderItem={renderItem}/>
      </SafeAreaView>
    );
}

const renderItem = ({item}) => {
    return(
        <SafeAreaView>
            <Text>{item.name}</Text>
            <Image source={{ uri: img(item.icon_url) }} style = {{width: 100, height: 100}} />
        </SafeAreaView>
    )
}

const img = (id) => {
    const IMGPREFIX = 'https://steamcommunity-a.akamaihd.net/economy/image'
    const url = `${IMGPREFIX}/${id}`
    return url
}