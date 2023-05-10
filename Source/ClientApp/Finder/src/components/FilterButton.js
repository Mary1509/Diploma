import React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export function FilterButton(props) {
  const { onPress, onRes } = props;
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => (pressed ? styles.pressedItem : styles.button)}
      >
        <Icon name="filter" color="#ffffff" size={20} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: "#ee6c4d",
  },
  pressedItem: {
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: "#ee6c4d",
  },
});
