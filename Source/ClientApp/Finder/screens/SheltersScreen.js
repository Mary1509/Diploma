import { StyleSheet, View, Text, Button } from "react-native";

export function SheltersScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Shelters list with filter</Text>
      <Button
        title="Go to login"
        onPress={() => navigation.push("Login", { item: "someItem" })}
      ></Button>
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