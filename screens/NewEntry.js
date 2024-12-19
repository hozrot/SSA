import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MemberEntry from "./MemberEntry";
import EmployeeEntry from "./EmployeeEntry";
import CollectMoney from "./CollectMoney";
import LoanEntry from "./LoanEntry";
const Tab = createMaterialTopTabNavigator();

export default function NewEntry() {
  return (

    // <View>
    //   <Text>LoanDetails</Text>
    // </View>
    
    <Tab.Navigator>
       <Tab.Screen
        name="MemberEntry"
        component={MemberEntry}
        options={{
          tabBarLabel: "Member",
        }}
      />
       <Tab.Screen
        name="Employee"
        component={EmployeeEntry}
      />
      <Tab.Screen
        name="New Loan"
        component={LoanEntry}
        options={{
          tabBarLabel: "Loan",
        }}
      />
     
    </Tab.Navigator>
   
  );
}

const styles = StyleSheet.create({});
