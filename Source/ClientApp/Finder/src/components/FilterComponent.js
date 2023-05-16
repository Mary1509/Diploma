import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  Platform,
  FlatList,
} from "react-native";
import { Button } from "./MainButton";
import { Switch } from "react-native-paper";

export function Filters({ navigation }) {
  const [types, setTypes] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [filterTypes, setFilterTypes] = useState([]);
  const [filterPurposes, setFilterPurposes] = useState([]);

  function saveFilterHandler() {
    getFilters();
    navigation.navigate({
      name: 'Results',
      merge: true
    });
  }

  function cancelFilterHandler() {
    types.forEach((type) => {
      type.selected = ""
    });
    purposes.forEach((purpose) => {
      purpose.selected = ""
    })
    navigation.goBack();
  }

  useEffect(() => {
    if (types.length <= 0) {
      const typesJson = require("./../../data/types.json");
      setTypes(typesJson.types);
    } else setTypes(filterTypes);

    if (purposes.length <= 0) {
      const purposesJson = require("./../../data/purposes.json");
      setPurposes(purposesJson.purposes);
    } else setPurposes(filterPurposes);
  });

  function getFilters() {
    console.log(types, purposes);
    types.forEach((type) => {
      if (type["selected"] === "true") {
        setFilterTypes(...filterTypes, type)
      }
    });
    purposes.forEach((purpose) => {
      if (purpose["selected"] === "true") {
        setFilterPurposes(...filterPurposes, type)
      }
    })
  }

  function setTypeSwitchValue(val, id) {
    setTypes(...types, types[id].selected = val);
  }

  function setPurposeSwitchValue(val, id) {
    setPurposes(...purposes, purposes[id].selected = val);
  }

  const listTypeItem = (itemData, index) => {
    index = itemData.item.id;
    return (
      <View style={styles.filtersListItem}>
        <Text style={styles.listText}>{itemData.item.type}</Text>
        <Switch
          onValueChange={(val) => setTypeSwitchValue(val, index)}
          value={itemData.item.selected}
        />
      </View>
    );
  }

  const listPurposeItem = (itemData, index) => {
    index = itemData.item.id;
    return (
      <View style={styles.filtersListItem}>
        <Text style={styles.listText}>{itemData.item.purpose}</Text>
        <Switch
          onValueChange={(val) => setPurposeSwitchValue(val, index)}
          value={itemData.item.selected}
          style={styles.listSwitcher}
        />
      </View>
    );
  }

  return (
    <View
      style={
        Platform.OS == "android" ? styles.ContainerAndroid : styles.ContainerIOS
      }
    >
      <View style={styles.filtersContainer}>
        <Text style={styles.headeringText}>Тип укриття</Text>
        <FlatList data={types} renderItem={listTypeItem} keyExtractor={item => item.type} />
        <Text style={styles.headeringText}>Призначення</Text>
        <FlatList data={purposes} renderItem={listPurposeItem} keyExtractor={item => item.purpose} />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={cancelFilterHandler} title="Відміна" />
        <Button onPress={saveFilterHandler} title="Зберегти" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ContainerAndroid: {
    flex: 1,
    width: "100%",
    height: "50%",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "10%",
    borderColor: "#ffffff",
    backgroundColor: "#F0F0F0",
    elevation: 5,
  },
  ContainerIOS: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    shadowRadius: 10,
    shadowColor: "#000",
  },
  filtersContainer: {
    flex: 6,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
  headeringText: {
    padding: 15,
    fontSize: 20,
    lineHeight: 21,
    fontFamily: "Monserrat-SemiBold",
    letterSpacing: 0.25,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filtersListItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filtersListContainer: {},
  listText: {
    padding: 15,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "Monserrat-SemiBold",
    letterSpacing: 0.25,
  },
  listSwitcher: {},
});
