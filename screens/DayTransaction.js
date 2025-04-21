import React, { useState, useEffect,useContext  } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView,Platform  } from 'react-native';
import PersonList from "../component/PersonList";
import ListOne from '../component/ListOne';
import { db } from '../config';
import { ref, onValue ,query, orderByChild, equalTo, andOperator } from 'firebase/database';
import BalanceCard from '../component/BalanceCard';
import moment from 'moment';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { UserContext } from '../UserContext';

import Button from '../component/Button';
//import { shareAsync } from 'expo-sharing';
//import { captureRef } from 'react-native-view-shot';

export default function MyLoanCollection({ navigation }) {
   const {user} =useContext(UserContext);
  const [loneList, setLoanList] = useState([])
  const [CollectionList, setCollectionList] = useState([])
  const [withdrawList, setWithdrawList] = useState([])
  const [totalCollectionToday, setTotalCollectionToday] = useState([])
  const [totalWithdrawToday, setTotalWithdrawToday] = useState([])
   // const [totalLoanCollection, setTotalLoanCollection] = useState([])
   // const enrollmentBy ="মোঃ জয়নাল আবেদীন";
    const enrollmentBy ="মোঃ রাকিবুল ইসলাম";
    const today = new Date(); 
    const day = today.getDate().toString().padStart(2, '0'); 
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
    const year = today.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;  
    const todayMoment = moment(formattedDate, 'MM/DD/YYYY'); 
    const currentDate = moment().format('DD MMMM YYYY');

    const printCollectionList = `
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
      <h1>Today's Collection Details of </h1>
        
      <h2>  ${ user.username}</h2>
        <table>
          <thead>
            <tr>
             
              <th>Date Time</th>
               <th>Member No</th>
              <th>Loan </th>
              <th>Savings </th>
              <th>Charge </th>
              
             
             
            </tr>
          </thead>
          <tbody>
    ${CollectionList
      .map(item => {
        let loanAmount;
        let savingsAmount;
        

        if (item.type === 'Collection') {
          loanAmount = item.loanAmount;
          savingsAmount = item.savingsAmount;
        } else if (item.type === 'Withdraw') {
          loanAmount = item.loanWithdrawAmount;
          savingsAmount = item.savingsWithdrawAmount;
        } else {
          amount = ''; // Or some default value
        }

        return `
          <tr>
            
            <td>${item.timestamp}</td>
            <td>${item.memberno}</td>
            <td>${loanAmount}</td>
            <td>${savingsAmount}</td>
            <td>${item.chargeAmount}</td>
           
            
          </tr>
        `;
      })
      .join('')}
  </tbody>
   <tfoot>
      <tr>
        <th colSpan="2">Total</th>
        <th>
          ${CollectionList.reduce((total, item) => {
            if (item.type === 'Collection') {
              return total + (item.loanAmount || 0);
            } else if (item.type === 'Withdraw') {
              return total + (item.loanWithdrawAmount || 0);
            }
            return total;
          }, 0)}
        </th>
        <th>
          ${CollectionList.reduce((total, item) => {
            if (item.type === 'Collection') {
              return total + (item.savingsAmount || 0);
            } else if (item.type === 'Withdraw') {
              return total + (item.savingsWithdrawAmount || 0);
            }
            return total;
          }, 0)}
        </th>
        <th>
          ${CollectionList.reduce((total, item) => total + (item.chargeAmount || 0), 0)}
        </th>
        
      </tr>
    </tfoot>
         
        </table>
      </body>
    </html>
  `;
    const printwithdrawList = `
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
      <h1>Today's Collection Details of </h1>
        
      <h2>  ${ user.username}</h2>
        <table>
          <thead>
            <tr>
             
              <th>Date Time</th>
               <th>Member No</th>
              <th>Loan </th>
              <th>Savings </th>
              <th>Charge </th>
              
             
             
            </tr>
          </thead>
          <tbody>
    ${withdrawList
      .map(item => {
        let loanAmount;
        let savingsAmount;
        

        if (item.type === 'Collection') {
          loanAmount = item.loanAmount;
          savingsAmount = item.savingsAmount;
        } else if (item.type === 'Withdraw') {
          loanAmount = item.loanWithdrawAmount;
          savingsAmount = item.savingsWithdrawAmount;
        } else {
          amount = ''; // Or some default value
        }

        return `
          <tr>
            
            <td>${item.timestamp}</td>
            <td>${item.memberno}</td>
            <td>${loanAmount}</td>
            <td>${savingsAmount}</td>
            <td>${item.chargeAmount}</td>
           
            
          </tr>
        `;
      })
      .join('')}
  </tbody>
   <tfoot>
      <tr>
        <th colSpan="2">Total</th>
        <th>
          ${withdrawList.reduce((total, item) => {
            if (item.type === 'Collection') {
              return total + (item.loanAmount || 0);
            } else if (item.type === 'Withdraw') {
              return total + (item.loanWithdrawAmount || 0);
            }
            return total;
          }, 0)}
        </th>
        <th>
          ${withdrawList.reduce((total, item) => {
            if (item.type === 'Collection') {
              return total + (item.savingsAmount || 0);
            } else if (item.type === 'Withdraw') {
              return total + (item.savingsWithdrawAmount || 0);
            }
            return total;
          }, 0)}
        </th>
        <th>
          ${withdrawList.reduce((total, item) => total + (item.chargeAmount || 0), 0)}
        </th>
        
      </tr>
    </tfoot>
         
        </table>
      </body>
    </html>
  `;


//   <tbody>
//   ${loneList.map(item => `
//     <tr>
//       <td>${item.memberno}</td>
//       <td>${item.timestamp}</td>
//       <td>${item.loanAmount}</td>
//       <td>${item.savingsAmount}</td>
//       <td>${item.chargeAmount}</td>
//       <td>${item.type}</td>
     
//     </tr>
//   `).join('')}
// </tbody>
const [selectedPrinter, setSelectedPrinter] = useState();

const printCollection = async () => {
  // On iOS/android prints the given html. On web prints the HTML from the current page.
  await Print.printAsync({
    html : printCollectionList,
    printerUrl: selectedPrinter?.url, // iOS only
  });
};
const printWithdraw = async () => {
  // On iOS/android prints the given html. On web prints the HTML from the current page.
  await Print.printAsync({
    html : printwithdrawList,
    printerUrl: selectedPrinter?.url, // iOS only
  });
};


const selectPrinter = async () => {
  const printer = await Print.selectPrinterAsync(); // iOS only
  setSelectedPrinter(printer);
};


  
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
       equalTo(
         user.username
       )
     );
   }
      onValue(transactionQuery, (snapshot) => { // Use the filtered query
        const data = snapshot.val();
        // console.log("today...........", todayMoment);
        if (data) { // Check if data exists
       
          const allLoan = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          })).filter(loan => { 
            const  loanDate = moment(loan.timestamp, 'MM/DD/YYYY'); 
            return loanDate.isSame(todayMoment,  'Day')  } ); // Filter for the specific employee
          setLoanList(allLoan);
          //console.log("today...........", loan.timestamp);
        } else {
          setLoanList([]); // Set to empty array if no loans found for the employee
        }
        if (data) { // Check if data exists
       
          const allLoan = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          })).filter(loan => { 
            const  loanDate = moment(loan.timestamp, 'MM/DD/YYYY'); 
            return loanDate.isSame(todayMoment,  'Day') && loan.type=="Collection"  } ); // Filter for the specific employee
          setCollectionList(allLoan);
          //console.log("today...........", loan.timestamp);
        } else {
          setCollectionList([]); // Set to empty array if no loans found for the employee
        }
        if (data) { // Check if data exists
       
          const allLoan = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          })).filter(loan => { 
            const  loanDate = moment(loan.timestamp, 'MM/DD/YYYY'); 
            return loanDate.isSame(todayMoment,  'Day') && loan.type == "Withdraw"  } ); // Filter for the specific employee
          setWithdrawList(allLoan);
          //console.log("today...........", loan.timestamp);
        } else {
          setWithdrawList([]); // Set to empty array if no loans found for the employee
        }

          if (data) {
            const totalLoanAmountToday = Object.values(data).reduce((total, loan) => {
              const loanDate = moment(loan.timestamp,'MM/DD/YYYY'); //console.log("database", loanDate);
              if (loanDate.isSame(todayMoment, 'day')) { 
                return total + (loan.loanAmount + loan.chargeAmount + loan.savingsAmount || 0);
              }
              return total;
            }, 0);
          
            setTotalCollectionToday(totalLoanAmountToday);
          } else {
            setTotalCollectionToday(0);
          }
          if (data) {
            const totalWithdrawAmountToday = Object.values(data).reduce((total, loan) => {
              const loanDate = moment(loan.timestamp,'MM/DD/YYYY'); //console.log("database", loanDate);
              if (loanDate.isSame(todayMoment, 'day')) { 
                return total + (loan.savingsWithdrawAmount + loan.loanWithdrawAmount || 0);
              }
              return total;
            }, 0);
          
            setTotalWithdrawToday(totalWithdrawAmountToday);
          } else {
            setTotalWithdrawToday(0);
          }
      });
  
    }, []); // Add employeeId to the dependency array
  
  return (
    <ScrollView style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center",paddingBottom:16}}>
      <Text style={{ fontWeight:'bold',fontSize:20}}> {currentDate} </Text>
      </View>
     

        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
               <BalanceCard
                balanceTitle={"Today's Collection"}
                iconName={"calendar-check"}
                iconColor={"white"}
                onPress={()=>navigation.navigate("DayTransaction")}
                balance={totalCollectionToday +' ৳'}
              />
               <BalanceCard
                balanceTitle={"Today's Withdraw"}
                iconName={"calendar-check"}
                iconColor={"white"}
                onPress={()=>navigation.navigate("DayTransaction")}
                balance={totalWithdrawToday +' ৳'}
              />
              
      </View>
      <View style={{ justifyContent: 'space-around', alignItems: "center", flexDirection: 'row' }}>
     <View> <Button label=" Collection  " onPress={printCollection} /> </View>
     <View > <Button label=" Withdraw " onPress={printWithdraw} /> </View>
     </View>
      {
        loneList.map((item, index) => {
          return (
            <ListOne
              key={index}
              name={item.memberno}
              date={item.timestamp}
              amount={item.type === 'Collection' ? item.loanAmount+item.chargeAmount+item.savingsAmount : item.savingsWithdrawAmount+item.loanWithdrawAmount}
              iconName={item.type === 'Collection' ? 'account-arrow-left' : 'account-arrow-right'}
              iconColor={item.type === 'Collection' ? '#8300FD' : "red"}
              type={item.type}  
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