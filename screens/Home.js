import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTab from '../component/BottomTab';
import Dashboard from './Dashboard';
import NewEntry from './NewEntry';
import CollectMoney from './Collection';
import AboutUs from './AboutUs';
import ExpenseEntry from './ExpenseEntry';
import LoanEntry from './Withdraw';
import { db } from '../config';
import { ref, onValue } from 'firebase/database';
import Collection from './Collection';
import AllTransaction from './AllTransaction';


//npm install @react-navigation/bottom-tabs
const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  
  return (
    <Tab.Navigator tabBar={props => <BottomTab {...props} />}>

      <Tab.Screen name="Dashboard" component={Dashboard} options={{
        headerShown: false
      }} />
      <Tab.Screen name="Registration" component={NewEntry} options={{
        headerShown: false
      }} />
      <Tab.Screen name="Collection" component={Collection} options={{
        headerShown: false
      }} />
      <Tab.Screen name="Transaction" component={AllTransaction} options={{
        headerShown: false
      }} />
      {/* <Tab.Screen name="Expense" component={ExpenseEntry} options={{
        headerShown: false
      }} /> */}
      {/* <Tab.Screen name="Given" component={LoanEntry} options={{
        headerShown: false
      }} /> */}

    </Tab.Navigator>


  )
  //   return (
  //     <View>
  //      <Button title="It will show the dashboard with a tab nagigator scree "  onPress={() => navigation.navigate("AboutUs")} />
  //     </View>
  //   )
}

const styles = StyleSheet.create({})