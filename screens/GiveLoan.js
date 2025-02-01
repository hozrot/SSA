import { StyleSheet, Text, View, ScrollView } from 'react-native'

import Button from "../component/Button";
import TextInput from "../component/TextInput";
import { Picker } from '@react-native-picker/picker';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import React, { useState } from 'react'
import { db } from '../config';
import { ref, set } from 'firebase/database';

export default function GiveLoan({ navigation }) {

  const [memberno, setMemberno] = useState('');
  const [amount, setAmount] = useState('');
  const [enrollmentBy, setEnrollmentBy] = useState('');
  const timestamp = Date.now(); // Get current timestamp in milliseconds

  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Format the date and time using toLocaleString()
  const formattedDateTime = date.toLocaleString();
  const uniqueId = Math.floor(Math.random() * 10000);
  //const uniqueId = 1*1000;


  const giveLoan = () => {
    if (!amount || !type || !memberno) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: 'All fields are required.',
        button: 'Close',
      });
      return; // Exit the function if any field is empty
    }
    set(ref(db, 'loanGiven/' + uniqueId), {
      memberno: memberno,
      savingsamount: amount,
      typeofpayment: type,
      scid: uniqueId,
      timestamp: formattedDateTime,
    });
    setMemberno('')
    setAmount('')
    setType('')
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'New Loan Given',
      button: 'close',
    })
  }

  return (

    <ScrollView style={styles.containerView}>
      <AlertNotificationRoot>
            </AlertNotificationRoot>

      <View style={styles.HeaderView}>
        <Text
          style={{
            fontFamily: "DMSans_500Bold",
            fontSize: 16,
          }}
        >
          {"সুন্দরগঞ্জ দোকান মালিক ব্যাবসায় সমবায় সমিতি"}
          {" "}
        </Text>
        <Text style={styles.AllText}> সুন্দরগঞ্জ , গাইবান্ধা ।   </Text>
      </View>
      <View style={styles.FormView}>
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,

          }}
        >
          {" "}
          Member No{" "}
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
          value={memberno}
          onChangeText={(text) => setMemberno(text)}
          style={{ fontSize: 14 }}
        />
        {/* <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Total Savings :  {" "}
        </Text> */}

        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Loan Amount  {" "}
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
          value={amount.toString()}
          onChangeText={(text) => { 
            const numericValue = parseFloat(text); 
            if (!isNaN(numericValue)) { 
              setAmount(numericValue); 
            } 
          }} 
          style={{ fontSize: 14 }}
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
                          Collected By{" "}
                        </Text>
                        <Picker
                          selectedValue={enrollmentBy}
                          onValueChange={(itemValue, itemIndex) =>
                            setEnrollmentBy(itemValue)
                          }
                
                
                          style={{
                            backgroundColor: 'gray',
                          }}>
                          <Picker.Item label="Employee1" value="Employee1" />
                          <Picker.Item label="Employee2" value="Employee2" />
                          <Picker.Item label="Employee3" value="Employee3" />
                        </Picker>
        {/* <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Type of Payment {" "}
        </Text>

        <Picker
          selectedValue={type}
          onValueChange={(itemValue, itemIndex) =>
            setType(itemValue)
          }
          placeholder={{ label: "Select an option...", value: null }}

          style={{
            backgroundColor: 'gray',
          }}>
          <Picker.Item label="Bkash" value="Bkash" />
          <Picker.Item label="Nagad " value="Nagad" />
          <Picker.Item label="Bank " value="Bank" />
          <Picker.Item label="Cash " value="Cash" />
        </Picker> */}

        {/* <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Enter here...."
          autoCapitalize="none"
          keyboardType="email-address"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          value={type}
          onChangeText={(text)=> setType(text)}
          style={{ fontSize: 14 }}
        /> */}

      </View>


      <View style={styles.SubmitView}>


        <Button label="Save  Entry " onPress={giveLoan} />
      </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "acqua",
    paddingTop: 20
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