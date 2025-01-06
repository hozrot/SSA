import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MenuCard from "../component/MenuCard";

export default function LoanDetails() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <View style={{ flex: .30, justifyContent: "center", alignItems: "center",flexDirection:'row' }}>
    <MenuCard
      menuTitle={"Total Loan Given  "}
      iconName={"history"}
      iconSize={80}
      iconColor={"green"}
      onPress={() => navigation.navigate("TransactionHistory")}
    />
    
  </View>
  <View style={{ flex: .30, justifyContent: "center", alignItems: "center",flexDirection:'row' }}>
  
   <MenuCard
    menuTitle={"Total Collected Loan Amount "}
    iconName={"cash"}
    iconSize={80}
    iconColor={"green"}
    onPress={() => navigation.navigate("LoanDetails")}
  />
</View>
</View>
  )
}

const styles = StyleSheet.create({})