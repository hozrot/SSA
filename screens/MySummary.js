import React, { useState, useEffect,useContext } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import PersonList from "../component/PersonList";
import ListOne from '../component/ListOne';
import { db } from '../config';
import { ref, onValue ,query, orderByChild, equalTo} from 'firebase/database';
import BalanceCard from '../component/BalanceCard';
import moment from 'moment';
import { UserContext } from '../UserContext';
export default function MySummary({navigation }) {
    const {user} =useContext(UserContext);
    const [loneList, setLoanList] = useState([])
    const [totalLoanCollection, setTotalLoanCollection] = useState([])
    const [totalSavingsCollection, setTotalSavingsCollection] = useState([])
    const [totalChargeCollection, setTotalChargeCollection] = useState([])
   // const enrollmentBy ="মোঃ জয়নাল আবেদীন";
    const enrollmentBy ="মোঃ রাকিবুল ইসলাম";
    const enrollment ="Employee1";

  useEffect(() => {
    const dataLink = ref(db, 'AllTransaction/');
    let transactionQuery = dataLink;

if (user.username === 'Super Admin') {
  transactionQuery = query(
    dataLink,
    orderByChild('enrollmentBy') // No equalTo() to get all data
  );
} else {
  transactionQuery = query(
    dataLink,
    orderByChild('enrollmentBy'),
    equalTo(user.username )
  );
}
     onValue(transactionQuery, (snapshot) => { // Use the filtered query
             const data = snapshot.val();
             if (data) { // Check if data exists
               const allLoan = Object.keys(data).map(key => ({
                 id: key,
                 ...data[key]
               }))//.filter(loan => loan.category === "Loan" ); // Filter for the specific employee
               setLoanList(allLoan);
             } else {
               setLoanList([]); // Set to empty array if no loans found for the employee
             }
             if (data) { 
                 const totalSaveAmount = Object.values(data)
                 .filter((item) => item.type === "Collection") 
                 .reduce((total, loan) => {
                   return total + (loan.loanAmount || 0); 
                 }, 0);
                 setTotalLoanCollection(totalSaveAmount); 
               } else {
                 setTotalLoanCollection(0); 
               }
               if (data) { 
                const totalSaveAmount = Object.values(data)
                .filter((item) => item.type === "Collection") 
                 .reduce((total, loan) => {
                   return total + (loan.savingsAmount || 0); 
                }, 0);
                setTotalSavingsCollection(totalSaveAmount); 
              } else {
                setTotalSavingsCollection(0); 
              }

              if (data) { 
                const totalSaveAmount = Object.values(data)
                .filter((item) => item.type === "Collection") 
                .reduce((total, loan) => {
                  return total + (loan.chargeAmount || 0); 
                }, 0);
                setTotalChargeCollection(totalSaveAmount); 
              } else {
                setTotalChargeCollection(0); 
              }
      });
  
    }, []);
  
  return (
    <ScrollView style={styles.container}>
      {/* <View style={{ justifyContent: "center", alignItems: "center",paddingBottom:16}}>
      <Text style={{ fontWeight:'bold',fontSize:20}}> Welcome,  {enrollmentBy}</Text>
      </View> */}
     

        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
         
        <BalanceCard
                balanceTitle={" Total  Loan  "}
                iconName={"archive-minus"}
                iconColor={"white"}
                balance={totalLoanCollection  +' ৳'}
              />
               <BalanceCard
                balanceTitle={"Total  Savings"}
                iconName={"archive-plus"}
                iconColor={"white"}
                //onPress={()=>navigation.navigate("DayTransaction")}
                balance={totalSavingsCollection +' ৳'}
              />
               
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
         
      <BalanceCard
                 balanceTitle={"Total Charges"}
                 iconName={"archive-refresh"}
        backgroundColor='green'
                 iconColor={"white"}
                 balance={totalChargeCollection +' ৳' }
               />
                <BalanceCard
                 balanceTitle={"Total  Collection"}
                 iconName={"archive"}
                 iconColor={"white"}
                 balance={totalLoanCollection+totalSavingsCollection+totalChargeCollection +' ৳'}
                 backgroundColor='red'
               />
       </View>
       <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
         
         <BalanceCard
                 balanceTitle={"Today's Collection"}
                 iconName={"hours-24"}
                 onPress={()=>navigation.navigate("DayTransaction")}
                 iconColor={"white"}
                 balance={"All List " }
                 iconSize={60}
                 
               />
               
       </View>
      {/* {
        loneList.map((item, index) => {
          return (
            <ListOne
              key={index}
              name={item.memberno}
              date={item.timestamp}
              amount={item.savingsamount}
              iconName={"arrow-split-vertical"}
              iconColor={'#8300FD'}
            />

          )
        })
      } */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 8,
  },
});