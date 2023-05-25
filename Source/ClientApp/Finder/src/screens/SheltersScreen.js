import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";

import { ShelterItem } from "./../components/ShelterItem";
import { Filters } from "../components/FilterComponent";
import { FilterButton } from "../components/FilterButton";
import { useSelector, useDispatch } from "react-redux";
import { Shelter } from "../components/ShelterComponent";
import { ShelterEdit } from "../components/ShelterEdit";
import { Adder } from "../components/AddShelter";

export function SheltersScreen({ navigation }) {
  const [shelters, setShelters] = useState([]);
  const [fileteredShelters, setFilteredShelters] = useState([]);
  const [search, setSearch] = useState("");

  const isLogged = useSelector((store) => store.isLogged.isLogged);

  async function searchFilter(text) {
    if (text) {
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
          value={search.text}
          onChangeText={(text) => setTemp(text)}
          onSubmitEditing={() => searchFilter(temp)}
        />
        <FilterButton flex={1} onPress={() => navigation.navigate("Filters")} />
      </View>
    );
  };

  function SheltersList({ navigation, route }) {
    const [typesFilters, setTypesFilters] = useState(route.params.types);
    const [purposesFilters, setPurposesFilters] = useState(
      route.params.purposes
    );
    const [hasRampFilter, setHasRampFilter] = useState(route.params.hasRamp);

    useEffect(() => {
      const sheltersJson = require("./../../data/shelters.json");
      setShelters(sheltersJson.shelters);
      console.log(typesFilters);
      setFilteredShelters(sheltersJson.shelters);
    }, [typesFilters, purposesFilters, hasRampFilter]);

    return (
      <View style={styles.container}>
        {search && (
          <View style={styles.searchLabel}>
            <Text style={styles.searchText}>{search}</Text>
            <Pressable
              onPress={() => {
                setSearch("");
                setFilteredShelters(() => {
                  return shelters;
                });
              }}
            >
              <Icon name="times" size={20} color={"white"} />
            </Pressable>
          </View>
        )}
        {fileteredShelters ? (
          <View style={styles.container}>
            <FlatList
              data={fileteredShelters}
              renderItem={(itemData) => {
                return (
                  <ShelterItem
                    text={itemData.item.address}
                    onPress={() =>
                      navigation.navigate("Shelter", {
                        id: itemData.item.id,
                      })
                    }
                  />
                );
              }}
            />
          </View>
        ) : (
          <ActivityIndicator />
        )}
        <SearchAndFilters />
      </View>
    );
  }

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, headerTransparent: true }}
      initialRouteName="SheltersList"
    >
      <RootStack.Group>
        <RootStack.Screen
          name="SheltersList"
          component={SheltersList}
          initialParams={{
            types: [],
            purposes: [],
            hasRamp: "",
          }}
        />
        <RootStack.Screen name="Shelter" component={Shelter} />
        <RootStack.Screen name="Editor" component={Adder} />
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
  searchLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ee6c4d",
    elevation: 20,
    borderWidth: 1,
    borderColor: "#ee6c4d",
    borderRadius: 15,
    padding: 10,
    margin: 10,
  },
  searchText: {
    fontFamily: "Monserrat-SemiBold",
    fontSize: 15,
    paddingHorizontal: 5,
    color: "#fff",
  },
});
