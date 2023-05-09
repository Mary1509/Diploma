import { StyleSheet, View, Text, Button, TextInput } from "react-native";

import { useDispatch } from "react-redux";
import { login } from "../redux/actions/loginAction";

export function LoginForm() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <View>
        <TextInput placeholder="Username" />
        <TextInput placeholder="Password" />
      </View>
      <Button title="Login" onPress={handleLogin}></Button>
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
});
