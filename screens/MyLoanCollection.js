
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import PersonList from "../component/PersonList";
import ListOne from '../component/ListOne';
import { db } from '../config';
import { ref, onValue ,query, orderByChild, equalTo} from 'firebase/database';
import BalanceCard from '../component/BalanceCard';
import moment from 'moment';

const data = [
  { id: 1, title: 'Name 1', Date: "12/12/2024" },
  { id: 2, title: 'Name 2', office: 'Dhaka' },
  { id: 3, title: 'Name 3', type: "Given" },
  { id: 4, title: 'Name 4' },
  { id: 5, title: 'Name 5' },
  { id: 6, title: 'Name 6' },
  // ... more items
];
export default function MyLoanCollection() {
  const [loneList, setLoanList] = useState([])
  const [totalCollectionToday, setTotalCollectionToday] = useState([])
    const [totalLoanCollection, setTotalLoanCollection] = useState([])


  useEffect(() => {
    const dataLink = ref(db, 'loanCollection/');
    const employeeLoansQuery = query(
        dataLink,
        orderByChild('enrollmentBy'), // Assuming 'enrollmentBy' is the field in your data
        equalTo("Employee1") // Filter for the specific employee
      );
      onValue(employeeLoansQuery, (snapshot) => { // Use the filtered query
        const data = snapshot.val();
        if (data) { // Check if data exists
          const allLoan = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setLoanList(allLoan);
        } else {
          setLoanList([]); // Set to empty array if no loans found for the employee
        }
        if (data) { 
            const totalSaveAmount = Object.values(data).reduce((total, loan) => {
              return total + (loan.loanamount || 0); 
            }, 0);
            setTotalLoanCollection(totalSaveAmount); 
          } else {
            setTotalLoanCollection(0); 
          }

          if (data) {
            const today = moment().startOf('day'); // Get the start of today
            const formattedDate = today.format('D/M/YYYY')
            console.log("today", formattedDate);
            const totalSaveAmountToday = Object.values(data).reduce((total, loan) => {
              const loanDate = moment(loan.timestamp, 'D/M/YYYY'); // Assuming loanDate is a timestamp or date string
              console.log("database", loanDate);
              if (loanDate.isSame(today)) { // Check if the loan date is today
                return total + (loan.loanamount || 0);
              }
              return total;
            }, 0);
            setTotalCollectionToday(totalSaveAmountToday);
          } else {
            setTotalCollectionToday(0);
          }
      });
  
    }, []); // Add employeeId to the dependency array
  
//     onValue(dataLink, (snapshot) => {
//       const data = snapshot.val();
//       const allLoan = Object.keys(data).map(key => ({
//         id: key,
//         ...data[key]
//       }));
//       setLoanList(allLoan);

//     });
//   }, [])
  return (
    <ScrollView style={styles.container}>
      

        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
        <BalanceCard
                balanceTitle={"Total Collection"}
                iconName={"briefcase-search-outline"}
      
                iconColor={"white"}
                balance={totalLoanCollection }
              />
               <BalanceCard
                balanceTitle={"Today's Collection"}
                iconName={"briefcase-search-outline"}
                iconColor={"white"}
                balance={totalCollectionToday}
              />
      </View>
     
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListOne
            name={item.title}
            designation={item.Date}
            type={item.type}
            iconName={"arrow-split-vertical"}
            iconColor={'#8300FD'}
          />
        )}
      /> */}

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