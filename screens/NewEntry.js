import { StyleSheet, Text, View ,ScrollView} from "react-native";
import React from "react";
import Button from "../component/Button";
import TextInput from "../component/TextInput";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MemberEntry from "./MemberEntry";
import EmployeeEntry from "./EmployeeEntry";
import CollectMoney from "./Collection";
import LoanEntry from "./Withdraw";
const Tab = createMaterialTopTabNavigator();

export default function NewEntry({navigation}) {
  return (

    <View style={styles.containerView}>
      <Tab.Navigator>
         
         
           <Tab.Screen
            name="Member"
            component={MemberEntry}
            options={{
              tabBarLabel: "Member Entry",
            }}
          />
           {/* <Tab.Screen
            name="Employee"
            component={EmployeeEntry}
            options={{
              tabBarLabel: "Employee Entry",
            }}
          /> */}
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