import { StyleSheet, View, Text, Button } from "react-native";

export function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home Screen with button 'Find', list of results (touchables) and filters</Text>
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
