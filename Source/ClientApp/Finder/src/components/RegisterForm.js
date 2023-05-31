import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { useDispatch } from "react-redux";
import { login } from "../redux/actions/loginAction";
import { Button } from "./MainButton";

const { width, height } = Dimensions.get("window");

export function RegisterForm({ navigation }) {
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function getUserById(url) {
    const responce = await fetch(url);
    return responce.json();
  }

  const handleRegister = () => {
    dispatch(login());
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
      </View>
      <View style={styles.loginForm}>
        <Text style={styles.headingText}>Реєстрація</Text>
        <TextInput
          style={styles.textInputs}
          placeholder="Ваше ім'я"
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
        />
        <TextInput
          style={styles.textInputs}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.textInputs}
          placeholder="Пароль"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Зареєструватися" onPress={handleLogin}></Button>
        </View>
      </View>
    </View>
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
  loginForm: {
    padding: 30,
    width: width,
    height: 0.78 * height,
    alignItems: "stretch",
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
  image: {
    flex: 1,
    resizeMode: "cover",
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    fontFamily: "Monserrat-SemiBold",
    fontSize: 20,
    paddingHorizontal: 5,
    color: "#00296b",
    alignSelf: "center",
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "column",
  },
  header: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#878787",
    borderBottomWidth: 0.75,
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
});
