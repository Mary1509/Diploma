import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");

export function UserOptionItem(props) {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: "#09008e", borderless: true }}
        style={({ pressed }) => pressed && styles.pressedItem}
        onPress={props.onPress}
      >
        <View style={styles.goalItem}>
          <Icon name={props.icon} size={30} color={"#898989"} />
          <Text style={styles.goalText}>{props.text}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 0.95 * width,
    height: 70,
    justifyContent: "center",
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#F0F0F0",
  },
  pressedItem: {
    opacity: 0.5,
    alignContent: "center",
  },
  goalText: {
    color: "#000",
    padding: 8,
    fontSize: 18,
    fontFamily: "Monserrat-SemiBold",
  },
  goalItem: {
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10
  },
});
