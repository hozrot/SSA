import { StyleSheet, Text, View ,ScrollView} from "react-native";
import React from "react";
import Button from "../component/Button";
import TextInput from "../component/TextInput";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MemberEntry from "./MemberEntry";
import EmployeeEntry from "./EmployeeEntry";
import CollectMoney from "./CollectMoney";
import LoanEntry from "./LoanEntry";
const Tab = createMaterialTopTabNavigator();

export default function NewEntry({navigation}) {
  return (

      <Tab.Navigator>
         
         
           <Tab.Screen
            name="Member"
            component={MemberEntry}
            options={{
              tabBarLabel: "Member Entry",
            }}
          />
           <Tab.Screen
            name="Employee"
            component={EmployeeEntry}
            options={{
              tabBarLabel: "Employee Entry",
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