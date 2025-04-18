import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useContext, useState } from "react";
import Button from "../component/Button";
import TextInput from "../component/TextInput";
import { Picker } from '@react-native-picker/picker';
// npm i @react-native-picker/picker

import { db } from '../config';
import { ref, set } from 'firebase/database';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


export default function MemberEntry({ navigation }) {
  const [assingedEmployee, setassingedEmployee] = useState();
  const [memberno, setMemberno] = useState('');
  const [memberId, setmemberId] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [nid, setNid] = useState('');
  const [company, setCompany] = useState('');
  //const [category,setCategory] = useState('');

  const timestamp = Date.now(); // Get current timestamp in milliseconds

  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Format the date and time using toLocaleString()
  const formattedDateTime = date.toLocaleString();
  const uniqueId = Math.floor(Math.random() * 10000);
  //const uniqueId = 1*1000;


  const addMember = () => {
    if (!name || !company || !assingedEmployee  || !memberId) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: 'All fields are required.',
        button: 'Close',
      });
      return; // Exit the function if any field is empty
    }

    set(ref(db, 'member/' + uniqueId), {
      name: name,
      mobile: mobile,
      company: company,
      entryid: uniqueId,
      memberId: memberId,
      assingedEmployee: assingedEmployee,
      timestamp: formattedDateTime,
    });
    setName('')
    setMobile('')
    setCompany('')
    setassingedEmployee('')
   
    setmemberId('')
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: 'New Member Added',
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
            textAlign: 'center',
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
               Member No{" "}
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
          Member  Name{" "}
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
          required
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
          Company Name{" "}
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
          value={company}
          onChangeText={(text) => setCompany(text)}
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
          Member no {" "}
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
          value={memberId.toString()}
          onChangeText={(text) => {
            const numericValue = parseFloat(text);
            if (!isNaN(numericValue)) {
              setmemberId(numericValue);
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
          Assinged Employee{" "}
        </Text>
        <Picker
          selectedValue={assingedEmployee}
          onValueChange={(itemValue, itemIndex) =>
            setassingedEmployee(itemValue)
          }


          style={{
            backgroundColor: 'green',
          }}>
             <Picker.Item label="Select Employee" value={null} />
          <Picker.Item label="মো: জয়নাল আবেদীন" value="Employee1" />
          <Picker.Item label="মো: রাকিবুল ইসলাম" value="Employee2" />
          
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
          Category {" "}
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
          value={categoty}
          onChangeText={(text)=> setCategory(text)}
          style={{ fontSize: 14 }}
        /> */}

      </View>


      <View style={styles.SubmitView}>


        <Button label="Submit" onPress={addMember} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "acqua",
    paddingTop:20,
  
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
    padding: 30,
  },

})