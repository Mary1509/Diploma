import { StyleSheet, View, Text, Modal, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import components
import { Button } from "../components/MainButton";
import { FilterButton } from "../components/FilterButton";
import { Filters } from "../components/FilterComponent";
import { useState } from "react";

export function HomeScreen() {
  const [typesFilters, setTypesFilters] = useState([]);
  const [purposesFilters, setPurposesFilters] = useState([]);
  const [hasRampFilter, setHasRampFilter] = useState("");

  function saveFilterHandler() {
    // apply filters
    setModalIsVisible(false);
  }

  function MainScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}></View>
        <View
          style={
            Platform.OS == "android"
              ? styles.buttonContainerAndroid
              : styles.buttonContainerIOS
          }
        >
          <View flex={3}>
            <Button
              title="Знайти"
              onPress={() => console.log("Button pressed")}
            />
          </View>
          <View flex={1}>
            <FilterButton
              onPress={() => navigation.navigate("Filters")}
            ></FilterButton>
          </View>
        </View>
      </View>
    );
  }

  const RootStack = createNativeStackNavigator();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group>
        <RootStack.Screen name="Results" component={MainScreen} />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
        }}
      >
        <RootStack.Screen name="Filters" component={Filters} />
      </RootStack.Group>
    </RootStack.Navigator>
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
  buttonContainerAndroid: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ffffff",
    elevation: 3,
    paddingHorizontal: 30,
  },
  buttonContainerIOS: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ffffff",
    shadowRadius: 10,
    shadowColor: "#000",
    paddingHorizontal: 30,
  },
});
