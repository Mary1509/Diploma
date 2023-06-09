import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { DataTable } from "react-native-paper";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Button } from "./MainButton";

const { width, height } = Dimensions.get("window");

export function Location({ navigation, route }) {
  const [location, setLocation] = useState(null);
  const [shelters, setShelters] = useState([]);
  const [isFound, setIsFound] = useState(false);

  const isLogged = useSelector((store) => store.isLogged.isLogged);

  useEffect(() => {
    const locationsJson = require("./../../data/locations.json");
    fileteredLocation = locationsJson.locations.filter(
      (location) => location.id == route.params.id
    );
    console.log(fileteredLocation);
    // fetch if favourite
    setLocation(() => fileteredLocation[0]);
  }, []);

  function handleFind() {
    sheltersJson = require("./../../data/shelters.json");
    console.log(sheltersJson.shelters);
    setShelters(sheltersJson.shelters);
    console.log(shelters);
    setIsFound(() => {
      return true;
    });
  }

  if (location) {
    var markers = shelters || [];
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
            <Text style={styles.headeringText}>До списку</Text>
          </Pressable>
        </View>
        {location && (
          <View style={styles.tableStyle}>
            <Text style={styles.headeringText}>{location.alias}</Text>
          </View>
        )}
        {location && (
          <View flex={6}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(location.latitude),
                longitude: parseFloat(location.longitude),
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              loadingEnabled={true}
              loadingIndicatorColor="#666666"
              loadingBackgroundColor="#eeeeee"
              moveOnMarkerPress={true}
              showsCompass={true}
              showsPointsOfInterest={false}
              provider="google"
              zoomControlEnabled={true}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(location.latitude),
                  longitude: parseFloat(location.longitude),
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                pinColor={"orange"}
                title={location.alias}
                sho
              />

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
        )}
        <Button title="Знайти найближче" onPress={handleFind} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  headeringText: {
    padding: 10,
    fontSize: 17,
    lineHeight: 21,
    fontFamily: "Monserrat-SemiBold",
    letterSpacing: 0.25,
    color: "#09008e",
    // color: "#ee6c4d"
  },
  tableStyle: {
    width: "100%",
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTable: {
    fontSize: 20,
    lineHeight: 21,
    fontFamily: "Monserrat-SemiBold",
    letterSpacing: 0.25,
    color: "#09008e",
  },
  map: {
    width: width,
    height: height / 2,
  },
});
