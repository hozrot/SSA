import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BalanceCard({
  onPress,
  balanceTitle,
  iconName,
  iconSize = 40,
  balance,
  iconColor = "#6656FE",
  backgroundColor='#6656FE',
}) {
  return (
    <TouchableOpacity style={[styles.Container, { backgroundColor: backgroundColor }]}  onPress={onPress}>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <Text style={{ color: "white",textAlign:'center' }}> {balanceTitle} </Text>{" "}
      </View>

      <MaterialCommunityIcons
        name={iconName}
        size={iconSize}
        color={iconColor}
      />
      <Text style={{ color: "white", fontWeight: "bold" }}> {balance} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#6656FE",
    //backgroundColor: "#fc5c65",
    // backgroundColor: "#7fff00",
    borderRadius: 30,
    justifyContent: "space-around",
    alignItems: "center",

    margin: 5,
    padding: 5,
    height: 120,
  },
});
