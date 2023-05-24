import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Dimensions,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Checkbox } from "expo-checkbox";

const { width, height } = Dimensions.get("window");

export function LocationEdit(props) {
  const [position, setPosition] = useState(null);
  const [isErrorness, setIsErrorness] = useState(false);
  const [location, setLocation] = useState(props.location);

  useEffect(() => {
    props.location.position &&
      setPosition({
        latitude: parseFloat(props.location.position.latitude),
        longitude: parseFloat(props.location.position.longitude),
      });
  }, []);

  useEffect(() => {
    props.callBack(location);
  }, [location]);

  handlePointSelection = (event) => {
    positionNew = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
    setPosition(() => positionNew);
    setShelter({
      ...shelter,
      longitude: positionNew.longitude,
      latitude: positionNew.latitude,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableStyle}>
        <TextInput
          style={!isErrorness ? styles.textInputs : styles.textInputsError}
          placeholder="Назва"
          value={location.alias}
          onChangeText={(text) => setLocation({ ...location, alias: text })}
        />
      </View>
      <View flex={6}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 50.450001,
            longitude: 30.523333,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          loadingEnabled={true}
          loadingIndicatorColor="#666666"
          loadingBackgroundColor="#eeeeee"
          moveOnMarkerPress={true}
          showsCompass={true}
          showsPointsOfInterest={true}
          provider="google"
          zoomControlEnabled={true}
          onPress={(point) => handlePointSelection(point)}
        >
          {position && (
            <Marker
              coordinate={position}
              pinColor={"orange"}
              title="Локація укриття"
            />
          )}
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 0.75 * height,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
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
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "Monserrat-SemiBold",
    letterSpacing: 0.25,
    color: "#09008e",
    // color: "#ee6c4d"
  },
  tableStyle: {
    width: "100%",
    flex: 7,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  headerTable: {
    fontSize: 20,
    lineHeight: 21,
    fontFamily: "Monserrat-SemiBold",
    letterSpacing: 0.25,
    color: "#09008e",
    // color: "#ee6c4d"
  },
  map: {
    width: width,
    height: height / 3,
  },
  textInputs: {
    fontFamily: "Monserrat-SemiBold",
    borderColor: "#00296b",
    borderWidth: 1,
    fontSize: 16,
    padding: 3,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  textInputsError: {
    fontFamily: "Monserrat-SemiBold",
    borderColor: "#ee6c4d",
    borderWidth: 3,
    fontSize: 16,
    padding: 3,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
