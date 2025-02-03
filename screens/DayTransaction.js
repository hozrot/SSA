
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import PersonList from "../component/PersonList";
import ListOne from '../component/ListOne';
import { db } from '../config';
import { ref, onValue ,query, orderByChild, equalTo, andOperator } from 'firebase/database';
import BalanceCard from '../component/BalanceCard';
import moment from 'moment';

export default function MyLoanCollection({ navigation }) {
  const [loneList, setLoanList] = useState([])
  const [totalCollectionToday, setTotalCollectionToday] = useState([])
    const [totalLoanCollection, setTotalLoanCollection] = useState([])
   // const enrollmentBy ="মোঃ জয়নাল আবেদীন";
    const enrollmentBy ="মোঃ রাকিবুল ইসলাম";

  useEffect(() => {
    const dataLink = ref(db, 'CollectionLoan/'); 
    const today = new Date(); 
                const day = today.getDate().toString().padStart(2, '0'); 
                const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
                const year = today.getFullYear();
                const formattedDate = `${month}/${day}/${year}`;  
                const todayMoment = moment(formattedDate, 'MM/DD/YYYY'); 

                console.log("today...........", todayMoment);
    const employeeLoansQuery = query(
        dataLink,
        orderByChild('enrollmentBy'), 
            equalTo("Employee2"),
    );
      onValue(employeeLoansQuery, (snapshot) => { // Use the filtered query
        const data = snapshot.val();
        if (data) { // Check if data exists
          const allLoan = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }))
          //.filter(loan => loan.timestamp === todayMoment ); // Filter for the specific employee
          setLoanList(allLoan);
          //console.log("today...........", loan.timestamp);
        } else {
          setLoanList([]); // Set to empty array if no loans found for the employee
        }

          if (data) {
            const today = new Date(); 
            const day = today.getDate().toString().padStart(2, '0'); 
            const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
            const year = today.getFullYear();
            const formattedDate = `${month}/${day}/${year}`; 
           // console.log("today", formattedDate); 
          
            const todayMoment = moment(formattedDate, 'MM/DD/YYYY'); // Corrected format string
          
            const totalLoanAmountToday = Object.values(data).reduce((total, loan) => {
              const loanDate = moment(loan.timestamp, 'MM/DD/YYYY'); // Corrected format string
              //console.log("database", loanDate);
          
              if (loanDate.isSame(todayMoment, 'day')) { 
                return total + (loan.loanamount || 0);
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
                iconName={"briefcase-search-outline"}
                iconColor={"white"}
                onPress={()=>navigation.navigate("DayTransaction")}
                balance={totalCollectionToday}
              />
      </View>
     
      {
        loneList.map((item, index) => {
          return (
            <ListOne
              key={index}
              name={item.memberno}
              date={item.timestamp}
              amount={item.loanamount}
              iconName={"arrow-split-vertical"}
              iconColor={'#8300FD'}
            />

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