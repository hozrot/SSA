import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// need to import MenuCard Template like bellow
import MenuCard from "../component/MenuCard";
import BalanceCard from "../component/BalanceCard";

export default function Dashboard({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'green' }}>
      {/* <Text> Total Collection : 1,50,000,000</Text>
        <Text> Total Paid : 1,10,500 </Text>
        <Text> Total Pending : 18,50,000 </Text>
        <Text> Total Asset : 5,000,000,000</Text> */}
      <View style={{ flex: .30, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <BalanceCard
          balanceTitle={"Loan"}
          iconName={"briefcase-search-outline"}
          iconSize={60}
          iconColor={"white"}
          balance={25000}
        />
        <BalanceCard
          balanceTitle={"Savings "}
          iconName={"briefcase-clock-outline"}
          iconColor={"white"}
          iconSize={60}
          balance={25000}
        />
        <BalanceCard
          balanceTitle={"Due  "}
          iconName={"briefcase-eye-outline"}
          iconSize={60}
          iconColor={"white"}
          balance={25000}
        />
      </View>
      <View style={{ flex: .30, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <MenuCard
          menuTitle={"Transaction Hostory "}
          iconName={"history"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("TransactionHistory")}
        />
        <MenuCard
          menuTitle={"Loan Details"}
          iconName={"currency-try"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("LoanDetails")}
        />
      </View>
      <View style={{ flex: .30, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <MenuCard
          menuTitle={"Employee Details"}
          iconName={"human-queue"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("EmployeeDetails")}
        />
        <MenuCard
          menuTitle={"Member List"}
          iconName={"text-box-multiple"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("MemberList")}
        />
      </View>
      <View style={{ flex: .30, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <MenuCard
          menuTitle={"Balancesheet"}
          iconName={"note"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("BalanceSheet")}
        />
        <MenuCard
          menuTitle={"Summary"}
          iconName={"stack-exchange"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("Summary")}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({});
