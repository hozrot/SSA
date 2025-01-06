import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// need to import MenuCard Template like bellow
import MenuCard from "../component/MenuCard";

export default function Dashboard({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text> Total Collection : 1,50,000,000</Text>
        <Text> Total Paid : 1,10,500 </Text>
        <Text> Total Pending : 18,50,000 </Text>
        <Text> Total Asset : 5,000,000,000</Text>

      <View style={{ flex: .30, justifyContent: "center", alignItems: "center",flexDirection:'row' }}>
        <MenuCard
          menuTitle={"Transaction Hostory "}
          iconName={"history"}
          iconSize={80}
          iconColor={"green"}
          onPress={() => navigation.navigate("TransactionHistory")}
        />
         <MenuCard
          menuTitle={"Loan Details"}
          iconName={"cash"}
          iconSize={80}
          iconColor={"green"}
          onPress={() => navigation.navigate("LoanDetails")}
        />
      </View>
      <View style={{ flex: .30, justifyContent: "center", alignItems: "center",flexDirection:'row' }}>
        <MenuCard
          menuTitle={"Employee Details"}
          iconName={"human-queue"}
          iconSize={80}
          iconColor={"green"}
          onPress={() => navigation.navigate("EmployeeDetails")}
        />
         <MenuCard
          menuTitle={"Member List"}
          iconName={"text-box-multiple"}
          iconSize={80}
          iconColor={"green"}
          onPress={() => navigation.navigate("MemberList")}
        />
      </View>
      <View style={{ flex: .30, justifyContent: "center", alignItems: "center",flexDirection:'row' }}>
        <MenuCard
          menuTitle={"Collection Details"}
          iconName={"account-cash"}
          iconSize={80}
          iconColor={"green"}
          onPress={() => navigation.navigate("CollectionDetails")}
        />
         <MenuCard
          menuTitle={"Summary"}
          iconName={"stack-exchange"}
          iconSize={80}
          iconColor={"green"}
          onPress={() => navigation.navigate("Summary")}
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({});
