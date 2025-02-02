import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MemberEntry from "./MemberEntry";
import EmployeeEntry from "./EmployeeEntry";
import DailyCollection from './CollectionSavings';
import MonthlyCollection from './MonthlyCollection';
import CollectionLoan from './CollectionLoan';
import SavingsCollection from './CollectionSavings';
import CollectionSavings from './CollectionSavings';
import CollectionCharges from './CollectionCharges';

const Tab = createMaterialTopTabNavigator();

export default function Collection() {
  return (
    <View style={styles.containerView}>
    <Tab.Navigator>
     
     
       <Tab.Screen
        name="Savings"
        component={CollectionSavings}
        options={{
          tabBarLabel: "Savings ",
        }}
      />
       <Tab.Screen
        name="Loan"
        component={CollectionLoan}
        options={{
          tabBarLabel: "Loan ",
        }}
      />
      <Tab.Screen
        name="Charges"
        component={CollectionCharges}
        options={{
          tabBarLabel: "Chareges",
        }}
      />
    
    </Tab.Navigator>
    </ View>
  )
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
})