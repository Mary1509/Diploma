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
  // const [filterTypes, setFilterTypes] = useState([]);
  // const [filterPurposes, setFilterPurposes] = useState([]);

  function saveFilterHandler() {
    getFilters();
    navigation.goBack();
  }

  useEffect(() => {
    if (typeof filterTypes == "undefined") {
      const typesJson = require("./../../data/types.json");
      typesJson.types.forEach((type) => {
        type["switch"] = "false";
      });
      setTypes(typesJson.types);
    } else setTypes(filterTypes);

    if (typeof filterPurposes == "undefined") {
      const purposesJson = require("./../../data/purposes.json");
      purposesJson.purposes.forEach((purpose) => {
        purpose["switch"] = "false";
      });
      setPurposes(purposesJson.purposes);
    } else setPurposes(filterPurposes);
  });

  function getFilters() {
    console.log(types, purposes);
  }

  function setTypeSwitchValue(val, id) {
    types[id].switch = String(val);
    return setTypes([...types]);
  }

  function setPurposeSwitchValue(val, id) {
    const temp = JSON.parse(JSON.stringify(purposes));
    console.log(id, temp[id], val);
    temp[id].switch = String(val);
    console.log(temp)
    setPurposes(temp);
    console.log(purposes);
    // setFilterPurposes(temp);
  }

  function listTypeItem(itemData, index) {
    index = itemData.item.id;
    return (
      <View style={styles.filtersListItem}>
        <Text style={styles.listText}>{itemData.item.type}</Text>
        <Switch
          onValueChange={(val) => setTypeSwitchValue(val, index)}
          value={itemData.item.switch}
        />
      </View>
    );
  }

  function listPurposeItem(itemData, index) {
    index = itemData.item.id;
    return (
      <View style={styles.filtersListItem}>
        <Text style={styles.listText}>{itemData.item.purpose}</Text>
        <Switch
          onValueChange={(val) => setPurposeSwitchValue(val, index)}
          value={itemData.item.switch}
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
        <FlatList data={types} renderItem={listTypeItem} />
        <Text style={styles.headeringText}>Призначення</Text>
        <FlatList data={purposes} renderItem={listPurposeItem} />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.goBack()} title="Відміна" />
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
