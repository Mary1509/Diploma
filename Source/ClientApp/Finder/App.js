import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

// import screens
import { HomeScreen } from "./screens/MainScreen.js";
import { SheltersScreen } from "./screens/SheltersScreen.js";
import { AuthScreen } from "./screens/AuthScreen.js";
import { UserScreen } from "./screens/UserScreen.js";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fg6rdf",
          },
          headerRight: () => (
            <Button
              onPress={() => alert("Some button")}
              title="Info"
              color="#ff9fff"
            />
          ),
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "My home",
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Login"
          component={AuthScreen}
          options={{
            title: "Login",
          }}
        />
        <Tab.Screen
          name="Shelters"
          component={SheltersScreen}
          options={{
            title: "Shelters",
          }}
        />
        <Tab.Screen
          name="User"
          component={UserScreen}
          options={{
            title: "User",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
