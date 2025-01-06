import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MenuCard from "../component/MenuCard";

export default function Summary() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  

  <View style={{ flex: .30, justifyContent: "center", alignItems: "center",flexDirection:'row' }}>
    <MenuCard
      menuTitle={"Total Asset "}
      iconName={"file"}
      iconSize={80}
      iconColor={"red"}
      //onPress={() => navigation.navigate("TransactionHistory")}
    />
     <MenuCard
      menuTitle={"Total"}
      iconName={"bird"}
      iconSize={80}
      iconColor={"green"}
     // onPress={() => navigation.navigate("LoanDetails")}
    />
  </View>
  <View style={{ flex: .30, justifyContent: "center", alignItems: "center",flexDirection:'row' }}>
    <MenuCard
      menuTitle={"Total Loan "}
      iconName={"cash"}
      iconSize={80}
      iconColor={"green"}
      onPress={() => navigation.navigate("EmployeeDetails")}
    />
     <MenuCard
      menuTitle={"Total Savings "}
      iconName={"text-box-multiple"}
      iconSize={80}
      iconColor={"red"}
      onPress={() => navigation.navigate("MemberList")}
    />
  </View>
  <View style={{ flex: .30, justifyContent: "center", alignItems: "center",flexDirection:'row' }}>
    <MenuCard
      menuTitle={"Total Member"}
      iconName={"account-cash"}
      iconSize={80}
      iconColor={"red"}
      onPress={() => navigation.navigate("CollectionDetails")}
    />
     <MenuCard
      menuTitle={"Total Employee"}
      iconName={"stack-exchange"}
      iconSize={80}
      iconColor={"green"}
      onPress={() => navigation.navigate("Summary")}
    />
  </View>
  
</View>
  )
}

const styles = StyleSheet.create({})