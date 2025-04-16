import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Button from "../component/Button";
import TextInput from "../component/TextInput";
import React, { useState, useEffect } from "react";
import { db } from "../config";
import { ref, set, onValue } from "firebase/database";
import { Picker } from "@react-native-picker/picker";
import DatePicker from 'react-native-date-picker'

import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";


export default function ExpenseEntry({ navigation }) {
   const [otherAmount, setOtherAmount] = useState(0);
   const [salary, setSalary] = useState(0);
   const [bonus, setBonus] = useState(0);
   const [donation, setDonation] = useState(0);
   const [officeRent, setOfficeRent] = useState(0);
   const [elllictricBill, setEllictricBill] = useState(0);
   const [loanExpenss, setLoanExpenss] = useState(0);
   const [officeExpenss, setOfficeExpenss] = useState(0);

   const [inputdate, setInputDate] = useState(new Date())
   const [open, setOpen] = useState(false)

   const timestamp = Date.now(); // Get current timestamp in milliseconds
   // Create a Date object from the timestamp
   const date = new Date(timestamp);
   // Format the date and time using toLocaleString()
   
   const formattedDateTime = date.toLocaleString();
   const month = (date).toLocaleString('default', { month: 'long'  }); 
   const uniqueId = Math.floor(Math.random() * 10000);

   const today = new Date();
const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); 
const previousMonthName = previousMonth.toLocaleString('default', { month: 'long' }); 


   const addExpenss = () => {
       if (  !salary  || !officeRent || !elllictricBill || !officeExpenss) {
         Dialog.show({
           type: ALERT_TYPE.WARNING,
           title: "Error",
           textBody: "Salary,Office Rent,Elllictric Bill and Office Expense fields are required.",
           button: "Close",
         });
         return; // Exit the function if any field is empty
       }
       set(ref(db, "AllExpenss/" + uniqueId), {
          otherAmount: otherAmount, 
          salary: salary,
          bonus: bonus,
          donation: donation,
          officeRent: officeRent,
          elllictricBill: elllictricBill,
          loanExpenss: loanExpenss,
          officeExpenss: officeExpenss,
         scid: uniqueId,
         timestamp: formattedDateTime,
       });
       setOtherAmount(0);
        setSalary(0);
        setBonus(0);
        setDonation(0);
        setOfficeRent(0);
        setEllictricBill(0);
        setLoanExpenss(0);
        setOfficeExpenss(0);

   
       Dialog.show({
         type: ALERT_TYPE.SUCCESS,
         title: "Success",
         textBody: "New Expense Added",
         button: "close",
       });
     };
 
  return (
    <ScrollView style={styles.containerView}>
      <AlertNotificationRoot>
      </AlertNotificationRoot>

      <View style={styles.HeaderView}>
        <Text
          style={{
            fontFamily: "DMSans_500Bold",
            fontSize: 18,
            textAlign: 'center',
            
          }}
        >
          {"সুন্দরগঞ্জ দোকান মালিক ব্যাবসায় সমবায় সমিতি"}
          {" "}
        </Text>
        <Text style={styles.AllText}> সুন্দরগঞ্জ , গাইবান্ধা ।   </Text>
      </View>
      <Text
          style={{
            fontFamily: 'bold',
            
            fontSize: 24,
            paddingBottom: 8,
            paddingTop: 15,
            textAlign: 'center',

          }}
        >
          {" "}
          Expense of  {previousMonthName}, {today.getFullYear()}{" "} 
        </Text>

       
      <View style={styles.FormView}>
     
      
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Other Amount {" "}
        </Text>

        <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Enter here...."
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          value={otherAmount.toString()}
          onChangeText={(text) => {
            const numericValue = parseFloat(text);
            if (isNaN(numericValue)) {
              setOtherAmount('');
            }
            else {
              setOtherAmount(numericValue);
            }
          }}
        />

        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Salary {" "}
        </Text>

        <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Enter here...."
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          value={salary.toString()}
          onChangeText={(text) => {
            const numericValue = Number(text);
            if (isNaN(numericValue)) {
              setSalary('');
            }
            else {
              setSalary(numericValue);
            }
          }}
        />


        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Bonus {" "}
        </Text>

        <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Enter here...."
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          value={bonus.toString()}
          onChangeText={(text) => {
            const numericValue = parseFloat(text);
            if (isNaN(numericValue)) {
              setBonus('');
            }
            else {
              setBonus(numericValue);
            }
          }}
        />
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Donation {" "}
        </Text>

        <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Enter here...."
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          value={donation.toString()}
          onChangeText={(text) => {
            const numericValue = parseFloat(text);
            if (isNaN(numericValue)) {
              setDonation('');
            }
            else {
              setDonation(numericValue);
            }
          }}
        />

        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Office Rent  {" "}
        </Text>

        <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Enter here...."
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          value={officeRent.toString()}
          onChangeText={(text) => {
            const numericValue = parseFloat(text);
            if (isNaN(numericValue)) {
              setOfficeRent('');
            }
            else {
              setOfficeRent(numericValue);
            }
          }}
        />


        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Ellictric Bill  {" "}
        </Text>

        <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Enter here...."
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          value={elllictricBill.toString()}
          onChangeText={(text) => {
            const numericValue = parseFloat(text);
            if (isNaN(numericValue)) {
              setEllictricBill('');
            }
            else {
              setEllictricBill(numericValue);
            }
          }}
        />
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Loan Expenss {" "}
        </Text>
        <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Enter here...."
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          value={loanExpenss.toString()}
          onChangeText={(text) => {
            const numericValue = parseFloat(text);
            if (isNaN(numericValue)) {
              setLoanExpenss('');
            }
            else {
              setLoanExpenss(numericValue);
            }
          }}
        />

        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Office Expense  {" "}
        </Text>

       
        <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Enter here...."
          autoCapitalize="none"
          keyboardType="number-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          value={officeExpenss.toString()}
          onChangeText={(text) => {
            const numericValue = parseFloat(text);
            if (isNaN(numericValue)) {
              setOfficeExpenss('');
            }
            else {
              setOfficeExpenss(numericValue);
            }
          }}
        />
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 24,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Total :   {otherAmount + salary + bonus + donation + officeRent + elllictricBill + loanExpenss + officeExpenss}{"৳"}   
        </Text>
       
      </View>

      <View style={styles.SubmitView}>
        <Button label="Submit Entry " onPress={addExpenss} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "acqua",
    paddingTop: 20,
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
    alignContent: 'center',
    padding: 10,
  },
  SubmitView: {
    alignContent: "center",
    alignItems: "center",
    padding: 20,
  },

})