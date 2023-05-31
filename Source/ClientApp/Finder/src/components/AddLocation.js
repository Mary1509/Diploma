import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { LocationEdit } from "./LocationEdit";

const { width, height } = Dimensions.get("window");

export function LocAdder({ navigation, route }) {
  const [location, setLocation] = useState(route.params.location);
  const [childLoc, setChildLoc] = useState(route.params.location);
  const token = useSelector((store) => store.isLogged.token);

  editorHandler = (childLoc) => {
    setChildLoc(() => childLoc);
  };

  handleSave = async () => {
    console.log(childLoc);
    var response = await fetch("http://10.0.2.2:4567/user/locations/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(childLoc),
    });
    navigation.goBack();
  };

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
          <Text style={styles.headeringText}>Назад</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) =>
            pressed ? styles.pressablePressed : styles.pressable
          }
          onPress={handleSave}
        >
          <Text style={styles.headeringText}>Зберегти</Text>
          <Icon name="save" size={35} color={"#ee6c4d"} />
        </Pressable>
      </View>
      <LocationEdit
        location={
          route.params.location
            ? route.params.location
            : { alias: "", position: route.params.position }
        }
        callBack={editorHandler}
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
    flex: 7,
    backgroundColor: "#f0f0f0",
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
});
