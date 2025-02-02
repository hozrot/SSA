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
import MyLoanCollection from "./MyLoanCollection";
import MySavingsCollections from "./MySavingsCollections";
import MyChargeCollections from "./MyChargeCollections";
import MySummary from "./MySummary";
const Tab = createMaterialTopTabNavigator();

export default function MyTransaction({navigation}) {
  return (
 <Tab.Navigator>
         
         
           <Tab.Screen
            name="Loan"
            component={MyLoanCollection}
            options={{
              tabBarLabel: "Loan",
            }}
          />
           <Tab.Screen
            name="Savings"
            component={MySavingsCollections}
            options={{
              tabBarLabel: "Savings",
            }}
          />
          <Tab.Screen
            name="Charges"
            component={MyChargeCollections}
            options={{
              tabBarLabel: "Charges",
            }}
          />
           <Tab.Screen
            name="Summary"
            component={MySummary}
            options={{
              tabBarLabel: "Summary",
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