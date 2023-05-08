import { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export function AuthScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Login Here</Text>
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
