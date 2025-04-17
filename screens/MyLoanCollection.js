
import React, { useState, useEffect,useContext } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import PersonList from "../component/PersonList";
import ListOne from '../component/ListOne';
import { db } from '../config';
import { ref, onValue ,query, orderByChild, equalTo} from 'firebase/database';
import BalanceCard from '../component/BalanceCard';
import moment from 'moment';
import { UserContext } from '../UserContext';

export default function MyLoanCollection({ navigation }) {
  const {user} =useContext(UserContext);
  const [transactionList, setTransactionList] = useState([])
  const [totalTransactionToday, setTotalTransactionToday] = useState([])
  const [totalTransaction, setTotalTransaction] = useState([])
  

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
          const allTransaction = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          })).filter(loan => loan.loanAmount > 0 || loan.loanWithdrawAmount > 0);// Filter for the specific employee
          setTransactionList(allTransaction);
        } else {
          setTransactionList([]); // Set to empty array if no loans found for the employee
        }
        if (data) { 
            const totalAmount = Object.values(data)
            .filter((item) => item.type === "Collection") 
            .reduce((total, amount) => {
              return total + (amount.loanAmount || 0); 
            }, 0);
            setTotalTransaction(totalAmount); 
          } else {
            setTotalTransaction(0); 
          }

          if (data) {
            const today = new Date(); 
            const day = today.getDate().toString().padStart(2, '0'); 
            const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
            const year = today.getFullYear();
            const formattedDate = `${month}/${day}/${year}`; 
          
            //console.log("today", formattedDate); 
          
            const todayMoment = moment(formattedDate, 'MM/DD/YYYY'); // Corrected format string
          
            const totalLoanAmountToday = Object.values(data).reduce((total, loan) => {
              const loanDate = moment(loan.timestamp, 'MM/DD/YYYY'); // Corrected format string
             console.log("database", loanDate);
          
              if (loanDate.isSame(todayMoment, 'day') &&  loan.type === 'Collection') { 
                return total + (loan.loanAmount || 0);
              }
              return total;
            }, 0);
          
            setTotalTransactionToday(totalLoanAmountToday);
          } else {
            setTotalTransactionToday(0);
          }
      });
  
    }, []); // Add employeeId to the dependency array
  
  return (
    <ScrollView style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center",paddingBottom:16}}>
      {/* <Text style={{ fontWeight:'bold',fontSize:20}}> Welcome,  {enrollmentBy}</Text> */}
      </View>
     

        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
         
        <BalanceCard
                balanceTitle={"Total Collected Loan"}
                iconName={"arrow-down-bold-hexagon-outline"}
      
                iconColor={"white"}
                balance={totalTransaction+' ৳' }
              />
               <BalanceCard
                balanceTitle={"Today's Collection"}
                iconName={"calendar-check"}
                iconColor={"white"}
                //onPress={()=>navigation.navigate("DayTransaction")}
                balance={totalTransactionToday+' ৳'}
              />
      </View>
      {
        transactionList.map((item, index) => {
          return (
            <ListOne
              key={index}
              name={item.memberno}
              date={item.timestamp}
              amount={item.type === 'Collection' ? item.loanAmount : item.loanWithdrawAmount}
              iconName={item.type === 'Collection' ? 'account-arrow-left' : 'account-arrow-right'}
              iconColor={item.type === 'Collection' ? '#8300FD' : "red"}
              type={item.type}
              category={item.category}
              backgroundColor={"yellow"}
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
    paddingBottom: 10,

  },
  item: {
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 8,
  },
});