import React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";

export function Button(props) {
  const { onPress, title = "Save" } = props;
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => (pressed ? styles.pressedItem : styles.button)}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "Monserrat-SemiBold",
    letterSpacing: 0.25,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 5,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#ee6c4d",
  },
  pressedItem: {
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 5,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#ee6c4d",
  },
});
