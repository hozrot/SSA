import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MenuCard from "../component/MenuCard";

export default function TransactionHistory({navigation}) {
  return (
    <View style={{ flex: .30, justifyContent: "center", alignItems: "center",flexDirection:'row' }}>
    <MenuCard
      menuTitle={"Daily Collection Total "}
      iconName={"cash"}
      iconSize={80}
      iconColor={"green"}
      onPress={() => navigation.navigate("Dashboard")}
    />
     <MenuCard
      menuTitle={"Monthly Collection Total"}
      iconName={"cash"}
      iconSize={80}
      iconColor={"green"}
      onPress={() => navigation.navigate("Dashboard")}
    />
  </View>
  )
}

const styles = StyleSheet.create({})