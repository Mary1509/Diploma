import { StyleSheet, View, Text, Button } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/actions/loginAction";
import { store } from "../redux/store";

export function UserScreen() {
  const dispatch = useDispatch();

  const isLogged = useSelector((store) => store.isLogged.isLogged);

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLogged) {
    return (
      <View style={styles.container}>
        <Text>User screen with list of options (After success login)</Text>
        <Button title="Logout" onPress={handleLogout}></Button>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Login screen</Text>
        <Button title="Login" onPress={handleLogin}></Button>
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
});
