import React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Button } from "./MainButton";

export function Filters(props) {
  const { visible, onCancel, onSave, style } = props;
  return (
    <Modal style={styles.filtersContainer} visible={props.visible} animationType="slide" transparent={true}>
      <View style={styles.filtersContainer}>
        <Text>Filters</Text>
        <View flex={1}>
          <Button onPress={props.onCancel} title="Cancel" />
        </View>
        <View flex={1}>
          <Button onPress={onSave} title="Save" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  filtersContainer: {
    flex: 1,
    height: "70%",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "10%",
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    borderWidth: 2
  },
});
