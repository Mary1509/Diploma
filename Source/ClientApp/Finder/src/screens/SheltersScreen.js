import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, FlatList } from "react-native";

import { ShelterItem } from "./../components/ShelterItem";

export function SheltersScreen({ navigation }) {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    const sheltersJson = require("./../../data/shelters.json");
    setShelters(sheltersJson.shelters);
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={shelters}
        renderItem={(itemData) => {
          return (
            <ShelterItem text={itemData.item.address} id={itemData.item.id} />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
