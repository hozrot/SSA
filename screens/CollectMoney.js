import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MemberEntry from "./MemberEntry";
import EmployeeEntry from "./EmployeeEntry";
import DailyCollection from './DailyCollection';
import MonthlyCollection from './MonthlyCollection';
import WeeklyCollection from './WeeklyCollection';

const Tab = createMaterialTopTabNavigator();

export default function CollectMoney() {
  return (
    <Tab.Navigator>
     
     
       <Tab.Screen
        name="Daily"
        component={DailyCollection}
        options={{
          tabBarLabel: "Daily",
        }}
      />
       <Tab.Screen
        name="Weekly"
        component={WeeklyCollection}
        options={{
          tabBarLabel: "Weekly",
        }}
      />
      <Tab.Screen
        name="Monthly"
        component={MonthlyCollection}
        options={{
          tabBarLabel: "Monthly",
        }}
      />
    
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})