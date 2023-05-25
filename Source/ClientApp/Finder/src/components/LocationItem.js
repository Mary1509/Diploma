import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export function LocationItem(props) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#09008e", borderless: true}}
        style={({pressed}) => pressed && styles.pressedItem}
        onPress={props.onPress}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    width: width,
    height: 50,
    justifyContent: 'center',
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#F0F0F0",
  },
  pressedItem: {
    opacity: 0.5
  },
  goalText: {
    color: "#000",
    padding: 8,
    fontSize: 16,
    fontFamily: "Monserrat-SemiBold"
  },
});
