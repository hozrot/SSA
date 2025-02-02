import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Button from "../component/Button";
import TextInput from "../component/TextInput";
import React, { useState } from 'react'
import { db } from '../config';
import {ref,set} from 'firebase/database';
import { Picker } from '@react-native-picker/picker';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';


export default function CollectionCharges({ navigation }) {
   const [memberno,setMemberno] = useState('');
    const [amount,setAmount] = useState('');
    const [enrollmentBy,setEnrollmentBy] = useState('');
    const timestamp = Date.now(); // Get current timestamp in milliseconds
  
  // Create a Date object from the timestamp
  const date = new Date(timestamp);
  
  // Format the date and time using toLocaleString()
  const formattedDateTime = date.toLocaleString(); 
    const uniqueId = Math.floor(Math.random()*10000);
    //const uniqueId = 1*1000;
    
  
    const addloancollection = ()=>{
      if (!amount || !memberno || !enrollmentBy) {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Error',
          textBody: 'All fields are required.',
          button: 'Close',
        });
        return; // Exit the function if any field is empty
      }
      set(ref(db,'CollectionCharges/'+ uniqueId),{
        memberno: memberno,
        chargeamount: amount,
        enrollmentBy: enrollmentBy,
        scid: uniqueId, 
        timestamp: formattedDateTime,
      });
      setMemberno('')
      setAmount('')
     
      setEnrollmentBy('')
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'New Loan Collection Added',
        button: 'close',
      })
    }
  
  return (

    <ScrollView style={styles.containerView}>

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
          onChangeText={(text)=> setMemberno(text)}
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
                           Loan Amount   :  {" "}
                         </Text>

                         <Text
                           style={{
                             fontFamily: "DMSans_500Medium",
                             fontSize: 16,
                             paddingBottom: 8,
                             paddingTop: 15,
                             
                           }}
                         >
                           {" "}
                          Total Due :    {" "}
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
          Amount to pay   {" "}
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

      </View>


      <View style={styles.SubmitView}>


        <Button label="Collect Loan Amount " onPress={addloancollection} />
      </View>
    </ScrollView>

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
    paddingTop: 10,
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