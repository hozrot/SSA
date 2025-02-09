import { StyleSheet, Text, View, ScrollView } from "react-native";
import Button from "../component/Button";
import TextInput from "../component/TextInput";
import React, { useState, useEffect } from "react";
import { db } from "../config";
import { ref, set, onValue } from "firebase/database";
import { Picker } from "@react-native-picker/picker";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

export default function AllTransaction({ navigation }) {
  const [memberno, setMemberno] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [enrollmentBy, setEnrollmentBy] = useState("");
  const timestamp = Date.now(); // Get current timestamp in milliseconds
  // Create a Date object from the timestamp
  const date = new Date(timestamp);
  // Format the date and time using toLocaleString()
  const formattedDateTime = date.toLocaleString();
  const uniqueId = Math.floor(Math.random() * 10000);
  //const uniqueId = 1*1000;
  const [memberList, setMemberList] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchText, setSearchText] = useState(''); 

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };
  const filteredMemberList = memberList.filter((member) => 
    member.memberId.toString().includes(searchText) 
  );
  useEffect(() => {
    const dataLink = ref(db, "member/");
    onValue(dataLink, (snapshot) => {
      const data = snapshot.val();
      const allMembers = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setMemberList(allMembers);
    });
  }, []);

  useEffect(() => {
    if (selectedMemberId) {
      const selectedMemberData = memberList.find(
        (member) => member.memberId === selectedMemberId
      );
      setSelectedMember(selectedMemberData);
    } else {
      setSelectedMember(null);
    }
  }, [selectedMemberId, memberList]);

  const addloancollection = () => {
    if (!amount || !selectedMemberId || !enrollmentBy || !type || !category) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Error",
        textBody: "All fields are required.",
        button: "Close",
      });
      return; // Exit the function if any field is empty
    }
    set(ref(db, "AllTransaction/" + uniqueId), {
      memberno: selectedMemberId,
      amount: amount,
      enrollmentBy: enrollmentBy,
      scid: uniqueId,
      timestamp: formattedDateTime,
      type: type,
      category: category,
    });
    setSelectedMemberId("");
    setAmount("");
    setCategory("");
    setType("");
    setEnrollmentBy("");

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "New Transaction Added",
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
            textAlign: "center",
          }}
        >
          {"সুন্দরগঞ্জ দোকান মালিক ব্যাবসায় সমবায় সমিতি"}{" "}
        </Text>
        <Text style={styles.AllText}> সুন্দরগঞ্জ , গাইবান্ধা । </Text>
      </View>
      <View style={styles.FormView}>
       
        <TextInput 
        style={styles.searchInput} 
        placeholder="Search Member No.." 
        value={searchText} 
        keyboardType="number-pad"
        onChangeText={handleSearchTextChange} 
      />
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
        <Picker
          style={styles.picker}
          selectedValue={selectedMemberId}
          onValueChange={(itemValue) => setSelectedMemberId(itemValue)}
        >
          <Picker.Item label="Select Member" value={null} />
          {filteredMemberList.map((member) => (
            <Picker.Item
              key={member.memberId}
              label={member.memberId}
              value={member.memberId}
            />
          ))}
        </Picker>
        {selectedMember && (
          <Text>
            Member Name : {selectedMember.name} {"\n"}Company Name:{" "}
            {selectedMember.company}
          </Text>
        )}
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
          onValueChange={(itemValue, itemIndex) => setEnrollmentBy(itemValue)}
          style={styles.picker}
        >
            <Picker.Item label="Select Employee" value={null} />
          <Picker.Item label="মো: জয়নাল আবেদীন" value="Employee1" />
          <Picker.Item label="মো: রাকিবুল ইসলাম" value="Employee2" />
        </Picker>
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,
          }}
        >
          {" "}
          Type of Transaction{" "}
        </Text>

        <Picker
          selectedValue={type}
          onValueChange={(itemValue, itemIndex) => setType(itemValue)}
          placeholder={{ label: "Select an option...", value: null }}
          style={styles.picker}
        >
             <Picker.Item label="Select Employee" value={null} />
          <Picker.Item label="Collection" value="Collection" />
          <Picker.Item label="Withdraw " value="Withdraw" />
        </Picker>
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,
          }}
        >
          {" "}
          Transaction Category{" "}
        </Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
          style={styles.picker}
        >
             <Picker.Item label="Select Category" value={null} />
          <Picker.Item label="Charge" value="Charge" />
          <Picker.Item label="Loan" value="Loan" />
          <Picker.Item label="Savings" value="Savings" />
        </Picker>

        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            paddingTop: 15,
          }}
        >
          {" "}
          Amount to pay{" "}
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
            if (isNaN(numericValue)) {
              setAmount('');
            }
            else {
              setAmount(numericValue);
            }
          }}
          style={{ fontSize: 14 }}
        />
      </View>

      <View style={styles.SubmitView}>
        <Button label="Complete Transaction" onPress={addloancollection} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "acqua",
    paddingTop: 40,
  },
  HeaderView: {
    flex: 0.2,
    padding: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  picker: {
    backgroundColor: "green",
  },
  FormView: {
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    padding: 10,
  },
  SubmitView: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
