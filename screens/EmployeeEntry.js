import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useContext, useState } from "react";
import Button from "../component/Button";
import TextInput from "../component/TextInput";
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { Picker } from '@react-native-picker/picker';
// npm i @react-native-picker/picker

import { db } from '../config';
import { ref, set } from 'firebase/database';

export default function EmployeeEntry({ navigation }) {

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [nid, setNid] = useState('');
  const [designation, setDesignation] = useState('');
  //const [category,setCategory] = useState('');
  const timestamp = Date.now(); // Get current timestamp in milliseconds

  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Format the date and time using toLocaleString()
  const formattedDateTime = date.toLocaleString();
  const uniqueId = Math.floor(Math.random() * 10000);
  //const uniqueId = 1*1000;


  const addEmployee = () => {
    if (!name || !mobile || !designation || !nid) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: 'All fields are required.',
        button: 'Close',
      });
      return; // Exit the function if any field is empty
    }
    set(ref(db, 'employee/' + uniqueId), {
      name: name,
      mobile: mobile,
      designation: designation,
      employeeId: uniqueId,
      timestamp: formattedDateTime,
      nid: nid,
    });
    setName('')
    setMobile('')
    setDesignation('')
    setNid('')
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'New Employee Added',
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
            fontSize: 18,
          }}
        >
          {"সুন্দরগঞ্জ দোকান মালিক ব্যাবসায় সমবায় সমিতি"}
          {" "}
        </Text>
        <Text style={styles.AllText}> সুন্দরগঞ্জ , গাইবান্ধা ।   </Text>
      </View>
      <View style={styles.FormView}>
        {/* <Text
               style={{
                 fontFamily: "DMSans_500Medium",
                 fontSize: 16,
                 paddingBottom: 8,
                 
               }}
             >
               {" "}
               Employee No{" "}
             </Text>
           
             <TextInput
               inputHieght={54}
               inputAlign={"center"}
               placeholder="Enter here...."
               autoCapitalize="none"
               keyboardType="email-address"
               keyboardAppearance="dark"
               returnKeyType="next"
               returnKeyLabel="next"
              
               style={{ fontSize: 14 }}
             /> */}
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,

          }}
        >
          {" "}
          Employee Name{" "}
        </Text>

        <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Enter here...."
          autoCapitalize="none"
          keyboardType="email-address"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          value={name}
          onChangeText={(text) => setName(text)}
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
          Mobile No{" "}
        </Text>

        <TextInput
          inputHieght={54}
          inputAlign={"center"}
          placeholder="Enter here...."
          autoCapitalize="none"
          keyboardType="phone-pad"
          keyboardAppearance="dark"
          returnKeyType="next"
          returnKeyLabel="next"
          value={mobile}
          onChangeText={(text) => setMobile(text)}
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
          NID no {" "}
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
          value={nid}
          onChangeText={(text) => setNid(text)}
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
          Designation {" "}
        </Text>

        <Picker
          selectedValue={designation}
          onValueChange={(itemValue, itemIndex) =>
            setDesignation(itemValue)
          }
          placeholder={{ label: "Select an option...", value: null }}

          style={{
            backgroundColor: 'gray',
          }}>
          <Picker.Item label="Manager" value="Manager" />
          <Picker.Item label="Assistant " value="Assistant" />
          <Picker.Item label="Field Officer " value="Field Officer" />
        </Picker>
      </View>


      <View style={styles.SubmitView}>


        <Button label="Submit Entry " onPress={addEmployee} />
      </View>
    </ScrollView>
  )
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
    alignContent: 'center',
    padding: 10,
  },
  SubmitView: {
    alignContent: "center",
    alignItems: "center",
    padding: 20,
  },

})