import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MenuCard from "../component/MenuCard";
export default function CollectionDetails() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        
      <View style={{ flex: .30, justifyContent: "center", alignItems: "center",flexDirection:'row' }}>
        <MenuCard
          menuTitle={"Collection By Month  "}
          iconName={"cash"}
          iconSize={80}
          iconColor={"gray"}
          onPress={() => navigation.navigate("TransactionHistory")}
        />
         <MenuCard
          menuTitle={"Collection By Year"}
          iconName={"cash"}
          iconSize={80}
          iconColor={"bark"}
          onPress={() => navigation.navigate("LoanDetails")}
        />
      </View>
      <View style={{ flex: .30, justifyContent: "center", alignItems: "center",flexDirection:'row' }}>
        <MenuCard
          menuTitle={"Collection By Employee"}
          iconName={"human-queue"}
          iconSize={80}
          iconColor={"blue"}
          onPress={() => navigation.navigate("EmployeeDetails")}
        />
         <MenuCard
          menuTitle={"Collection By Area"}
          iconName={"map"}
          iconSize={80}
          iconColor={"green"}
          onPress={() => navigation.navigate("MemberList")}
        />
      </View>
      <View style={{ flex: .30, justifyContent: "center", alignItems: "center",flexDirection:'row' }}>
        <MenuCard
          menuTitle={"Total Collection "}
          iconName={"account-cash"}
          iconSize={80}
          iconColor={"blue"}
          onPress={() => navigation.navigate("CollectionDetails")}
        />
         <MenuCard
          menuTitle={"Total Due"}
          iconName={"cash"}
          iconSize={80}
          iconColor={"red"}
          onPress={() => navigation.navigate("Summary")}
        />
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({})