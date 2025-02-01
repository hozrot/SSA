import { StyleSheet, Text, View ,ScrollView} from "react-native";
import React from "react";
import Button from "../component/Button";
import TextInput from "../component/TextInput";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MemberEntry from "./MemberEntry";
import EmployeeEntry from "./EmployeeEntry";
import CollectMoney from "./CollectMoney";
import LoanEntry from "./LoanEntry";
import GiveLoan from "./GiveLoan";
import GiveSavings from "./GiveSavings";
const Tab = createMaterialTopTabNavigator();

export default function NewEntry({navigation}) {
  return (

    <View style={styles.containerView}>
      <Tab.Navigator>
         
         
           <Tab.Screen
            name="Loan"
            component={GiveLoan}
            options={{
              tabBarLabel: "Give Loan Entry",
            }}
          />
           <Tab.Screen
            name="Savings"
            component={GiveSavings}
            options={{
              tabBarLabel: "Give Savings Entry",
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