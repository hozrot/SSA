import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTab from '../component/BottomTab';
import Dashboard from './Dashboard';
import NewEntry from './NewEntry';
import CollectMoney from './CollectMoney';
import AboutUs from './AboutUs';
import ExpenseEntry from './ExpenseEntry';
import LoanEntry from './LoanEntry';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';


//npm install @react-navigation/bottom-tabs
const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  
  return (
    <Tab.Navigator tabBar={props => <BottomTab {...props} />}>

      <Tab.Screen name="Dashboard" component={Dashboard} options={{
        headerShown: false
      }} />
      <Tab.Screen name="Entry" component={NewEntry} options={{
        headerShown: false
      }} />
      <Tab.Screen name="Collection" component={CollectMoney} options={{
        headerShown: false
      }} />
      <Tab.Screen name="Expense" component={ExpenseEntry} options={{
        headerShown: false
      }} />
      <Tab.Screen name="GiveLoan" component={LoanEntry} options={{
        headerShown: false
      }} />

    </Tab.Navigator>


  )
  //   return (
  //     <View>
  //      <Button title="It will show the dashboard with a tab nagigator scree "  onPress={() => navigation.navigate("AboutUs")} />
  //     </View>
  //   )
}

const styles = StyleSheet.create({})