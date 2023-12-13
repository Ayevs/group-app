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
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./MainScreen.js";

export default function Screen() {
  const [loading, setLoading] = useState(true);
  const LOAD_AMOUNT = 30; //to adjust amount of items loaded
  const START_LOAD = 1;
  const [filters, setFilters] = useState({
    gun: null,
    wears: null,
    skin: null,
  });

  useEffect(() => {
    //USE THIS FUNCTION TO TEST WITH THE ACTUAL API
    //fetchData()

    //USE THIS FUNCTION TO TEST WITH THE OFFLINE JSON FILE
    updateState(TESTJSON);
  }, [filters]);

  const giveFilters = (g, w, s) => {
    setFilters({ gun: g, wears: w, skin: s });
  };

  const filtersChecked = (item) => {
    if (item != undefined) {
      if (filters.skin != null && item.name) {
        if (!item.name.toLowerCase().includes(filters.skin.toLowerCase())) {
          return false;
        }
      }
      if (filters.wears != null && item.exterior) {
        if (filters.wears[item.exterior] === false) {
          return false;
        }
      }
      if (filters.gun != null && item.gun) {
        if (!item.gun_type.includes(filters.gun)) {
          return false;
        }
      }
    }
    return true;
  };

  const updateState = (json) => {
    if (items.length > 0) {
      dispatch(resetState());
    }
    const keys = Object.keys(json.items_list);
    promises = [];
    let target = LOAD_AMOUNT;
    for (var i = START_LOAD; i < target; i++) {
      var key = keys[i];
      if (filtersChecked(json.items_list[key])) {
        promises.push(
          new Promise((resolve, reject) => {
            var key = keys[i];
            resolve(json.items_list[key]);
            reject(undefined);
          })
        );
      } else {
        if (target < keys.length) {
          target++;
        }
      }
      // console.log(promises.length);
    }

    Promise.all(promises)
      .then((val) => {
        val.forEach((item) => {
          // console.log(JSON.stringify(item)) commented because it was filling up my console like crazy - Alex
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
      {loading == true ? (
        <Loading />
      ) : (
        <NavigationContainer>
          <Tabs filter={giveFilters} />
        </NavigationContainer>
      )}
    </SafeAreaView>
  );
}
