import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

// Redux
import { Provider } from "react-redux";
import { store } from "./src/redux/store.js";

// import screens
import { HomeScreen } from "./src/screens/MainScreen.js";
import { SheltersScreen } from "./src/screens/SheltersScreen.js";
import { UserScreen } from "./src/screens/UserScreen.js";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: true,
          }}
        >
          <Tab.Screen
            name="Finder"
            component={HomeScreen}
            options={{
              title: "Знайти",
              tabBarIcon: ({ color }) => (
                <Icon name="search-location" color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="Shelters"
            component={SheltersScreen}
            options={{
              title: "Укриття",
              tabBarIcon: ({ color }) => (
                <Icon name="landmark" color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="User"
            component={UserScreen}
            initialParams={{}}
            options={{
              title: "User",
              tabBarIcon: ({ color }) => (
                <Icon name="user" color={color} size={20} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
