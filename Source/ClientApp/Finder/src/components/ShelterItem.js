import { StyleSheet, View, Text, Pressable } from "react-native";

export function ShelterItem(props) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#210644" }}
        style={({pressed}) => pressed && styles.pressedItem}
        onPress={()=> console.log("Item pressed")}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5
  },
  goalText: {
    color: "#fff",
    padding: 8,
  },
});
