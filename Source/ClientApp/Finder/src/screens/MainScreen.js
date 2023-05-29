import {
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

// Import components
import { Button } from "../components/MainButton";
import { FilterButton } from "../components/FilterButton";
import { Filters } from "../components/FilterComponent";
import { useEffect, useState } from "react";
import { LocAdder } from "../components/AddLocation";

export function HomeScreen() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);
  const isLogged = useSelector((store) => store.isLogged.isLogged);

  useEffect(() => {
    (async () => {
      var { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      var location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 100,
      });
      setLocation(() => {
        return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
      });
    })();
  }, [location]);

  function MainScreen({ navigation, route }) {
    const [shelters, setShelters] = useState([]);
    const [isFound, setIsFound] = useState(false);
    const [typesFilters, setTypesFilters] = useState(route.params.types);
    const [purposesFilters, setPurposesFilters] = useState(
      route.params.purposes
    );
    const [hasRampFilter, setHasRampFilter] = useState(route.params.hasRamp);

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

              {markers &&
                markers.map((shelter) => (
                  <Marker
                    key={shelter.id}
                    coordinate={{
                      latitude: parseFloat(shelter.latitude),
                      longitude: parseFloat(shelter.longitude),
                    }}
                    title={shelter.address}
                    description={
                      "Відстань: " + Math.round(shelter.distance) + " метрів"
                    }
                    pinColor={shelters.indexOf(shelter) == 0 ? "green" : "red"}
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
      if (
        (hasRampFilter === undefined ||
          hasRampFilter === false ||
          hasRampFilter === "") &&
        typesFilters.length <= 0 &&
        purposesFilters.length <= 0
      ) {
        fetch(
          "http://10.0.2.2:4567/misc/nearest?lat=" +
            location.latitude +
            "&lng=" +
            location.longitude
        )
          .then((response) => response.json())
          .then((json) => setShelters(json))
          .catch((err) => console.error(err))
          .finally(() => setIsFound(true));
      } else {
        var url =
          "http://10.0.2.2:4567/misc/nearest/filters?lat=" +
          location.latitude +
          "&lng=" +
          location.longitude;
        if (typesFilters.length > 0) {
          url = url.concat("&type=", typesFilters.join());
        }
        if (purposesFilters.length > 0) {
          url = url.concat("&purpose=", purposesFilters.join());
        }
        if (hasRampFilter === true) {
          url = url.concat("&hasRamp=", hasRampFilter);
        }
        fetch(url)
          .then((response) => response.json())
          .then((json) => setShelters(json))
          .catch((err) => console.error(err));
      }
    }

    handleSave = () => {
      console.log("save position");
      navigation.navigate("Saver", {
        alias: "",
        position: {
          longitude: location.longitude,
          latitude: location.latitude,
        },
      });
    };

    return (
      <View style={styles.container}>
        {isLogged && location && (
          <View style={styles.save}>
            <Pressable
              style={({ pressed }) =>
                pressed ? styles.pressablePressed : styles.pressable
              }
              onPress={handleSave}
            >
              <Text style={styles.headeringText}>Зберегти поточне місце</Text>
              <Icon name="save" size={35} color={"#ee6c4d"} />
            </Pressable>
          </View>
        )}
        <View style={styles.listContainer}>
          <SheltersList />
        </View>
        {!errorMsg && (
          <View
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
                onPress={() =>
                  navigation.navigate("Filters", { parentWin: "Results" })
                }
              ></FilterButton>
            </View>
          </View>
        )}
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
            types: [],
            purposes: [],
            hasRamp: "",
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
        <RootStack.Screen
          name="Saver"
          component={LocAdder}
          initialParams={{
            alias: "",
            position: {
              longitude: "",
              latitude: "",
            },
          }}
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
  headeringText: {
    padding: 10,
    fontSize: 17,
    lineHeight: 21,
    fontFamily: "Monserrat-SemiBold",
    letterSpacing: 0.25,
    color: "#09008e",
    // color: "#ee6c4d"
  },
  save: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
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
