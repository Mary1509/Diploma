import { useState } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";

// Import components
import { Button } from "../components/MainButton";
import { FilterButton } from "../components/FilterButton";
import { Filters } from "../components/FilterComponent";

export function HomeScreen() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Filters visible={modalIsVisible} onCancel={() => setModalIsVisible(false)}/>
      <View style={styles.listContainer}>
        <Text>Results list</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View flex={3}>
          <Button
            title="Знайти"
            onPress={() => console.log("Button pressed")}
          />
        </View>
        <View flex={1}>
          <FilterButton onPress={() => setModalIsVisible(true)}></FilterButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  listContainer: {
    flex: 6,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "red",
    paddingHorizontal: 30,
  },
  buttonStyle: {},
});
