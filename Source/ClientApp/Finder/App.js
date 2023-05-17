import { useCallback } from "react";
import { StyleSheet } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

// Redux
import { Provider } from "react-redux";
import { store } from "./src/redux/store.js";

// import screens
import { HomeScreen } from "./src/screens/MainScreen.js";
import { SheltersScreen } from "./src/screens/SheltersScreen.js";
import { UserScreen } from "./src/screens/UserScreen.js";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Monserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer onLayout={onLayoutRootView}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#ee6c4d",
            tabBarInactiveTintColor: "#ffffff",
            tabBarStyle: {
              backgroundColor: "#00296b",
            },
            headerTintColor: "#ffffff",
            headerStyle: {
              backgroundColor: "#00296b",
            },
            headerTitleStyle: {
              fontFamily: "Monserrat-SemiBold",
            }
            
          }}
        >
          <Tab.Screen
            name="Finder"
            component={HomeScreen}
            options={{
              title: "Знайти",
              tabBarIcon: ({ color }) => (
                <Icon name="search-location" color={color} size={30} />
              ),
            }}
          />
          <Tab.Screen
            name="Shelters"
            component={SheltersScreen}
            options={{
              title: "Укриття",
              tabBarIcon: ({ color }) => (
                <Icon name="landmark" color={color} size={30} />
              ),
            }}
          />
          <Tab.Screen
            name="User"
            component={UserScreen}
            initialParams={{}}
            options={{
              title: "Профіль",
              tabBarIcon: ({ color }) => (
                <Icon name="user" color={color} size={30} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: "#e0fbfc",
    alignItems: "center",
    justifyContent: "center",
  },
});
