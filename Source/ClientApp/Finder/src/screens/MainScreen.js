import { StyleSheet, View, Platform, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

// Import components
import { Button } from "../components/MainButton";
import { FilterButton } from "../components/FilterButton";
import { Filters } from "../components/FilterComponent";
import { useEffect, useState } from "react";

export function HomeScreen() {
  const [typesFilters, setTypesFilters] = useState([]);
  const [purposesFilters, setPurposesFilters] = useState([]);
  const [hasRampFilter, setHasRampFilter] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      var { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      var location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });
      setLocation(() => {
        return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
      });
    })();
  }, []);

  

  function MainScreen({ navigation, route }) {
    const [fileteredShelters, setFilteredShelters] = useState([]);
    const [shelters, setShelters] = useState([]);
    const [isFound, setIsFound] = useState(false);

    function SheltersList({ navigation }) {
      if (location) {
        var markers = shelters || [];
        return (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
              loadingEnabled={true}
              loadingIndicatorColor="#666666"
              loadingBackgroundColor="#eeeeee"
              moveOnMarkerPress={true}
              showsUserLocation={true}
              showsCompass={true}
              showsPointsOfInterest={false}
              provider="google"
              zoomControlEnabled={true}
            >
              <Marker coordinate={location} pinColor={"blue"} title="Ви тут" />

              {markers.map((shelter) => (
                <Marker
                  key={shelter.id}
                  coordinate={{
                    latitude: parseFloat(shelter.latitude),
                    longitude: parseFloat(shelter.longitude),
                  }}
                  title={shelter.address}
                  pinColor={shelter.id == 0 ? "green" : "red"}
                />
              ))}
            </MapView>
          </View>
        );
      } else if (errorMsg) {
        return (
          <View>
            <Text>Для пошуку необхідно надати дозвіл до геопозиції</Text>
          </View>
        );
      } else {
        return (
          <View>
            <ActivityIndicator size="large" color="#ee6c4d" />
          </View>
        );
      }
    }

    function handleFind() {
      sheltersJson = require("./../../data/shelters.json");
      console.log(sheltersJson.shelters);
      setShelters(sheltersJson.shelters);
      setFilteredShelters(sheltersJson.shelters);
      console.log(shelters);
      setIsFound(() => {
        return true;
      });
    }

    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <SheltersList />
        </View>
        {!errorMsg && <View
          style={
            Platform.OS == "android"
              ? styles.buttonContainerAndroid
              : styles.buttonContainerIOS
          }
        >
          <View flex={3}>
            <Button title="Знайти" onPress={handleFind} />
          </View>
          <View flex={1}>
            <FilterButton
              onPress={() => navigation.navigate("Filters")}
            ></FilterButton>
          </View>
        </View>}
      </View>
    );
  }

  const RootStack = createNativeStackNavigator();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group>
        <RootStack.Screen
          name="Results"
          component={MainScreen}
          initialParams={{
            types: "types",
            purposes: "purposes",
            hasRamp: "hasRamp",
          }}
        />
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
          initialParams={{ parentWin: "Results" }}
        />
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
  mapContainer: {
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
