import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
// need to import MenuCard Template like bellow
import MenuCard from "../component/MenuCard";
import BalanceCard from "../component/BalanceCard";
import { db } from '../config';
import { ref, onValue } from 'firebase/database';

export default function Dashboard({ navigation }) {

  const [totalLoanAmount, setTotalLoanAmount] = useState([])
  const [totalSaveAmount, setTotalSaveAmount] = useState([])
  const [totalLoanGiven, setTotalLoanGiven] = useState([])

  useEffect(() => {
    const dataLink = ref(db, 'loanCollection/');
    onValue(dataLink, (snapshot) => {
      const data = snapshot.val();
      if (data) { 
        const totalLoanAmount = Object.values(data).reduce((total, loan) => {
          return total + (loan.loanamount || 0); 
        }, 0);
        setTotalLoanAmount(totalLoanAmount); 
      } else {
        setTotalLoanAmount(0); 
      }
    });
  }, []);
  useEffect(() => {
    const dataLink = ref(db, 'savingsCollection/');
    onValue(dataLink, (snapshot) => {
      const data = snapshot.val();
      if (data) { 
        const totalSaveAmount = Object.values(data).reduce((total, savings) => {
          return total + (savings.savingsamount || 0); 
        }, 0);
        setTotalSaveAmount(totalSaveAmount); 
      } else {
        setTotalSaveAmount(0); 
      }
    });
  }, []);
  useEffect(() => {
    const dataLink = ref(db, 'loanGiven/');
    onValue(dataLink, (snapshot) => {
      const data = snapshot.val();
      if (data) { 
        const totalLoanGiven = Object.values(data).reduce((total, loan) => {
          return total + (loan.savingsamount || 0); 
        }, 0);
        setTotalLoanGiven(totalLoanGiven); 
      } else {
        setTotalLoanGiven(0); 
      }
    });
  }, []);
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'green' }}>
      {/* <Text> Total Collection : 1,50,000,000</Text>
        <Text> Total Paid : 1,10,500 </Text>
        <Text> Total Pending : 18,50,000 </Text>
        <Text> Total Asset : 5,000,000,000</Text> */}
      <View style={{ flex: .30, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <BalanceCard
          balanceTitle={"Collection"}
          iconName={"briefcase-search-outline"}
          iconSize={60}
          iconColor={"white"}
          balance={totalLoanAmount}
        />
        <BalanceCard
          balanceTitle={"Savings "}
          iconName={"briefcase-clock-outline"}
          iconColor={"white"}
          iconSize={60}
          balance={totalSaveAmount}
        />
        <BalanceCard
          balanceTitle={"Loan Given "}
          iconName={"briefcase-eye-outline"}
          iconSize={60}
          iconColor={"white"}
          balance={totalLoanGiven}
        />
      </View>
      <View style={{ flex: .30, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <MenuCard
          menuTitle={"Transaction Hostory "}
          iconName={"history"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("TransactionHistory")}
        />
        <MenuCard
          menuTitle={"Loan Details"}
          iconName={"currency-try"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("LoanDetails")}
        />
      </View>
      <View style={{ flex: .30, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <MenuCard
          menuTitle={"Employee Details"}
          iconName={"human-queue"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("EmployeeDetails")}
        />
        <MenuCard
          menuTitle={"Member List"}
          iconName={"text-box-multiple"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("MemberList")}
        />
      </View>
      <View style={{ flex: .30, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <MenuCard
          menuTitle={"Balancesheet"}
          iconName={"note"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("BalanceSheet")}
        />
        <MenuCard
          menuTitle={"Summary"}
          iconName={"stack-exchange"}
          iconSize={80}
          iconColor={"#6656FE"}
          onPress={() => navigation.navigate("Summary")}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({});
