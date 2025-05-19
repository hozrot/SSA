import { StyleSheet, Text, View, ScrollView } from "react-native";
import Button from "../component/Button";
import TextInput from "../component/TextInput";
import React, { useState, useEffect, useContext, use } from "react";
import { db } from "../config";
import {
  ref,
  set,
  get,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";
//import { ref, set, onValue } from "firebase/database";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "../UserContext";

import { useRoute } from "@react-navigation/native";

export default function TransactionDetails() {
  const route = useRoute();
  const { user } = useContext(UserContext);
  const [memberno, setMemberno] = useState("");
  const [amount, setAmount] = useState("");
  const [uchargeAmount, setChargeAmount] = useState(0);
  const [uloanAmount, setLoanAmount] = useState(0);
  const [uloanWithdrawAmount, setLoanWithdrawAmount] = useState(0);
  const [uloanTrackingNumber, setLoanTrackingNumber] = useState(0);
  const [usavingsAmount, setSavingsAmount] = useState(0);
  const [usavingsWithdrawAmount, setSavingsWithdrawAmount] = useState(0);
  const [utype, setType] = useState("");
  const [category, setCategory] = useState("");
  const [uenrollmentBy, setEnrollmentBy] = useState("");
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
  const [searchText, setSearchText] = useState("");

  const [totalLoanCollection, setTotalLoanCollection] = useState([]);
  const [totalLoanWithdraw, setTotalLoanWithdraw] = useState([]);
  const [totalSavingsCollection, setTotalSavingsCollection] = useState([]);
  const [totalChargeCollection, setTotalChargeCollection] = useState([]);
  const [totalSavingsWithdraw, setTotalSavingsWithdraw] = useState([]);

 
 
  useEffect(() => {
    if (selectedMemberId) {
      const selectedMemberData = memberList.find(
        (member) => member.memberId === selectedMemberId
      );
      setSelectedMember(selectedMemberData);
    } else {
      setSelectedMember(null);
    }
    const dataLink = ref(db, "AllTransaction/");
    const employeeLoansQuery = query(
      dataLink,
      orderByChild("memberno"), // Assuming 'enrollmentBy' is the field in your data
      equalTo(selectedMemberId)
      // Filter for the specific employee
    );
    // console.log("Selected Member ID:", selectedMemberId);
    onValue(employeeLoansQuery, (snapshot) => {
      // Use the filtered query
      const data = snapshot.val();

      if (data) {
        const totalAmount = Object.values(data)
          .filter((loan) => loan.type === "Withdraw")
          .reduce((total, loan) => {
            return total + (loan.loanWithdrawAmount || 0);
          }, 0);
        setTotalLoanWithdraw(totalAmount);
      } else {
        setTotalLoanWithdraw(0);
      }
      if (data) {
        const totalAmount = Object.values(data)
          .filter((loan) => loan.type === "Collection")
          .reduce((total, loan) => {
            return total + (loan.loanAmount || 0);
          }, 0);
        setTotalLoanCollection(totalAmount);
      } else {
        setTotalLoanCollection(0);
      }
      if (data) {
        const totalAmount = Object.values(data)
          .filter((savings) => savings.type === "Collection")
          .reduce((total, savings) => {
            return total + (savings.savingsAmount || 0);
          }, 0);
        setTotalSavingsCollection(totalAmount);
      } else {
        setTotalSavingsCollection(0);
      }
      if (data) {
        const totalAmount = Object.values(data)
          .filter((savings) => savings.type === "Withdraw")
          .reduce((total, savings) => {
            return total + (savings.savingsWithdrawAmount || 0);
          }, 0);
        setTotalSavingsWithdraw(totalAmount);
      } else {
        setTotalSavingsWithdraw(0);
      }
    });
  }, [selectedMemberId, memberList]);

  const updateLoancollection = () => {
    set(ref(db, "AllTransaction/" + uniqueId), {
      memberno: selectedMemberId,
      enrollmentBy: user.username,
      scid: uniqueId,
      timestamp: formattedDateTime,
      loanAmount: loanAmount || 0,
      savingsAmount: savingsAmount || 0,
      chargeAmount: chargeAmount || 0,
      loanWithdrawAmount: loanWithdrawAmount || 0,
      loanTrackingNumber: loanTrackingNumber || 0,
      savingsWithdrawAmount: savingsWithdrawAmount || 0,
      type: type,
    });
    setSelectedMemberId("");
    setEnrollmentBy("");
    setLoanAmount(0);
    setSavingsAmount(0);
    setChargeAmount(0);
    setLoanWithdrawAmount(0);
    setLoanTrackingNumber(0);
    setSavingsWithdrawAmount(0);
    setType("");

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "New Transaction Added",
      button: "close",
    });
  };

  const {
    memberId,
    name,
    enrollmentBy,
    loanAmount,
    savingsAmount,
    chargeAmount,
    savingsWithdrawAmount,
    loanWithdrawAmount,
    type,
    loanTrackingNumber,
  } = route.params;

  return (
   
      

     
     


<View style={styles.FormView}>
  <View style={{ justifyContent: "center", alignItems: "center" }}>
<Text> Enrolled by : {enrollmentBy}</Text>
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
          }}
        >
          {" "}
          Member No : {memberId}
        </Text>
       
       
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 16,
            paddingBottom: 8,
            
          }}
        >
          {" "}
          Type of Transaction: {type}
        </Text>
        </View>

       
       
        {type === "Collection" && (
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
              Loan Collection Amount{" "}
            </Text>

            <TextInput
              inputHieght={54}
              inputAlign={"center"}
              placeholder={loanAmount.toString()}
              autoCapitalize="none"
              keyboardType="number-pad"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              value={uloanAmount}
              onChangeText={(text) => {
                const numericValue = parseFloat(text);
                if (isNaN(numericValue)) {
                  setLoanAmount("");
                } else {
                  setLoanAmount(numericValue);
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
              Savings Collection Amount{" "}
            </Text>

            <TextInput
              inputHieght={54}
              inputAlign={"center"}
              placeholder={savingsAmount.toString()}
              autoCapitalize="none"
              keyboardType="number-pad"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              value={usavingsAmount}
              onChangeText={(text) => {
                const numericValue = parseFloat(text);
                if (isNaN(numericValue)) {
                  setSavingsAmount("");
                } else {
                  setSavingsAmount(numericValue);
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
              Charge Collection Amount{" "}
            </Text>

            <TextInput
              inputHieght={54}
              inputAlign={"center"}
              placeholder={chargeAmount.toString()}
              autoCapitalize="none"
              keyboardType="number-pad"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              value={uchargeAmount}
              onChangeText={(text) => {
                const numericValue = parseFloat(text);
                if (isNaN(numericValue)) {
                  setChargeAmount("");
                } else {
                  setChargeAmount(numericValue);
                }
              }}
              style={{ fontSize: 14 }}
            />
          </View>
        )}

        {type === "Withdraw" && (
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
              Loan Withdraw Amount{" "}
            </Text>

            <TextInput
              inputHieght={54}
              inputAlign={"center"}
              placeholder={loanWithdrawAmount.toString()}
              autoCapitalize="none"
              keyboardType="number-pad"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              value={uloanWithdrawAmount}
              onChangeText={(text) => {
                const numericValue = parseFloat(text);
                if (isNaN(numericValue)) {
                  setLoanWithdrawAmount("");
                } else {
                  setLoanWithdrawAmount(numericValue);
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
              Loan tracking Number{" "}
            </Text>

            <TextInput
              inputHieght={54}
              inputAlign={"center"}
              placeholder={loanTrackingNumber.toString()}
              autoCapitalize="none"
              keyboardType="number-pad"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              value={uloanTrackingNumber}
              onChangeText={(text) => {
                const numericValue = parseFloat(text);
                if (isNaN(numericValue)) {
                  setLoanTrackingNumber("");
                } else {
                  setLoanTrackingNumber(numericValue);
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
              Savings Withdraw Amount{" "}
            </Text>

            <TextInput
              inputHieght={54}
              inputAlign={"center"}
              placeholder={savingsWithdrawAmount.toString()}
              autoCapitalize="none"
              keyboardType="number-pad"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              value={usavingsWithdrawAmount}
              onChangeText={(text) => {
                const numericValue = parseFloat(text);
                if (isNaN(numericValue)) {
                  setSavingsWithdrawAmount("");
                } else {
                  setSavingsWithdrawAmount(numericValue);
                }
              }}
              style={{ fontSize: 14 }}
            />
          </View>
        )}
      

      <View style={styles.SubmitView}>
        {/* <Button label="Update Transaction" onPress={updateLoancollection} /> */}
        <Button label="Update Transaction"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
