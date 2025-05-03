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
    const previousLoanDate = moment(todayMoment).subtract(2, 'day');
    const currentDate = moment().format('DD MMMM YYYY');
    const previousDayMoment = moment(formattedDate, 'MM/DD/YYYY').subtract(1, 'day');
    const previousDate = moment(formattedDate, 'MM/DD/YYYY').subtract(1, 'day').format('DD MMMM YYYY');
    const daybeforepreviosDate = moment().subtract(2, 'day').format('DD MMMM YYYY');

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
      <h1> Collection Details of </h1>
        
      <h2>  ${ user.username}</h2>
        <table>
          <thead>
            <tr>
             
              <th style="text-align: center;">${currentDate} Collection Time</th>
               <th style="text-align: center;">Member No</th>
              <th style="text-align: center;">Loan </th>
              <th style="text-align: center;">Savings </th>
              <th style="text-align: center;">Charge </th>
              
             
             
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
            
          <td style="text-align: center;">${moment(item.timestamp, 'MM/DD/YYYY hh:mm A')}</td>
            <td style="text-align: center;">${item.memberno}</td>
            <td style="text-align: center;">${loanAmount}</td>
            <td style="text-align: center;">${savingsAmount}</td>
            <td style="text-align: center;">${item.chargeAmount}</td>
           
            
          </tr>
        `;
      })
      .join('')}
  </tbody>
   <tfoot>
      <tr>
       <th style="text-align: center;" >  ${currentDate} </th>
       <th style="text-align: center ;">Total</th>
       
        <th style="text-align: center;">
          ${CollectionList.reduce((total, item) => {
            if (item.type === 'Collection') {
              return total + (item.loanAmount || 0);
            } else if (item.type === 'Withdraw') {
              return total + (item.loanWithdrawAmount || 0);
            }
            return total;
          }, 0)}
        </th>
        <th style="text-align: center;">
          ${CollectionList.reduce((total, item) => {
            if (item.type === 'Collection') {
              return total + (item.savingsAmount || 0);
            } else if (item.type === 'Withdraw') {
              return total + (item.savingsWithdrawAmount || 0);
            }
            return total;
          }, 0)}
        </th>
        <th style="text-align: center;">
          ${CollectionList.reduce((total, item) => total + (item.chargeAmount || 0), 0)}
        </th>
        
      </tr>
       <tr>
        
       <th style="text-align: center;" colspan="2">Grand Total </th>
        <th style="text-align: center;" colspan="3">
          ${CollectionList.reduce((total, loan) => {
            return total + (loan.loanAmount || 0)  + (loan.chargeAmount || 0) + (loan.savingsAmount || 0);
          }, 0)}
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
      <h1> Withdraw Details of </h1>
        
      <h2>  ${ user.username}</h2>
        <table>
          <thead>
            <tr>
             
              <th style="text-align: center;"> ${currentDate} Withdraw Time  </th>
               <th style="text-align: center;">Member No</th>
              <th style="text-align: center;">Loan </th>
              <th style="text-align: center;">Savings </th>
              
              
             
             
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
            
          
            <td style="text-align: center;"> ${moment(item.timestamp, 'MM/DD/YYYY hh:mm A')}</td>
            <td style="text-align: center;">${item.memberno}</td>
            <td style="text-align: center;">${loanAmount}</td>
            <td style="text-align: center;">${savingsAmount}</td>
           
           
            
          </tr>
        `;
      })
      .join('')}
  </tbody>
   <tfoot>
      <tr>
         <th> </th>
       <th style="text-align: center;">Total</th>
        <th style="text-align: center;">
          ${withdrawList.reduce((total, item) => {
            if (item.type === 'Collection') {
              return total + (item.loanAmount || 0);
            } else if (item.type === 'Withdraw') {
              return total + (item.loanWithdrawAmount || 0);
            }
            return total;
          }, 0)}
        </th>
        <th style="text-align: center;">
          ${withdrawList.reduce((total, item) => {
            if (item.type === 'Collection') {
              return total + (item.savingsAmount || 0);
            } else if (item.type === 'Withdraw') {
              return total + (item.savingsWithdrawAmount || 0);
            }
            return total;
          }, 0)}
        </th>
      </tr>
      <tr>
         <th> </th>
       <th style="text-align: center;">Grand Total </th>
        <th style="text-align: center;" colspan="2">
          ${withdrawList.reduce((total, loan) => {
            return total + (loan.loanWithdrawAmount + loan.savingsWithdrawAmount || 0);
          }, 0)}
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
          }))
          // .filter(loan => {
          //   const loanDate = moment(loan.timestamp, 'MM/DD/YYYY');
          //   const filterDateString = '4/30/2025';
          //   const filterMoment = moment.utc(filterDateString, 'MM/DD/YYYY').startOf('day');
          //   const filterDateOnly = filterMoment.format('M/DD/YYYY');
          //   const yesterdayMoment = moment(formattedDate, 'MM/DD/YYYY').subtract(1, 'day');
          //   console.log("yesterday", filterDateOnly);
            
          //   return loanDate.isSame(filterDateOnly, 'Day') && loan.type === "Collection";
            
            
          // })
          
          .filter(loan => { 
            const  loanDate = moment(loan.timestamp, 'MM/DD/YYYY'); 
            
            //console.log("loanDate", loanDate);
            const previousLoanDate = moment.utc(loanDate).subtract(1, 'day');
           // console.log("previousLoanDate", previousLoanDate);
            return loanDate.isSame(todayMoment,  'Day') && loan.type=="Collection"  } )
            .sort((a, b) => {
              // Sort by memberno (assuming 'memberno' is a property in your loan object)
              if (a.memberno < b.memberno) {
                return -1; // a comes before b
              }
              if (a.memberno > b.memberno) {
                return 1;  // a comes after b
              }
              return 0;    // a and b are equal in terms of memberno
            });
            // .sort((a, b) => {
            //   // Assuming your 'timestamp' field also contains the time
            //   // If it doesn't, you'll need a separate time field for accurate sorting
            //   const timeA = moment(a.timestamp, 'MM/DD/YYYY HH:mm A'); // Adjust format if needed
            //   const timeB = moment(b.timestamp, 'MM/DD/YYYY HH:mm A'); // Adjust format if needed
            //   return timeA.valueOf() - timeB.valueOf(); // Sort in ascending order of time
            // });  // Filter for the specific employee
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
            return loanDate.isSame(todayMoment,  'Day') && loan.type == "Withdraw"  } )
            .sort((a, b) => {
              // Sort by memberno (assuming 'memberno' is a property in your loan object)
              if (a.memberno < b.memberno) {
                return -1; // a comes before b
              }
              if (a.memberno > b.memberno) {
                return 1;  // a comes after b
              }
              return 0;    // a and b are equal in terms of memberno
            });
            // .sort((a, b) => {
            //   // Assuming your 'timestamp' field also contains the time
            //   // If it doesn't, you'll need a separate time field for accurate sorting
            //   const timeA = moment(a.timestamp, 'MM/DD/YYYY HH:mm A'); // Adjust format if needed
            //   const timeB = moment(b.timestamp, 'MM/DD/YYYY HH:mm A'); // Adjust format if needed
            //   return timeA.valueOf() - timeB.valueOf(); // Sort in ascending order of time
            // }); 
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
                balance={totalCollectionToday }
              />
               <BalanceCard
                balanceTitle={"Today's Withdraw"}
                iconName={"calendar-check"}
                iconColor={"white"}
                onPress={()=>navigation.navigate("DayTransaction")}
                balance={totalWithdrawToday}
              />
              
      </View>
      <View style={{ justifyContent: 'space-around', alignItems: "center", flexDirection: 'row' }}>
     <View> <Button label=" Collection  " onPress={printCollection} /> </View>
     <View > <Button label=" Withdraw " onPress={printWithdraw} /> </View>
     </View>
      {
        loneList.slice(-10).map((item, index) => {
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