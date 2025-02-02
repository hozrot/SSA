import { StyleSheet, Text, View ,ScrollView} from "react-native";
import React from "react";
import Button from "../component/Button";
import TextInput from "../component/TextInput";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MemberEntry from "./MemberEntry";
import EmployeeEntry from "./EmployeeEntry";
import CollectMoney from "./Collection";
import LoanEntry from "./Withdraw";
import MonthlyCollection from "./MonthlyCollection";
import LoanList from "./LoanList";
import SavingsList from "./SavingsList";
import ExpenseList from "./ExpenseList";
const Tab = createMaterialTopTabNavigator();

export default function TransactionHistory({navigation}) {
  return (
 <Tab.Navigator>
         
         
           <Tab.Screen
            name="Member"
            component={LoanList}
            options={{
              tabBarLabel: "Loan",
            }}
          />
           <Tab.Screen
            name="Employee"
            component={SavingsList}
            options={{
              tabBarLabel: "Savings",
            }}
          />
          <Tab.Screen
            name="Monthly"
            component={ExpenseList}
            options={{
              tabBarLabel: "Expense",
            }}
          />
        
        </Tab.Navigator>

   
         
       );
   }
   
   const styles = StyleSheet.create({
     containerView: {
       flex: 1,
       backgroundColor: "acqua",
     },
     HeaderView: {
       flex: 0.2,
       padding: 20,
       width: "100%",
       justifyContent: "center",
       alignItems: "center",
       paddingTop: 20,
     },
     FormView: {
       flex: 0.4,
       width: "100%",
       justifyContent: "center",
       alignContent:'center',
       padding: 10,
     },
     SubmitView: {
       alignContent: "center",
       alignItems: "center",
       padding: 20,
     },
    
   })