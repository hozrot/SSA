import React, { useState, useEffect,useRef  } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView,Platform  } from 'react-native';
import PersonList from "../component/PersonList";
import ListOne from '../component/ListOne';
import { db } from '../config';
import { ref, onValue ,query, orderByChild, equalTo, andOperator } from 'firebase/database';
import BalanceCard from '../component/BalanceCard';
import moment from 'moment';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

import Button from '../component/Button';
//import { shareAsync } from 'expo-sharing';
//import { captureRef } from 'react-native-view-shot';

export default function MyLoanCollection({ navigation }) {
  const [loneList, setLoanList] = useState([])
  const [totalCollectionToday, setTotalCollectionToday] = useState([])
   // const [totalLoanCollection, setTotalLoanCollection] = useState([])
   // const enrollmentBy ="মোঃ জয়নাল আবেদীন";
    const enrollmentBy ="মোঃ রাকিবুল ইসলাম";
    const today = new Date(); 
    const day = today.getDate().toString().padStart(2, '0'); 
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
    const year = today.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;  
    const todayMoment = moment(formattedDate, 'MM/DD/YYYY'); 

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
            h1,h2 {
            text-align: center;}
        </style>
      </head>
      <body>
      <h1>Today's Collection for </h1>
      <h2> ${enrollmentBy}</h2>
        <table>
          <thead>
            <tr>
              <th>Member No</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Type</th>
             
            </tr>
          </thead>
          <tbody>
            ${loneList.map(item => `
              <tr>
                <td>${item.memberno}</td>
                <td>${item.timestamp}</td>
                <td>${item.loanAmount+item.savingsAmount+item.chargeAmount}</td>
                <td>${item.type}</td>
               
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

const [selectedPrinter, setSelectedPrinter] = useState();

const print = async () => {
  // On iOS/android prints the given html. On web prints the HTML from the current page.
  await Print.printAsync({
    html,
    printerUrl: selectedPrinter?.url, // iOS only
  });
};


const selectPrinter = async () => {
  const printer = await Print.selectPrinterAsync(); // iOS only
  setSelectedPrinter(printer);
};


  
  useEffect(() => {
    const dataLink = ref(db, 'AllTransaction/'); 
    const employeeLoansQuery = query(
        dataLink,
        // orderByChild('enrollmentBy'), 
        //     equalTo("Employee1"),
    );
      onValue(employeeLoansQuery, (snapshot) => { // Use the filtered query
        const data = snapshot.val();
        // console.log("today...........", todayMoment);
        if (data) { // Check if data exists
       
          const allLoan = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          })).filter(loan => { 
            const  loanDate = moment(loan.timestamp, 'MM/DD/YYYY'); 
            return loanDate.isSame(todayMoment,  'Day'); }); // Filter for the specific employee
          setLoanList(allLoan);
          //console.log("today...........", loan.timestamp);
        } else {
          setLoanList([]); // Set to empty array if no loans found for the employee
        }

          if (data) {
            // const today = new Date(); 
            // const day = today.getDate().toString().padStart(2, '0'); 
            // const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
            // const year = today.getFullYear();
            // const formattedDate = `${month}/${day}/${year}`;  //console.log("today", formattedDate); 
            // const todayMoment = moment(formattedDate, 'MM/DD/YYYY'); // Corrected format string
            const totalLoanAmountToday = Object.values(data).reduce((total, loan) => {
              const loanDate = moment(loan.timestamp, 'MM/DD/YYYY'); //console.log("database", loanDate);
              if (loanDate.isSame(todayMoment, 'day')) { 
                return total + (loan.loanAmount + loan.chargeAmount + loan.savingsAmount || 0);
              }
              return total;
            }, 0);
          
            setTotalCollectionToday(totalLoanAmountToday);
          } else {
            setTotalCollectionToday(0);
          }
      });
  
    }, []); // Add employeeId to the dependency array
  
  return (
    <ScrollView style={styles.container}>
      {/* <View style={{ justifyContent: "center", alignItems: "center",paddingBottom:16}}>
      <Text style={{ fontWeight:'bold',fontSize:20}}> Welcome,  {enrollmentBy}</Text>
      </View> */}
     

        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
               <BalanceCard
                balanceTitle={"Today's Collection"}
                iconName={"calendar-check"}
                iconColor={"white"}
                onPress={()=>navigation.navigate("DayTransaction")}
                balance={totalCollectionToday +' ৳'}
              />
              
      </View>
     <View style={{ paddingLeft:50,paddingRight:50 }}> <Button label="Daily Report" onPress={print} /> </View>
     
      {
        loneList.map((item, index) => {
          return (
            <ListOne
              key={index}
              name={item.memberno}
              date={item.timestamp}
              amount={item.loanAmount+item.chargeAmount+item.savingsAmount}
              iconName={item.type === 'Collection' ? 'account-arrow-left' : 'account-arrow-right'}
              iconColor={item.type === 'Collection' ? '#8300FD' : "red"}
              type={item.type}
              category={item.category}    
              backgroundColor={"yellow"}          />

          )
        })
      }
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