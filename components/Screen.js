//Native imports
import { SafeAreaView, Text } from "react-native";
import { useState, useEffect } from "react";

//Component imports
import Loading from "./Loading.js";
import MainScreen from "./MainScreen.js";

//Redux imports
import { addItem, resetState } from "../reducers/itemslice";
import { useSelector, useDispatch } from "react-redux";

//Misc imports
import TESTJSON from "../JSON_TEST/state.json";

export default function Screen() {
  const [loading, setLoading] = useState(true);
  const LOAD_AMOUNT = 100;
  const START_LOAD = 1;

  useEffect(() => {
    dispatch(resetState());

    //USE THIS FUNCTION TO TEST WITH THE ACTUAL API
    //fetchData()

    //USE THIS FUNCTION TO TEST WITH THE OFFLINE JSON FILE
    updateState(TESTJSON);
  }, []);

  const updateState = (json) => {
    const keys = Object.keys(json.items_list);
    promises = [];
    for (var i = START_LOAD; i < START_LOAD + LOAD_AMOUNT; i++) {
      promises.push(
        new Promise((resolve, reject) => {
          var key = keys[i];
          resolve(json.items_list[key]);
          reject(undefined);
        })
      );
    }

    Promise.all(promises)
      .then((val) => {
        val.forEach((item) => {
          // console.log(JSON.stringify(item)) commented because it was filling up my console like crazy
          if (item.marketable == 1 && item.tradable == 1) {
            dispatch(addItem(item));
          }
        });
        setLoading(false);
      })
      .catch(() => {
        console.log("there was an error");
      });
  };

  const fetchData = () => {
    fetch(
      "http://csgobackpack.net/api/GetItemsList/v2/?no_prices=true&details=icon&limit=10"
    )
      .then((res) => res.json())
      .then((json) => {
        updateState(json);
      });
  };

  const dispatch = useDispatch();

  const items = useSelector((state) => {
    return state.item.value;
  });

  return (
    <SafeAreaView>
      {loading == true ? <Loading /> : <MainScreen />}
    </SafeAreaView>
  );
}
