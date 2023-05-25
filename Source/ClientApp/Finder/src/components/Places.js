import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";

import { LocationItem } from "./LocationItem";
import { Location } from "./LocationComponent";

export function Places({ navigation }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const locationsJson = require("./../../data/locations.json");
    setLocations(locationsJson.locations);
  }, []);

  const RootStack = createNativeStackNavigator();

  function LocationsList({ navigation }) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) =>
              pressed ? styles.pressablePressed : styles.pressable
            }
            onPress={() => navigation.goBack()}
          >
            <Icon name="caret-left" size={35} color={"#ee6c4d"} />
            <Text style={styles.headeringText}>Назад</Text>
          </Pressable>
        </View>
        <View style={styles.container}>
          <FlatList
            data={locations}
            renderItem={(itemData) => {
              return (
                <LocationItem
                  text={itemData.item.alias}
                  onPress={() =>
                    navigation.navigate("Location", {
                      id: itemData.item.id,
                    })
                  }
                />
              );
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, headerTransparent: true }}
      initialRouteName="LocationsList"
    >
      <RootStack.Group>
        <RootStack.Screen name="LocationsList" component={LocationsList} />
        <RootStack.Screen name="Location" component={Location} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 12,
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
  header: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#878787",
    borderBottomWidth: 0.5,
  },
  headeringText: {
    padding: 10,
    fontSize: 17,
    lineHeight: 21,
    fontFamily: "Monserrat-SemiBold",
    letterSpacing: 0.25,
    color: "#09008e",
    // color: "#ee6c4d"
  },
  pressable: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pressablePressed: {
    opacity: 0.5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
