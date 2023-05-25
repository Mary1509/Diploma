import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/loginAction";
import { Button } from "./MainButton";
import { useEffect, useState } from "react";
import { UserOptionItem } from "./UserOptionItem";
import { Favourites } from "./Favourites";
import { Adder } from "./AddShelter";
import { Places } from "./Places";

const { width, height } = Dimensions.get("window");

const RootStack = createNativeStackNavigator();

export function UserComponent({ navigation }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersJson = require("./../../data/users.json");
    fileteredUser = usersJson.users.filter((user) => user.id == "0");
    console.log(fileteredUser);
    // fetch if favourite
    setUser(() => fileteredUser[0]);
  }, []);

  async function getUserById(url) {
    const responce = await fetch(url);
    return responce.json();
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  function UserProfile({ navigation }) {
    if (user) {
      return (
        <View style={styles.container}>
          <View style={styles.exit}>
            <Pressable
              onPress={handleLogout}
              style={({ pressed }) =>
                pressed ? { opacity: 0.5 } : styles.exit
              }
            >
              <Icon name="sign-out-alt" size={50} color={"#ee6c4d"} />
            </Pressable>
          </View>
          <View style={styles.header}>
            <View style={styles.userCircle}>
              <Icon name="user" size={50} color={"#ee6c4d"} />
            </View>
            <Text style={styles.headingText}>{user.displayName}</Text>
          </View>
          <View style={styles.options}>
            <UserOptionItem
              icon="star"
              text="Обрані укриття"
              onPress={() => navigation.navigate("Favourites")}
            />
            <UserOptionItem
              icon="map-marker-alt"
              text="Збережені місця"
              onPress={() => navigation.navigate("Places")}
            />
            <UserOptionItem
              icon="plus"
              text="Додати укриття"
              onPress={() => navigation.navigate("Adder", {shelter: {}})}
            />
          </View>
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

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, headerTransparent: true }}
      initialRouteName="Profile"
    >
      <RootStack.Group>
        <RootStack.Screen name="Profile" component={UserProfile} />
        <RootStack.Screen name="Favourites" component={Favourites} />
        <RootStack.Screen name="Places" component={Places} />
        <RootStack.Screen name="Adder" component={Adder} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  options: {
    flex: 2,
    width: width,
    justifyContent: "center",
    backgroundColor: "#fff",
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
  headingText: {
    fontFamily: "Monserrat-SemiBold",
    fontSize: 20,
    paddingHorizontal: 5,
    color: "#00296b",
    alignSelf: "center",
    margin: 10,
  },
  header: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  userCircle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: width / 3,
    height: width / 3,
    borderRadius: 70,
    elevation: 20,
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
  exit: {
    alignSelf: "flex-end",
    overflow: "visible",
  },
});
