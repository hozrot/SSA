import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MemberEntry from "./MemberEntry";
import EmployeeEntry from "./EmployeeEntry";
import DailyCollection from './SavingsCollection';
import MonthlyCollection from './MonthlyCollection';
import LoanCollection from './LoanCollection';
import SavingsCollection from './SavingsCollection';

const Tab = createMaterialTopTabNavigator();

export default function CollectMoney() {
  return (
    <View style={styles.containerView}>
    <Tab.Navigator>
     
     
       <Tab.Screen
        name="Savings"
        component={SavingsCollection}
        options={{
          tabBarLabel: "Savings Collection",
        }}
      />
       <Tab.Screen
        name="Loan"
        component={LoanCollection}
        options={{
          tabBarLabel: "Loan Collection",
        }}
      />
      {/* <Tab.Screen
        name="Monthly"
        component={MonthlyCollection}
        options={{
          tabBarLabel: "Monthly",
        }}
      /> */}
    
    </Tab.Navigator>
    </ View>
  )
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
})