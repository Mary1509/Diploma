import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Platform,
  FlatList,
} from "react-native";
import { Button } from "./MainButton";
import { Switch } from "react-native-paper";

export function Filters({ navigation, route }) {
  const [types, setTypes] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [filterTypes, setFilterTypes] = useState([]);
  const [filterPurposes, setFilterPurposes] = useState([]);

  const [hasRamp, setHasRamp] = useState();


  function saveFilterHandler() {
    getFilters();
    navigation.navigate(route.params.parentWin, {
      types: filterTypes,
      purposes: filterPurposes,
      hasRamp: hasRamp,
    });
  }

  function cancelFilterHandler() {
    types.forEach((type) => {
      type.selected = "";
    });
    setTypes([...types]);
    purposes.forEach((purpose) => {
      purpose.selected = "";
    });
    setPurposes([...purposes]);
    getFilters();
    setHasRamp(false);
    navigation.navigate(route.params.parentWin, {
      types: filterTypes,
      purposes: filterPurposes,
      hasRamp: hasRamp,
    });
  }

  useEffect(() => {
    const typesJson = require("./../../data/types.json");
    setTypes(typesJson.types);
    const purposesJson = require("./../../data/purposes.json");
    setPurposes(purposesJson.purposes);
  });

  function getFilters() {
    types.forEach((type) => {
      if (type.selected === true) {
        filterTypes.push(type.id);
        setFilterTypes([...filterTypes]);
      }
    });
    purposes.forEach((purpose) => {
      if (purpose.selected === true) {
        filterPurposes.push(purpose.id);
        setFilterPurposes([...filterPurposes]);
      }
    });
  }

  function setTypeSwitchValue(val, id) {
    setTypes(...types, (types[id].selected = val));
  }

  function setPurposeSwitchValue(val, id) {
    setPurposes(...purposes, (purposes[id].selected = val));
  }

  function setRampSwitchValue(val) {
    setHasRamp(() => val);
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
  };

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
  };

  return (
    <View
      style={
        Platform.OS == "android" ? styles.ContainerAndroid : styles.ContainerIOS
      }
    >
      <View style={styles.filtersContainer}>
        <Text style={styles.headeringText}>Тип укриття</Text>
        <FlatList
          data={types}
          renderItem={listTypeItem}
          keyExtractor={(item) => item.type}
        />
        <Text style={styles.headeringText}>Призначення</Text>
        <FlatList
          data={purposes}
          renderItem={listPurposeItem}
          keyExtractor={(item) => item.purpose}
        />
        <View style={styles.filtersListItem}>
          <Text style={styles.headeringText}>Наявність пандусу</Text>
          <Switch
            onValueChange={setRampSwitchValue}
            value={hasRamp}
            style={styles.listSwitcher}
          />
        </View>
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
    padding: 5,
  },
  headeringText: {
    padding: 15,
    fontSize: 20,
    lineHeight: 21,
    fontFamily: "Monserrat-SemiBold",
    letterSpacing: 0.25,
    color: "#09008e",
    // color: "#ee6c4d"
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
    color: "#000",
  },
  listSwitcher: {
    color: "#ee6c4d",
  },
});
