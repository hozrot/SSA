
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import PersonList from "../component/PersonList";
import ListOne from '../component/ListOne';
import { db } from '../config';
import { ref, onValue ,query, orderByChild, equalTo} from 'firebase/database';
import BalanceCard from '../component/BalanceCard';
import moment from 'moment';

export default function MySummary({navigation }) {
    const [loneList, setLoanList] = useState([])
    const [totalLoanCollection, setTotalLoanCollection] = useState([])
    const [totalSavingsCollection, setTotalSavingsCollection] = useState([])
    const [totalChargeCollection, setTotalChargeCollection] = useState([])
   // const enrollmentBy ="মোঃ জয়নাল আবেদীন";
    const enrollmentBy ="মোঃ রাকিবুল ইসলাম";
    const enrollment ="Employee1";

  useEffect(() => {
    const dataLink = ref(db, 'AllTransaction/');
    const employeeLoansQuery = query(
        dataLink,
        orderByChild('enrollmentBy'), // Assuming 'enrollmentBy' is the field in your data
        equalTo(enrollment) // Filter for the specific employee
      );
     onValue(employeeLoansQuery, (snapshot) => { // Use the filtered query
             const data = snapshot.val();
             if (data) { // Check if data exists
               const allLoan = Object.keys(data).map(key => ({
                 id: key,
                 ...data[key]
               })).filter(loan => loan.category === "Loan" ); // Filter for the specific employee
               setLoanList(allLoan);
             } else {
               setLoanList([]); // Set to empty array if no loans found for the employee
             }
             if (data) { 
                 const totalSaveAmount = Object.values(data).reduce((total, loan) => {
                   return total + (loan.amount || 0); 
                 }, 0);
                 setTotalLoanCollection(totalSaveAmount); 
               } else {
                 setTotalLoanCollection(0); 
               }
      });
  
    }, []); // Add employeeId to the dependency array
    useEffect(() => {
      const dataLink = ref(db, 'AllTransaction/');
      const employeeLoansQuery = query(
          dataLink,
          orderByChild('enrollmentBy'), // Assuming 'enrollmentBy' is the field in your data
          equalTo(enrollment) // Filter for the specific employee
        );
        onValue(employeeLoansQuery, (snapshot) => { // Use the filtered query
          const data = snapshot.val();
          if (data) { // Check if data exists
            const allLoan = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            })).filter(loan => loan.category === "Savings" ); // Filter for the specific employee
            setLoanList(allLoan);
          } else {
            setLoanList([]); // Set to empty array if no loans found for the employee
          }
          if (data) { 
              const totalSaveAmount = Object.values(data).reduce((total, loan) => {
                return total + (loan.amount || 0); 
              }, 0);
              setTotalSavingsCollection(totalSaveAmount); 
            } else {
              setTotalSavingsCollection(0); 
            }
        });
    
      }, []);
      useEffect(() => {
        const dataLink = ref(db, 'AllTransaction/');
        const employeeLoansQuery = query(
            dataLink,
            orderByChild('enrollmentBy'), // Assuming 'enrollmentBy' is the field in your data
            equalTo(enrollment) // Filter for the specific employee
          );
          onValue(employeeLoansQuery, (snapshot) => { // Use the filtered query
            const data = snapshot.val();
            if (data) { // Check if data exists
              const allLoan = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
              })).filter(loan => loan.category === "Charge" ); // Filter for the specific employee
              setLoanList(allLoan);
            } else {
              setLoanList([]); // Set to empty array if no loans found for the employee
            }
            if (data) { 
                const totalSaveAmount = Object.values(data).reduce((total, loan) => {
                  return total + (loan.amount || 0); 
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
                iconName={"briefcase-search-outline"}
                iconColor={"white"}
                balance={totalLoanCollection }
              />
               <BalanceCard
                balanceTitle={"Total  Savings"}
                iconName={"briefcase-search-outline"}
                iconColor={"white"}
                //onPress={()=>navigation.navigate("DayTransaction")}
                balance={totalSavingsCollection}
              />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
         
         <BalanceCard
                 balanceTitle={"Total Charges"}
                 iconName={"briefcase-search-outline"}
       
                 iconColor={"white"}
                 balance={totalChargeCollection }
               />
                <BalanceCard
                 balanceTitle={"Total  Collection"}
                 iconName={"briefcase-search-outline"}
                 iconColor={"white"}
                
                 balance={totalLoanCollection+totalSavingsCollection+totalChargeCollection}
               />
       </View>
       <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
         
         <BalanceCard
                 balanceTitle={"Today's Collection"}
                 iconName={"briefcase-search-outline"}
                 onPress={()=>navigation.navigate("DayTransaction")}
                 iconColor={"red"}
                 balance={"All List  " }
                 
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