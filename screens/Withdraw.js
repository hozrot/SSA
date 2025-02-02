import { StyleSheet, Text, View ,ScrollView} from "react-native";
import React from "react";
import Button from "../component/Button";
import TextInput from "../component/TextInput";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MemberEntry from "./MemberEntry";
import EmployeeEntry from "./EmployeeEntry";
import CollectMoney from "./Collection";
import LoanEntry from "./Withdraw";
import GiveLoan from "./WithdrawLoan";
import GiveSavings from "./WithdrawSavings";
import WithdrawLoan from "./WithdrawLoan";
import WithdrawSavings from "./WithdrawSavings";
const Tab = createMaterialTopTabNavigator();

export default function Withdraw({navigation}) {
  return (

    <View style={styles.containerView}>
      <Tab.Navigator>
         
         
           <Tab.Screen
            name="Loan"
            component={WithdrawLoan}
            options={{
              tabBarLabel: "Withdraw Loan",
            }}
          />
           <Tab.Screen
            name="Savings"
            component={WithdrawSavings}
            options={{
              tabBarLabel: "Withdraw Savings",
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
        </View>

   
         
       );
   }
   
   const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: 30,
    },
    
    
   })