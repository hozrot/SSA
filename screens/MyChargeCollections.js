
import React, { useState, useEffect,useContext } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native';
import PersonList from "../component/PersonList";
import ListOne from '../component/ListOne';
import { db } from '../config';
import { ref, onValue ,query, orderByChild, equalTo} from 'firebase/database';
import BalanceCard from '../component/BalanceCard';
import moment from 'moment';
import { UserContext } from '../UserContext';

export default function MyChargeCollections({ navigation }) {
  const {user} =useContext(UserContext);
  const [chargeList, setChargeList] = useState([])
  const [totalChageToday, setTotalChargeToday] = useState([])
  const [totalChargeCollection, setTotalChargeCollection] = useState([])

    const enrollmentBy ="মোঃ জয়নাল আবেদীন";
  //  const enrollmentBy ="মোঃ রাকিবুল ইসলাম";

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
    // const employeeLoansQuery = query(
    //     dataLink,
    //     orderByChild('enrollmentBy'), // Assuming 'enrollmentBy' is the field in your data
    //       equalTo(user.username === 'মোঃ জয়নাল আবেদীন' ? 'Employee1' : 'Employee2')
    //   );
      onValue(transactionQuery, (snapshot) => { // Use the filtered query
        const data = snapshot.val();
        if (data) { // Check if data exists
          const allCharge = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          })).filter(charge => charge.type === "Collection" && charge.chargeAmount > 0); // Filter for the specific employee
          setChargeList(allCharge);
        } else {
          setChargeList([]); // Set to empty array if no loans found for the employee
        }
        if (data) { 
            const totalChargeAmount = Object.values(data)
            .filter((item) => item.type === "Collection") 
            .reduce((total, charge) => {
              return total + (charge.chargeAmount || 0); 
            }, 0);
            setTotalChargeCollection(totalChargeAmount); 
          } else {
            setTotalChargeCollection(0); 
          }

          if (data) {
            const today = new Date(); 
            const day = today.getDate().toString().padStart(2, '0'); 
            const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
            const year = today.getFullYear();
            const formattedDate = `${month}/${day}/${year}`; 
            //console.log("today", formattedDate); 
          
            const todayMoment = moment(formattedDate, 'MM/DD/YYYY'); // Corrected format string
          
            const totalChargeAmountToday = Object.values(data).reduce((total, charge) => {
              const chargeDate = moment(charge.timestamp, 'MM/DD/YYYY'); // Corrected format string
             // console.log("database", loanDate);
          
              if (chargeDate.isSame(todayMoment, 'day') && charge.type === "Collection" ) { 
                return total + (charge.chargeAmount || 0);
              }
              return total;
            }, 0);
          
            setTotalChargeToday(totalChargeAmountToday);
          } else {
            setTotalChargeToday(0);
          }
      });
  
    }, []); // Add employeeId to the dependency array
  
  return (
    <ScrollView style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center",paddingBottom:16}}>
    
      </View>
     

        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
         
        <BalanceCard
                balanceTitle={"Total Collected Charge"}
                iconName={"alarm-plus"}
      
                iconColor={"white"}
                balance={totalChargeCollection +' ৳' }
              />
               <BalanceCard
                balanceTitle={"Today's Collection"}
                iconName={"calendar-check"}
                iconColor={"white"}
                //onPress={()=>navigation.navigate("DayTransaction")}
                balance={totalChageToday +' ৳'}
              />
      </View>
      {
        chargeList.map((item, index) => {
          return (
            <ListOne
              key={index}
              name={item.memberno}
              date={item.timestamp}
              amount={item.chargeAmount}
              iconName={"account-arrow-down"}
              iconColor={'#8300FD'}
              type={item.type}  
              backgroundColor={"tomato"}
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