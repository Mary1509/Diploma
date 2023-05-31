import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  ImageBackground,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useDispatch } from "react-redux";
import { login } from "../redux/actions/loginAction";
import { Button } from "./MainButton";
import { RegisterForm } from "./RegisterForm";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

const RootStack = createNativeStackNavigator();

const image = {
  uri: "https://res.cloudinary.com/dhvntmrax/image/upload/v1684583252/kyiv_map_prytvk_8a6df1.jpg",
};

export function LoginForm() {
  const dispatch = useDispatch();

  const [isErrorness, setIsErrorness] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function getUserById(url) {
    const responce = await fetch(url);
    return responce.json();
  }

  function Form({ navigation }) {
    const [useremail, setUserEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleLogin = async () => {
      var iserr = false;
      // console.log(useremail, md5(pass), isErrorness);
      if (useremail === "" || pass === "") {
        iserr = true;
        setIsErrorness(() => {
          return true;
        });
      } else {
        creds = {
          email: useremail,
          password: pass,
        };
        var response = await fetch("http://10.0.2.2:4567/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(creds),
        });

        data = await response.json();
        if (data.token == undefined) {
          iserr = true;
          setIsErrorness(() => {
            return true;
          });
          setErrorMsg(() => {
            return data.message;
          });
        }
      }

      if (!iserr) dispatch(login(data.token));
    };

    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.loginForm}>
            <Text style={styles.headingText}>Вхід</Text>
            <TextInput
              style={!isErrorness ? styles.textInputs : styles.textInputsError}
              placeholder="Email"
              value={useremail}
              onChangeText={(text) => {
                setUserEmail(text);
              }}
              onPressIn={() => setIsErrorness(false)}
            />
            <TextInput
              style={!isErrorness ? styles.textInputs : styles.textInputsError}
              placeholder="Пароль"
              secureTextEntry={true}
              value={pass}
              onChangeText={(text) => setPass(text)}
            />
            {isErrorness && (
              <Text style={styles.errText}>Помилка облікових даних: {errorMsg}</Text>
            )}
            <View style={styles.buttonContainer}>
              <Button title="Увійти" onPress={handleLogin}></Button>
              <Button
                title="Реєстрація"
                onPress={() => navigation.navigate("Register")}
              ></Button>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, headerTransparent: true }}
    >
      <RootStack.Group>
        <RootStack.Screen name="Login" component={Form} />
        <RootStack.Screen name="Register" component={RegisterForm} />
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
  loginForm: {
    width: 0.8 * width,
    height: 0.4 * height,
    borderRadius: 50,
    padding: 30,
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "#00296ba9",
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
    color: "#fff",
    alignSelf: "center",
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "column",
  },
  errText: {
    fontFamily: "Monserrat-SemiBold",
    fontSize: 15,
    color: "#fff",
    alignSelf: "center",
  },
});
