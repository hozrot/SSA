import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import PersonList from "../component/PersonList";
import ListOne from "../component/ListOne";
import { db } from "../config";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import BalanceCard from "../component/BalanceCard";
import moment from "moment";
import { useRoute } from "@react-navigation/native";
export default function MemberTransaction({ navigation }) {
  const route = useRoute();
  const { memberId,name } = route.params;
  const [loneList, setLoanList] = useState([]);
  const [totalCollectionToday, setTotalCollectionToday] = useState([]);
  const [totalLoanCollection, setTotalLoanCollection] = useState([]);
  const [totalLoanWithdraw, setTotalLoanWithdraw] = useState([]);
  const [totalSavingsCollection, setTotalSavingsCollection] = useState([]);
  const [totalChargeCollection, setTotalChargeCollection] = useState([]);
  const [totalSavingsWithdraw, setTotalSavingsWithdraw] = useState([]);
  // const enrollmentBy ="মোঃ জয়নাল আবেদীন";
  const enrollmentBy = "মোঃ রাকিবুল ইসলাম";

  const balance =
    (totalLoanCollection || 0) -
    (totalLoanWithdraw || 0) +
    (totalSavingsCollection || 0) -
    (totalSavingsWithdraw || 0);

  useEffect(() => {
    const dataLink = ref(db, "AllTransaction/");
    const employeeLoansQuery = query(
      dataLink,
      orderByChild("memberno"), // Assuming 'enrollmentBy' is the field in your data
      equalTo(memberId) // Filter for the specific employee
    );
    onValue(employeeLoansQuery, (snapshot) => {
      // Use the filtered query
      const data = snapshot.val();
      if (data) {
        // Check if data exists
        const allLoan = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setLoanList(allLoan);
      } else {
        setLoanList([]); // Set to empty array if no loans found for the employee
      }
      if (data) {
        const totalAmount = Object.values(data)
          .filter(
            (loan) => loan.type === "Withdraw" && loan.category === "Loan"
          )
          .reduce((total, loan) => {
            return total + (loan.amount || 0);
          }, 0);
        setTotalLoanWithdraw(totalAmount);
      } else {
        setTotalLoanWithdraw(0);
      }
      if (data) {
        const totalAmount = Object.values(data)
          .filter(
            (loan) => loan.type === "Collection" && loan.category === "Loan"
          )
          .reduce((total, loan) => {
            return total + (loan.amount || 0);
          }, 0);
        setTotalLoanCollection(totalAmount);
      } else {
        setTotalLoanCollection(0);
      }
      if (data) {
        const totalAmount = Object.values(data)
          .filter(
            (savings) =>
              savings.type === "Collection" && savings.category === "Savings"
          )
          .reduce((total, savings) => {
            return total + (savings.amount || 0);
          }, 0);
        setTotalSavingsCollection(totalAmount);
      } else {
        setTotalSavingsCollection(0);
      }
      if (data) {
        const totalAmount = Object.values(data)
          .filter(
            (savings) =>
              savings.type === "Withdraw" && savings.category === "Savings"
          )
          .reduce((total, savings) => {
            return total + (savings.amount || 0);
          }, 0);
        setTotalSavingsWithdraw(totalAmount);
      } else {
        setTotalSavingsWithdraw(0);
      }
      if (data) {
        const totalAmount = Object.values(data)
          .filter(
            (charge) =>
              charge.type === "Collection" && charge.category === "Charge"
          )
          .reduce((total, charge) => {
            return total + (charge.amount || 0);
          }, 0);
        setTotalChargeCollection(totalAmount);
      } else {
        setTotalChargeCollection(0);
      }
    });
  }, []); // Add employeeId to the dependency array

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 16,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          {" "}
         
            {name}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 5,
        }}
      >
        <Text style={{ fontWeight: 'ultralight', fontSize: 20 }}>
          {" "}
          Loan Details
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <BalanceCard
          balanceTitle={"Withdrawn"}
          iconName={"archive-plus"}
          iconColor={"white"}
          balance={totalLoanWithdraw+'৳'}
        />
        <BalanceCard
          balanceTitle={"Return"}
          iconName={"archive-minus"}
          iconColor={"white"}
          //onPress={()=>navigation.navigate("DayTransaction")}
          balance={totalLoanCollection+'৳'}
        />
        <BalanceCard
          balanceTitle={"Due"}
          iconName={"archive-clock"}
          iconColor={"white"}
          //onPress={()=>navigation.navigate("DayTransaction")}
          balance={totalLoanWithdraw-totalLoanCollection+'৳'}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 5,
        }}
      >
        <Text style={{ fontWeight: 'ultralight', fontSize: 20 }}>
          {" "}
          Savings Details
        </Text>
        </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <BalanceCard
          balanceTitle={"Savings"}
          iconName={"arrow-down-bold-hexagon-outline"}
          iconColor={"white"}
          balance={totalSavingsCollection+'৳'}
        />
        <BalanceCard
          balanceTitle={" Withdrawn"}
          iconName={"arrow-up-bold-hexagon-outline"}
          iconColor={"white"}
          //onPress={()=>navigation.navigate("DayTransaction")}
          balance={totalSavingsWithdraw+'৳'}
        />
         <BalanceCard
          balanceTitle={" Balance"}
          iconName={"hexagon-slice-6"}
          iconColor={"white"}
          //onPress={()=>navigation.navigate("DayTransaction")}
          balance={totalSavingsCollection-totalSavingsWithdraw+'৳'}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <BalanceCard
          balanceTitle={"Total Charges Given"}
          iconName={"hexagon-multiple"}
          iconColor={"yellow"}
          balance={totalChargeCollection+'৳'}
        />
        {/* <BalanceCard
          balanceTitle={"Total Balance"}
          iconName={"basket"}
          iconColor={balance >= 0 ? "white" : "red"}
          balance={balance}
        /> */}
      </View>
      {loneList.map((item, index) => {
        return (
          <ListOne
            key={index}
            name={item.memberno}
            date={item.timestamp}
            amount={item.amount}
            iconName={item.type === 'Collection' ? 'account-arrow-left' : 'account-arrow-right'}
              iconColor={item.type === 'Collection' ? '#8300FD' : "red"}
            type={item.type}
            category={item.category}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  item: {
    backgroundColor: "green",
    padding: 10,
    marginVertical: 8,
  },
});
