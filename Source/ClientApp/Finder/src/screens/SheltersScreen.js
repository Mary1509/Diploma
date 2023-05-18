import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ShelterItem } from "./../components/ShelterItem";
import { Filters } from "../components/FilterComponent";
import { FilterButton } from "../components/FilterButton";

export function SheltersScreen({ navigation }) {
  const [shelters, setShelters] = useState([]);
  const [fileteredShelters, setFilteredShelters] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const sheltersJson = require("./../../data/shelters.json");
    setShelters(sheltersJson.shelters);
    setFilteredShelters(sheltersJson.shelters);
  }, []);

  async function searchFilter(text) {
    if (text) {
      // const newShelters = shelters.filter((shelter) => {
      //   const shelterData = shelter.address
      //     ? shelter.address.toLowerCase()
      //     : "";
      //   const textData = text.toLowerCase();
      //   return shelterData.indexOf(textData) > -1;
      // });
      // console.log(newShelters);
      // await setFilteredShelters(newShelters);
      // await setSearch(text);
      // console.log(search);
      const newShelters = require("./../../data/shelters.json");
      const filtered = newShelters.shelters.filter((shelter) => {
        const shelterData = shelter.address
          ? shelter.address.toLowerCase()
          : "";
        const textData = text.toLowerCase();
        return shelterData.indexOf(textData) > -1;
      });
      console.log(filtered);
      setFilteredShelters(() => {
        return filtered;
      });
      setSearch(() => {
        return text;
      });
    } else {
      setFilteredShelters(shelters);
      setSearch(text);
    }
  }

  const RootStack = createNativeStackNavigator();

  const SearchAndFilters = () => {
    const [temp, setTemp] = useState("");

    return (
      <View style={styles.filterContainer}>
        <TextInput
          flex={5}
          style={styles.textInput}
          placeholder="Введіть адресу для пошуку"
          value={temp.text}
          onChangeText={(text) => setTemp(text)}
          onSubmitEditing={() => searchFilter(temp)}
        />
        <FilterButton flex={1} onPress={() => navigation.navigate("Filters")} />
      </View>
    );
  };

  function SheltersList({ navigation }) {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <FlatList
            data={fileteredShelters}
            renderItem={(itemData) => {
              return (
                <ShelterItem
                  text={itemData.item.address}
                  id={itemData.item.id}
                />
              );
            }}
          />
        </View>
        <SearchAndFilters />
      </View>
    );
  }

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, headerTransparent: true }}
    >
      <RootStack.Group>
        <RootStack.Screen name="SheltersList" component={SheltersList} />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{
          presentation: "transparentModal",
          animation: "fade_from_bottom",
        }}
      >
        <RootStack.Screen
          name="Filters"
          component={Filters}
          initialParams={{ parentWin: "SheltersList" }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    flex: 1,
    width: "100%",
    height: "10%",
    flexDirection: "row",
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 7,
  },
  textInput: {
    fontFamily: "Monserrat-SemiBold",
    borderColor: "#ee6c4d",
    borderWidth: 1,
    fontSize: 16,
    padding: 3,
    height: 50,
    borderRadius: 10,
  },
});
